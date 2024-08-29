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
