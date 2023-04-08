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
  
        const post = await Post.findById(postId);
  
        if (post) {
          // adding the comment to the top
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString()
          });
          await post.save();
          return post;
        } else throw new UserInputError('No post found');
      },

      }
    }

  