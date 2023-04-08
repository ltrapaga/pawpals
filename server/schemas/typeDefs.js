const { gql } = require('apollo-server-express');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  },
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  },
  input registrationInput{
    username: String!
    password: String!
    confirmPwd: String!
    email: String!
  },
  type Query {
    getPosts: [Post]
  },
  type Mutation{
    register(registrationInput: registrationInput): User!
    login(username: String!, password: String!): User!
  }
  `;