import { PaymentProofType } from "../payment-proof/PaymentProofType";
import { PropertiesType } from "../properties/PropertiesType";
import { ReviewType } from "../review/ReviewType";
import { UserType } from "../users/Usertype";
import { PaymentMethodType } from "./PaymentMethodType";
import { TransactionDetailRequestType } from "./TransactionDetailRequestType";

export type TransactionsType = {
  id: string;
  bookingCode: string;
  finalPrice: number;
  status: "Pending" | "Success" | "Cancelled" | "Rejected" | "Expired";
  email: string;
  paymentMethod: PaymentMethodType;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  users: UserType;
  transactionDetails: TransactionDetailRequestType[];
  properties: PropertiesType;
  paymentProofs: PaymentProofType[];
  reviews: ReviewType[];
  createdAt: string;
};
