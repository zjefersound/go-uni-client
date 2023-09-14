import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IServiceOptions } from "@/models/IServiceOptions";
import FuelSupplyRepository from "@/repositories/FuelSupplyRepository";
import { IFuelSupplyPayload } from "@/models/IFuelSupply";
import { groq } from "next-sanity";

const getFindByCarOwnerGroq = (userId: string) =>
  groq`[car._ref in *[_type=="car" && owner._ref=="${userId}"]._id ]`;

const getAll = async ({ filters }: IServiceOptions = {}) => {
  const user = await getSessionUser();
  return FuelSupplyRepository.getAll({
    filters,
    rawGroq: getFindByCarOwnerGroq(user.id),
  });
};

const getById = (id: string) => {
  return FuelSupplyRepository.getById(id);
};

const getLastUntilDate = async (date: string) => {
  const user = await getSessionUser();
  return FuelSupplyRepository.getLastUntilDate(date, {
    rawGroq: getFindByCarOwnerGroq(user.id),
  });
};

const create = (fuelSupply: IFuelSupplyPayload) => {
  return FuelSupplyRepository.create(fuelSupply);
};

const patch = (id: string, fuelSupply: IFuelSupplyPayload) => {
  return FuelSupplyRepository.patch(id, fuelSupply);
};

const handleDelete = (id: string) => {
  return FuelSupplyRepository.delete(id);
};

export const fuelSupplyService = {
  getAll,
  getById,
  create,
  patch,
  delete: handleDelete,
  getLastUntilDate,
};
