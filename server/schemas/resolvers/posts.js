const { AuthenticationError } = require("apollo-server-express");

const Post = require("../../models/Post");
const authMiddleware = require("../../utils/auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        // Get all posts sorted from newest to oldest
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
          throw new Error("No post found with that ID");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = authMiddleware(context);

      if (body.trim() === "") {
        throw new Error("Post cannot be empty");
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = authMiddleware(context);
      try {
        const post = await Post.findById(postId);
        // Only allow a post to be deleted by the user that created it
        if (user.username === post.username) {
          await Post.deleteOne({ _id: postId });
          return "Post deleted";
        } else {
          throw new AuthenticationError("Action unavailable");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = authMiddleware(context);
      const post = await Post.findById(postId);
      if (post) {
        // If a `like` already exists because the user previously liked the same post
        if (post.likes.find((like) => like.username === username)) {
          // Then unlike that post
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Else, like the post by pushing to `likes` array in Post model
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("No post found with that ID");
    },
  },
};
