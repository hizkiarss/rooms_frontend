import { BedTypesType } from "../bed-types/BedTypesType";
import { BookingsType } from "../bookings/BookingsType";
import { PropertiesType } from "../properties/PropertiesType";
import {RoomPictureType} from "@/types/room-picture/RoomPictureType";

export type RoomType = {
  id: string;
  name: string;
  description: string;
  isBooked: Boolean;
  isAvailable: Boolean;
  roomNumber: string;
  price: number;
  capacity: number;
  properties: PropertiesType;
  includeBreakfast: Boolean;
  bedTypes: BedTypesType;
  roomArea: number;
  bookings: [BookingsType];
  roomPictures: RoomPictureType[];
  slug: string;
};
