const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");

const {
  validateRegistration,
  validateLogin,
} = require("../../utils/validators");
const User = require("../../models/User");

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLogin(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "No user found with that username";
        throw new UserInputError("No user found with that username", {
          errors,
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Invalid password";
        throw new UserInputError("Invalid password", { errors });
      }

      const token = createToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registrationInput: { username, email, password, confirmPwd } }
    ) {
      const { valid, errors } = validateRegistration(
        username,
        email,
        password,
        confirmPwd
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("That username is unavailable", {
          errors: {
            username: "That username is unavailable",
          },
        });
      }
      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toDateString(),
      });

      const res = await newUser.save();

      const token = createToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
