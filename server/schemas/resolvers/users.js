const User = require("../../models/User");

module.exports = {
    Mutation: {
        register(_, args, context, info){
            // need to validate user data
            // be sure user doesnt already exit
            // then need to hash pwd with auth token
        }
    }
}