import { type } from "os";
import { PropertiesType } from "../properties/PropertiesType";
import { TransactionsType } from "../transactions/TransactionsType";
import { UserType } from "../users/Usertype";

export type ReviewType = {
  id: string;
  feedback: string;
  reply: string;
  rating: number;
  transaction: TransactionsType;
  users: UserType;
  properties: PropertiesType;
  isRead: boolean;
  author: string;
  date: string;
  createdAt: string;
};
