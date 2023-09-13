import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { sanityClient } from "@/configs/sanity";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IRepositoryOptions } from "@/models/IRepositoryOptions";
import { filtersToGroq } from "@/utils/filtersToGroq";
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
) => Promise<IFuelSupply[]> = async ({
  filters,
  rawGroq,
  order = { key: "date", type: "desc" },
} = {}) => {
  return sanityClient.fetch(groq`*[_type == "fuelSupply"] ${filtersToGroq(
    filters
  )} ${rawGroq} | order(${order.key} ${order.type}) {
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
) => Promise<IFuelSupply> = async (date) => {
  const user = await getSessionUser();
  return sanityClient.fetch(groq`*[_type == "fuelSupply" && car._ref in *[_type=="car" && owner._ref=="${user.id}"]._id][date <= "${date}"] | order(date desc)[0]{
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
  getLastUntilDate,
  create,
  patch,
  delete: handleDelete,
};
