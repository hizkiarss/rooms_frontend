import { gql } from "graphql-request";

// export const CREATE_TRANSACTION = gql`
//   mutation CreateTransaction($input: CreateTransactionInput!) {
//     createTransaction(input: $input) {
//       id
//       finalPrice
//       status
//       paymentMethod
//       firstName
//       lastName
//       mobileNumber
//     }
//   }
// `;
export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionRequest!) {
    createTransaction(input: $input)
  }
`;

const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
    }
  }
`;
