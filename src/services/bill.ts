import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IBillPayload } from "@/models/IBill";
import { IServiceOptions } from "@/models/IServiceOptions";
import BillRepository from "@/repositories/BillRepository";

const getAll = async ({ filters = [] }: IServiceOptions = {}) => {
  const user = await getSessionUser();
  return BillRepository.getAll({
    filters: [
      { key: "receiver._id", operation: "==", value: user.id },
      ...filters,
    ],
  });
};

const getById = (id: string) => {
  return BillRepository.getById(id);
};

const create = (bill: IBillPayload) => {
  return BillRepository.create(bill);
};

const patch = (id: string, bill: IBillPayload) => {
  return BillRepository.patch(id, bill);
};

const handleDelete = (id: string) => {
  return BillRepository.delete(id);
};

export const billService = {
  getAll,
  getById,
  create,
  patch,
  delete: handleDelete,
};
