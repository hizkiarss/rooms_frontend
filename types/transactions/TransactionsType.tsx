import { UserType } from "../users/Usertype";

export type TransactionsType = {
  id: string;
  finalPrice: number;
  status: "Pending" | "Success" | "Canceled";
  email: string;
  paymentMethod: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  users: UserType;
};
