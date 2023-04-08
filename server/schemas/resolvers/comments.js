const { AuthenticationError ,UserInputError } = require('apollo-server-express')
const Post = require('../../models/Post');
const authMiddleware = require("../../utils/auth");


module.exports = {
    Mutation: {
      createComment: async (_, { postId, body }, context) => {
        const { username } = authMiddleware(context);
        if (body.trim() === '') {
          throw new UserInputError('Comment unavailable', {
            errors: {
              body: 'Comment body cannot be empty'
            }
          });
        }
  

    }
  }
}