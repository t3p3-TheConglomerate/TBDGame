import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($newNote: newNote!) {
    addNote(newNote: $newNote) {
      _id
      noteText
      noteAuthor
      createdAt
      category
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId) {
      _id
      noteText
      noteAuthor
      createdAt
      category
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
export const ADD_GROUP = gql`
  mutation addGroup($newGroup: newGroup!) {
    addGroup(newGroup: $newGroup) {
      _id
      groupName
      gameName
      gameDescription
      gameImage
      groupOwner
      groupMembers {
        username
      }
      notes {
        _id
        noteText
        noteAuthor
        createdAt
        category
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation deleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId) {
      _id
      groupName
      gameName
      gameDescription
      gameImage
      groupOwner
      groupMembers {
        username
      }
      notes {
        _id
        noteText
        noteAuthor
        createdAt
        category
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup(
    $_id: ID!
    $groupName: String!
    $gameName: String!
    $gameDescription: String!
    $gameImage: String!
  ) {
    updateGroup(
      _id: $_id
      groupName: $groupName
      gameName: $gameName
      gameDescription: $gameDescription
    ) {
      _id
      groupName
      gameName
      gameDescription
      gameImage
      groupOwner
      groupMembers {
        username
      }
      notes {
        _id
        noteText
        noteAuthor
        createdAt
        category
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const CHANGE_OWNER = gql`
  mutation changeOwner($_id: ID!, $groupOwner: User!) {
    changeOwner(_id: $_id) {
      _id
      email
      username
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
