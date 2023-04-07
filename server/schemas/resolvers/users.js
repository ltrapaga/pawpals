const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-express')

const { validateRegisterInput } = require('../../utils/validators')
const { SECRET_KEY } = require('../../utils/auth');
const User = require('../../models/User');

module.exports = {
    Mutation: {
        async register(_, 
            { registerInput : { username, email, password, confirmPwd}}
            ){
            // need to validate user data
            const { valid, errors } = validateRegisterInput(
                username, 
                email, 
                password, 
                confirmPwd
                );
                if(!valid){
                    throw new UserInputError('Errors', {errors});
                }
            // be sure user doesnt already exit
            const user = await User.findOne({ username })
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is not available'
                    }
                })
            }
            // then need to hash pwd with auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email, 
                username,
                password,
                createdAt: new Date().toDateString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, {expiresIn: '2h'});

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}