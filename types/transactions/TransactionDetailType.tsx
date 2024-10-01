import { RoomType } from "../rooms/RoomsType";
import { TransactionsType } from "./TransactionsType";

export type TransactionDetailType = {
  id: string;
  transaction: TransactionsType;
  rooms: RoomType;
  price: number;
  startDate: string;
  endDate: string;
};
