const postsResolvers = require('./posts');
const userResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
  Post: {
    // Get the number of `likes` in Post model array as an integer
    likeCount: (parent) => parent.likes.length,
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
};