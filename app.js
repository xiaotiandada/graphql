const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// 书库 没接数据库
const books = [
  {
    id: 0,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id: 1,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  },
];

const typeDefs = gql`
  type Book {
    id: Int,
    title: String
    author: String
  }

  type Query {
    books: [Book],
  }

  type Mutation {
    createBook(title: String, author: String): Book,
    updateBook(id: Int, title: String, author: String): Book,
    deleteBook(id: Int, title: String, author: String): Book,
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    // 创建
    createBook: (_, { title, author }) => {
      let list = {
        id: books.length,
        title,
        author
      }
      books.push(list)
      return list
    },
    // 更新
    updateBook: (_, { id, title, author }) => {
      let idx = books.findIndex(i => i.id === id)
      if (~idx) {
        books[idx] = {
          id: idx,
          title: title,
          author: author
        }
        return books[idx]
      } else {
        return []
      }
    },
    // 删除
    deleteBook: (_, { id }) => {
      let idx = books.findIndex(i => i.id === id)
      if (~idx) {
        books.splice(idx, 1)
        return books[idx]
      } else {
        return []
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);


// query GetBooks {
//   books {
//     id,
//     title
//     author
//   }
// }

// mutation Create {
//   createBook(title: "12312", author: "xxxxx") {title, author},
// }

// mutation Update {
//   updateBook(id: 0, title: "123", author: "xxxxx") {id, title, author}
// }

// mutation Delete {
//   deleteBook(id: 1) {id, title, author}
// }