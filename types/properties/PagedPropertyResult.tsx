import {PropertyProjection} from "@/types/properties/PropertiesProjection";

export type PagedPropertyResult = {
    properties: PropertyProjection[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}