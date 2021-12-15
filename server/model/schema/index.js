const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    cover: String
    title: String
    author: String
    content: String
  }
  type Query {
    posts: [Post]
  }
`;

module.exports = typeDefs;