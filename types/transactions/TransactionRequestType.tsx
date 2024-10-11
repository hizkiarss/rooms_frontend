import { PaymentMethodType } from "./PaymentMethodType";
import { TransactionDetailRequestType } from "./TransactionDetailRequestType";

export type TransactionRequest = {
  usersId: string;
  propertiesId: string;
  paymentMethod: PaymentMethodType;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  adult: number;
  children: number;
  transactionDetailRequests: TransactionDetailRequestType;
};
