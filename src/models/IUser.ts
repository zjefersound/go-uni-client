import { ISanityImage } from "./ISanityImage";

export interface IUser {
  _id: string;
  _createdAt: string;
  username: string;
  name: string;
  email: string;
  password?: string;
  avatar: ISanityImage;
  role: string;
}

export interface IUserPayload {
  username: string;
  name: string;
  email: string;
  password?: string;
  avatar: any;
  role: string;
}
