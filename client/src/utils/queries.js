import { gql } from "@apollo/client";

export const QUERY_GROUP = gql`
  query group {
    _id
    groupName
    gameName
    gameDescription
    gameImage
    groupOwner
    groupMembers {
      _id
      username
    }
    notes {
      _id
      notesText
      notesAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_GROUP = gql`
  query singleGroup($id: ID!) {
    group(_id: $id) {
    _id
    groupName
    gameName
    gameDescription
    gameImage
    groupOwner
    groupMembers {
      _id
    }
    notes {
      _id
      noteText
      noteAuthor
      category
      createdAt
    }
  }
}
`;


export const GET_ME = gql`
  query me {
    me {
      _id
      email
      username
      groups {
        _id
        groupName
        gameName
        gameDescription
        gameImage
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      username
      email
      groups {
        _id
        groupName
        gameName
        gameDescription
        gameImage
      }
    }
  }
`;
