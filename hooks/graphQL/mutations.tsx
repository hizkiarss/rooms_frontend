import { gql } from "graphql-request";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionRequest!) {
    createTransaction(input: $input)
  }
`;

export const REGISTER_USER = gql`
  mutation UserRegister($input: RegisterInput!) {
    userRegister(input: $input)
  }
`;

export const REGISTER_TENANT = gql`
  mutation TenantRegister($input: RegisterInput!) {
    tenantRegister(input: $input)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($email: String!) {
    verifyEmail(email: $email) {
        id
        email
        username
        role
        mobileNumber
    }
}
`;
