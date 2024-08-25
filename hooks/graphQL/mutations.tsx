import { gql } from "graphql-request";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionRequest!) {
    createTransaction(input: $input)
  }
`;
