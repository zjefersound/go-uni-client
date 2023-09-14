import { sanityClient } from "@/configs/sanity";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IRepositoryOptions } from "@/models/IRepositoryOptions";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { sortToGroq } from "@/utils/sortToGroq";
import { toSanityRef } from "@/utils/toSanityRef";
import { groq } from "next-sanity";

export interface IFuelSupplyPayload {
  date: string;
  carId: string;
  price: number;
  pricePerLiter: number;
}

const getAll: (
  options?: IRepositoryOptions
) => Promise<IFuelSupply[]> = async ({ filters, rawGroq = '', sort } = {}) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"] ${filtersToGroq(
    filters
  )} ${rawGroq} | ${sortToGroq(sort ?? { key: "date", type: "desc" })} {
    ...,
    car -> {
      ...
    }
  }`);
};

const getById: (
  id: string,
  options?: IRepositoryOptions
) => Promise<IFuelSupply> = (id) => {
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

const getLastUntilDate: (
  date: string,
  options?: IRepositoryOptions
) => Promise<IFuelSupply> = async (date, { rawGroq = '' } = {}) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"][date <= "${date}"] ${rawGroq} | order(date desc)[0]{
    ...
  }`);
};

const create = (fuelSupply: IFuelSupplyPayload) => {
  return sanityClient.create({
    _type: "fuelSupply",
    date: fuelSupply.date,
    pricePerLiter: fuelSupply.pricePerLiter,
    price: fuelSupply.price,
    car: toSanityRef(fuelSupply.carId),
  });
};

const patch = (id: string, fuelSupply: IFuelSupplyPayload) => {
  const payload: any = { ...fuelSupply };

  if (fuelSupply.carId) {
    payload.car = toSanityRef(fuelSupply.carId);
    delete payload.carId;
  }
  return sanityClient.patch(id).set(payload).commit();
};
const handleDelete = (id: string) => {
  return sanityClient.delete(id);
};

export const fuelSupplyRepository = {
  getAll,
  getById,
  create,
  patch,
  delete: handleDelete,
  getLastUntilDate,
};
