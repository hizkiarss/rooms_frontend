import {City} from "@/types/city/City";

type Facility ={
    id: string;
    name: string;
    logoUrl: string;
}

export type PropertyFacility ={
    id: string;
    facilities: Facility;
}

type PropertyPicture ={
    id: string;
    imgUrl: string;
}

type PropertyCategory ={
    id: string;
    name: string;
}

export type PropertyDetailType = {
    id: string;
    name: string;
    description: string;
    checkInTime: string;
    checkOutTime: string;
    address: string;
    totalReview: number;
    averageRating: number;
    propertyFacilities: PropertyFacility[];
    propertyPictures: PropertyPicture[];
    propertyCategories: PropertyCategory;
    city: City;
    slug: String;
    star: number;
    phoneNumber: string;
}