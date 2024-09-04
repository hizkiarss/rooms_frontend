"use client";
import {gql} from "graphql-request";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
      users {
        id
        email
        username
        profilePicture
        mobileNumber
      }
    }
  }
`;

export const FIND_CITY_BY_NAME = gql`
query FindCityByName($name: String!) {
findCityByName(name: $name) {
      id
      name
      }
}`
