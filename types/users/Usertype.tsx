import {Gender} from "@/types/gender/Gender";

export type UserType = {
  id: string;
  email: string;
  username: string;
  profilePicture: string;
  role: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: Gender;
};
