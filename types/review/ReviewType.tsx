import { type } from "os";

export type ReviewType = {
  id: string;
  rating: number;
  author: string;
  date: string;
  feedback: string;
  reply: string;
  //   response?: {
  //     author: string;
  //     date: string;
  //     content: string;
  //   };
};
