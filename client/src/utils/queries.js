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

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
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
