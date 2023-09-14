import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IServiceOptions } from "@/models/IServiceOptions";
import { IFuelSupplyPayload, fuelSupplyRepository } from "@/repositories/fuelSupplyRepository";
import { groq } from "next-sanity";

const getFindByCarOwnerGroq = (userId: string) => groq`[car._ref in *[_type=="car" && owner._ref=="${userId}"]._id ]`;

const getAll: (options?: IServiceOptions) => Promise<IFuelSupply[]> = async ({
  filters,
} = {}) => {
  const user = await getSessionUser();
  return fuelSupplyRepository.getAll({
    filters,
    rawGroq: getFindByCarOwnerGroq(user.id),
  });
};

const getById: (id: string) => Promise<IFuelSupply> = (id) => {
  return fuelSupplyRepository.getById(id);
};

const getLastUntilDate: (date: string) => Promise<IFuelSupply> = async (
  date
) => {
  const user = await getSessionUser();
  return fuelSupplyRepository.getLastUntilDate(date, {
    rawGroq: getFindByCarOwnerGroq(user.id),
  });
};

const create = (fuelSupply: IFuelSupplyPayload) => {
  return fuelSupplyRepository.create(fuelSupply);
};

const patch = (id: string, fuelSupply: IFuelSupplyPayload) => {
  return fuelSupplyRepository.patch(id, fuelSupply);
};

const handleDelete = (id: string) => {
  return fuelSupplyRepository.delete(id);
};

export const fuelSupplyService = {
  getAll,
  getById,
  getLastUntilDate,
  create,
  patch,
  delete: handleDelete,
};
