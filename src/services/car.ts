import { sanityClient } from "@/configs/sanity";
import { ICar } from "@/models/ICar";
import { groq } from "next-sanity";

const getAll: ({ userId }: { userId: string }) => Promise<ICar[]> = ({
  userId,
}) => {
  return sanityClient.fetch(groq`*[_type == "car"][owner._ref == "${userId}"]{
    _id,
    model,
    freeSeats,
    distancePerLiter,
    photo,
  }`);
};

export const carService = {
  getAll,
};
