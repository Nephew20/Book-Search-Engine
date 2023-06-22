import { gql } from '@apollo/client'

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
}`

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
}`

export const SAVE_BOOK = gql`
mutation saveBook($bookInput: BookInput) {
    saveBook(bookInput: $bookInput) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
}`

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      email
      username
      savedBooks {
        title
        bookId
      }
    }
}`