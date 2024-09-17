import {gql} from "graphql-request";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionRequest!) {
    createTransaction(input: $input)
  }
`;

export const CANCEL_TRANSACTION = gql`
  mutation CancelTransaction($bookingCode: String!) {
    cancelTransaction(bookingCode: $bookingCode)
  }
`;

export const ACCEPT_PAYMENT_PROOF = gql`
  mutation AcceptPaymentProof($transactionId: ID!) {
    acceptPaymentProof(transactionId: $transactionId)
  }
`;
export const ADD_PAYMENT_PROOF = gql`
  mutation AddPaymentProof($transactionId: ID!, $imgUrl: String!) {
    addPaymentProof(transactionId: $transactionId, imgUrl: $imgUrl)
  }
`;

export const REJECT_PAYMENT_PROOF = gql`
  mutation RejectPaymentProof($transactionId: ID!) {
    rejectPaymentProof(transactionId: $transactionId)
  }
`;

export const CREATE_VIRTUAL_ACCOUNT_CODE = gql`
  mutation CreateVirtualAccountCode($bookingCode: String!, $bank: String!) {
    createVirtualAccountCode(bookingCode: $bookingCode, bank: $bank) {
      status_code
      status_message
      transaction_id
      order_id
      merchant_id
      gross_amount
      currency
      payment_type
      transaction_time
      transaction_status
      fraud_status
      expiry_time
      va_numbers {
        bank
        va_number
      }
    }
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

export const SAVE_PAYMENT_INITIAL = gql`
  mutation CreatePaymentInitial($input: PaymentInitial!) {
    createPaymentInitial(input: $input)
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($email: String!, $imgUrl: String!) {
    uploadAvatar(email: $email, imgUrl: $imgUrl) {
      id
      email
      username
      profilePicture
      role
      mobileNumber
    }
  }
`;

export const UPDATE_USER_INFORMATION = gql`
mutation UpdateUserInformation($input: UpdateUserInfoInput, $email: String! ) {
    updateUserInformation(input: $input, email: $email) {
        id
        email
        username
        profilePicture
        role
        mobileNumber
    }
}
`;

export const SEND_RESET_PASSWORD_LINK = gql`
mutation SendResetPasswordLink ($email: String!){
    sendResetPasswordLink(email: $email)
}`;


export const RESET_PASSWORD = gql`
mutation ResetPassword ($email: String!, $input:ResetPasswordRequest!) {
    resetPassword(email: $email, input: $input)
}
`;


export const DELETE_ACCOUNT = gql`
mutation DeleteAccount ($email: String!, $password: String!) {
    deleteAccount(email: $email, password: $password)
}
`;

export const ADD_PROPERTIES_FACILITIES = gql`
mutation AddPropertyFacilities($id: ID!, $facilitiesId: [ID!]!) {
    addPropertyFacilities(id: $id, facilitiesId: $facilitiesId) {
        id
        facilities {
            id
            name
        }
        property {
            id
            name
        }
    }
}`;