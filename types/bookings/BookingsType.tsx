import { PropertiesType } from "../properties/PropertiesType";
import { RoomType } from "../rooms/RoomsType";
import { TransactionDetailRequestType } from "../transactions/TransactionDetailRequestType";
import { TransactionDetailType } from "../transactions/TransactionDetailType";
import { UserType } from "../users/Usertype";

export type BookingsType = {
  id: string;
  startDate: string;
  endDate: string;
  property: PropertiesType;
  users: UserType;
  room: RoomType;
  transactionDetail: TransactionDetailType;
};
