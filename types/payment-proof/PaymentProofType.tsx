import { TransactionsType } from "../transactions/TransactionsType";

export type PaymentProofType = {
  id: string;
  imgUrl: string;
  transaction: TransactionsType;
  createdAt: string;
};
