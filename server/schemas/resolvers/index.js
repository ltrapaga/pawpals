const postsResolvers = require('./posts');
const userResolvers = require('./users')

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
    ...postsResolvers.Mutation
  }
};