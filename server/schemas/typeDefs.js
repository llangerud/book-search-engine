const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }
  type Book {
    _id: ID!
    bookId: String
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
    User: [User]!
    user(userId: ID!): User
    me: User
  }

  input BookInput {
    authors: [String!]!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String!
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    
    login(email: String!, password: String!): Auth
    
    removeBook(bookId: String!): User
   
    saveBook(book: BookInput!): User
    }
`;

module.exports = typeDefs;
