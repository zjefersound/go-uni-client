import { sanityClient } from "@/configs/sanity";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IServiceOptions } from "@/models/IServiceOptions";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { groq } from "next-sanity";

export interface IFuelSupplyPayload {
  date: string;
  carId: string;
  price: number;
  pricePerLiter: number;
}

const getAll: (options?: IServiceOptions) => Promise<IFuelSupply[]> = ({
  filters,
} = {}) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"] ${filtersToGroq(
    filters
  )} | order(date desc) {
    ...,
    car -> {
      ...
    }
  }`);
};

const getById: (id: string) => Promise<IFuelSupply> = (id) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"][_id == "${id}"][0]{
    _id,
    _createdAt,
    date,
    price,
    pricePerLiter,
    car -> {
      ...
    },
  }`);
};

const getLastUntilDate: (date: string) => Promise<IFuelSupply> = (date) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"][date <= "${date}"] | order(date desc)[0]{
    ...
  }`);
};

const create = (fuelSupply: IFuelSupplyPayload) => {
  return sanityClient.create({
    _type: "fuelSupply",
    date: fuelSupply.date,
    pricePerLiter: fuelSupply.pricePerLiter,
    price: fuelSupply.price,
    car: {
      _ref: fuelSupply.carId,
      _type: "reference",
    },
  });
};

const patch = (id: string, fuelSupply: IFuelSupplyPayload) => {
  const payload: any = { ...fuelSupply };

  if (fuelSupply.carId) {
    payload.car = {
      _ref: fuelSupply.carId,
      _type: "reference",
    };
    delete payload.carId;
  }
  return sanityClient.patch(id).set(payload).commit();
};

export const fuelSupplyService = {
  getAll,
  getById,
  getLastUntilDate,
  create,
  patch,
};
