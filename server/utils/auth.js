const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const authorizationHeader = context.req.headers.authorization;
  if (authorizationHeader) {
    // Split header into two strings ('Bearer' and 'token') and place in a single array
    const token = authorizationHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Token invalid or expired");
      }
    }
    throw new Error("Authentication token must follow 'Bearer [token]' format");
  }
  throw new Error("Authorization header required");
};
