import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IServiceOptions } from "@/models/IServiceOptions";
import FuelSupplyRepository, { IFuelSupplyPayload } from "@/repositories/FuelSupplyRepository";
import { groq } from "next-sanity";

const getFindByCarOwnerGroq = (userId: string) => groq`[car._ref in *[_type=="car" && owner._ref=="${userId}"]._id ]`;

const getAll: (options?: IServiceOptions) => Promise<IFuelSupply[]> = async ({
  filters,
} = {}) => {
  const user = await getSessionUser();
  return FuelSupplyRepository.getAll({
    filters,
    rawGroq: getFindByCarOwnerGroq(user.id),
  });
};

const getById: (id: string) => Promise<IFuelSupply> = (id) => {
  return FuelSupplyRepository.getById(id);
};

const getLastUntilDate: (date: string) => Promise<IFuelSupply> = async (
  date
) => {
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
