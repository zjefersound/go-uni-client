import { sanityClient } from "@/configs/sanity";
import { ITrip } from "@/models/ITrip";
import { groq } from "next-sanity";

const getAll: () => Promise<ITrip[]> = () => {
  return sanityClient.fetch(groq`*[_type == "trip"]{
    ...
  }`);
};

export const tripService = {
  getAll,
};
