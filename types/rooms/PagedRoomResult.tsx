import {RoomType} from "@/types/rooms/RoomsType";

export type PagedRoomResult = {
    rooms: RoomType[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}