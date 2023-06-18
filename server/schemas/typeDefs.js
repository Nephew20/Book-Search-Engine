const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
}

input Book {
    # bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    profile: Profile
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): User
    saveBook(userId: ID!, saveBook: String!): User
    removeBook(bookId: String!): User
}
`