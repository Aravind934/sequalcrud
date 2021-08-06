import { gql } from "@apollo/client";

export let REMOVE_USER = gql`
  mutation remove($id: Int!) {
    removeUser(id: $id) {
      success
      message
    }
  }
`;

export let ADD_USER = gql`
  mutation add($name: String!, $password: String!, $age: Int!) {
    addUser(name: $name, password: $password, age: $age) {
      success
      message
    }
  }
`;

export let UPDATE_USER = gql`
  mutation update(
    $id: Int!
    $name: String!
    $password: String!
    $age: Int!
    $photo: String!
  ) {
    updateUser(
      id: $id
      name: $name
      password: $password
      age: $age
      photo: $photo
    ) {
      success
      message
    }
  }
`;

export let DELETE_IMAGE = gql`
  mutation deleteImage($photo: String!) {
    deleteImage(photo: $photo) {
      success
      message
    }
  }
`;
