import { PropertiesType } from "../properties/PropertiesType";
import { RoomType } from "../rooms/RoomsType";
import { UserType } from "../users/Usertype";

export type BookingsType = {
  id: string;
  startDate: string;
  endDate: string;
  property: PropertiesType;
  users: UserType;
  room: RoomType;
};
