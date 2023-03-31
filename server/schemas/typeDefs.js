const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }
  type Book {
    bookId: Int
    description: String
    title: String
    image: String
    link: String
    authors: [String]!
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    me: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: ID!): User
    removeBook(bookId: ID!): User
    saveBook(
      
      authors:[String!]!, description: String!, title: String!, bookId: ID!, image: String!, link: String!):User
  }
`;

module.exports = typeDefs;
