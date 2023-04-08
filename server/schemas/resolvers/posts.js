const Post = require('../../models/Post');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSinglePost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;

        } else {
          throw new Error('No post found with that ID')
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
}