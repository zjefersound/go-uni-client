import { sanityClient } from "@/configs/sanity";
import { IUser } from "@/models/IUser";
import { groq } from "next-sanity";

const getById: (id: string) => Promise<IUser> = (id) => {
  return sanityClient.fetch(groq`*[_type == "user"][_id == "${id}"][0]{
    _id,
    _createdAt,
    name,
    username,
    email,
    avatar,
  }`);
};

const getPasswordByUsername: (
  username: string
) => Promise<{ _id: string; password: string; }> = (username) => {
  return sanityClient.fetch(groq`*[_type == "user"][username == "${username}"][0]{
    _id,
    password,
  }`);
};

export const userService = {
  getById,
  getPasswordByUsername
};
