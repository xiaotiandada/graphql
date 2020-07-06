const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// 书库 没接数据库
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  },
];

// TODO: 
// 1. 查询所有的书
// 2. 添加一本书
// 3. 更新一本书
// 4. 删除一本书


const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }
  type Author {
    name: String
    books: [Book]
  }


  type Query {
    hello: String,
    books: [Book],
    authors: [Author]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    books: () => books,
    authors: () => books,
  },
  Mutation: {
    
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);