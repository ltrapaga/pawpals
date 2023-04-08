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
          // adding the comment to the top of the comment list
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString()
          });
          await post.save();
          return post;
        } else throw new UserInputError('No post found');
      },
      async deleteComment(_, { postId, commentId }, context) {
        const { username } = authMiddleware(context);
  
        const post = await Post.findById(postId);
  
        // get index of comment and delete the desired index
        if (post) {
          const commentIndex = post.comments.findIndex((c) => c.id === commentId);
          // need to check user deletes their own comments
          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError('Action unavailable');
          }
        } else {
          throw new UserInputError('No post found');
        }
      }
      }
    }

  