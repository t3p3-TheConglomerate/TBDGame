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
    groupOwner: String
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
    group(_id: ID!): Group
    user(_id: ID!): User
    users: [User]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    addGroup(groupName: String, gameName: String, gameDescription: String, gameImage: String, username: String): Group
    updateGroup(_id: ID!, groupName: String, gameName: String, gameDescription: String, gameImage: String): Group
    deleteGroup(_id: ID!): User
    changeOwner(_id: ID!, username: String!, email: String!): Group
    addNote(groupId: ID!, noteText: String!, noteAuthor: String!, category: String): Note
    deleteNote(_id: ID!): Note    
    login(email: String!, password: String!): Auth
    addMember(_id: ID!, groupId: ID!): User
  }
`;

module.exports = typeDefs;