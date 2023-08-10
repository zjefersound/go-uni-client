import { sanityClient } from "@/configs/sanity";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IServiceOptions } from "@/models/IServiceOptions";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { groq } from "next-sanity";

const getAll: (options?: IServiceOptions) => Promise<IFuelSupply[]> = ({ filters } = {}) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"] ${filtersToGroq(filters)} | order(date desc) {
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
