import { ISanityImage } from "./ISanityImage";

export interface IUser {
  _id: string;
  _createdAt: string;
  username: string;
  name: string;
  email: string;
  password?: string;
  avatar: ISanityImage;
}