import { sanityClient } from "@/configs/sanity";
import { IFuelSupply } from "@/models/IFuelSupply";
import { groq } from "next-sanity";

const getAll: () => Promise<IFuelSupply[]> = () => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"]{
    ...
  }`);
};

const getLastUntilDate: (date: string) => Promise<IFuelSupply> = (date) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"][date <= "${date}"][0]{
    ...
  }`);
};

export const fuelSupplyService = {
  getAll,
  getLastUntilDate,
};
