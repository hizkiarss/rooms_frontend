import { PropertyCategoriesType } from "../property-categories/PropertyCategoriesType";
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
  slug: string
};
