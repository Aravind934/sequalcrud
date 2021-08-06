import { gql } from "@apollo/client";

export let GET_USERS = gql`
  query getUsers {
    users {
      success
      message
      datas {
        id
        name
        age
        photo
      }
    }
  }
`;

export let FIND_USER = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      success
      data {
        id
        name
        age
        photo
      }
    }
  }
`;
