import { UserType } from "../users/Usertype";
import { PaymentMethodType } from "./PaymentMethodType";
import { TransactionDetailRequestType } from "./TransactionDetailRequestType";

export type TransactionsType = {
  id: string;
  finalPrice: number;
  status: "Pending" | "Success" | "Cancelled" | "Rejected";
  email: string;
  paymentMethod: PaymentMethodType;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  users: UserType;
  transactionDetails: TransactionDetailRequestType;
};
