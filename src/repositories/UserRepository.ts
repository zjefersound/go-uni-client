import { IUser } from "@/models/IUser";
import { BaseRepository } from "./BaseRepository";
import { groq } from "next-sanity";
import { sanityClient } from "@/configs/sanity";

export interface IUserPayload {
  username: string;
  name: string;
  email: string;
  password?: string;
  avatar: any;
  role: string;
}

class UserRepository extends BaseRepository<IUser, IUserPayload> {
  constructor() {
    super();
    this.type = "user";
    this.objectProjection = groq`
      _id,
      _createdAt,
      name,
      username,
      email,
      avatar,
      role,
    `;
  }
  getPasswordByUsername(
    username: string
  ): Promise<{ _id: string; password: string }> {
    return sanityClient.fetch(groq`*[_type == "user"][username == "${username}"][0]{
      _id,
      password,
    }`);
  }
}

export default new UserRepository();
