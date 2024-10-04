import { PropertyCategoriesType } from "../property-categories/PropertyCategoriesType";
import { PropertyFacility } from "../property-facility/PropertyFacilityType";
import { PropertyPicturesType } from "../property-pictures/PropertyPicturesType";
import { ReviewType } from "../review/ReviewType";
import { UserType } from "../users/Usertype";

export type PropertiesType = {
  id: string;
  users: UserType;
  name: string;
  propertyCategories: PropertyCategoriesType;
  description: string;
  checkInTime?: string;
  checkOutTime?: string;
  address: string;
  reviews: ReviewType[];
  propertyFacilities: PropertyFacility[];
  propertyPictures: PropertyPicturesType[];
};
