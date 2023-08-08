import { sanityClient } from "@/configs/sanity";
import { ICar } from "@/models/ICar";
import { groq } from "next-sanity";

const getAll: () => Promise<ICar[]> = () => {
  return sanityClient.fetch(groq`*[_type == "car"]{
    ...
  }`);
};

export const carService = {
  getAll,
};
