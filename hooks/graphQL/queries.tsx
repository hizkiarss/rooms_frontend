"use client";
import { gql } from "graphql-request";

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

export const GET_TRANSACTIONS_BY_PROPERTY_ID = gql`
  query TransactionsByPropertyId($propertyId: ID!) {
    transactionsByPropertyId(propertyId: $propertyId) {
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

export const GET_TRANSACTIONS_BY_USER_ID = gql`
  query TransactionsByUsersId($usersId: ID!) {
    transactionsByUsersId(usersId: $usersId) {
      id
      bookingCode
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
      properties {
        id
        name
      }
      paymentProofs {
        id
        imgUrl
      }
    }
  }
`;

export const GET_PENDING_PAYMENT_PROOF = gql`
  query PendingPaymentProof {
    pendingPaymentProof {
      id
      imgUrl
      transaction {
        id
        finalPrice
        status
        paymentMethod
      }
    }
  }
`;

export const GET_PENDING_PAYMENT_PROOF_BY_PROPERTY_ID = gql`
  query PendingPaymentProofByPropertyId($propertyId: ID!) {
    pendingPaymentProofByPropertyId(propertyId: $propertyId) {
      id
      imgUrl
      transaction {
        id
        status
        paymentMethod
        finalPrice
      }
    }
  }
`;

export const GET_TRANSACTIONS_BY_BOOKING_CODE = gql`
  query TransactionsByBookingCode($bookingCode: String!) {
    transactionsByBookingCode(bookingCode: $bookingCode) {
      id
      bookingCode
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
      properties {
        id
        name
      }
      transactionDetails {
        id
        price
        startDate
        endDate
      }
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


export const GET_PAYMENT_BY_BOOKING_CODE = gql`
  query PaymentByBookingCode($bookingCode: String!) {
    paymentByBookingCode(bookingCode: $bookingCode) {
      id
      bookingCode
      transactionStatus
      bank
      vaNumber
      grossAmount
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

export const FIND_USER_BY_EMAIL= gql`
query FindUserByEmail ($email: String!) {
    findUserByEmail(email: $email) {
        id
        email
        username
        profilePicture
        role
        mobileNumber
        gender
        dateOfBirth
    }
}`;

