import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { sanityClient } from "@/configs/sanity";
import { ICar } from "@/models/ICar";
import { groq } from "next-sanity";

const getAll: () => Promise<ICar[]> = async () => {
  const user = await getSessionUser();

  return sanityClient.fetch(groq`*[_type == "car"][owner._ref == "${user.id}"]{
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
