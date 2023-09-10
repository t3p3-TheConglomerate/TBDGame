const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    groups: [Group]
  }

  type Group {
    _id: ID
    groupName: String
    gameName: String
    gameDescription: String
    gameImage: String
    groupOwner: User
    groupMembers: [User]
    notes: [Note]
  }

  type Note {
    _id: ID
    noteText: String
    noteAuthor: String
    createdAt: String
    category: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    groups: [Group]
    group(groupName: String): Group
    user(_id: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    addGroup(_id: ID!, groupName: String, gameName: String, gameDescription: String, gameImage: String): Group
    addGroup(_id: ID!, groupName: String, gameName: String, gameDescription: String, gameImage: String): Group
    updateGroup(_id: ID!, groupName: String, gameName: String, gameDescription: String, gameImage: String): Group
    deleteGroup(groupId: ID!): User
    changeOwner(_id: ID!, username: String!, email: String!): Group
    addNote(noteText: String!, noteAuthor: String!, category: String!): Note
    deleteNote(_id: ID!): Group    
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;