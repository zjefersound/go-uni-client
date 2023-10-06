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
    sort: {key: 'date', type: 'asc'}
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

const payByIds = async (ids: string[]) => {
  const results = [];
  for (const billId of ids) {
    const result = await BillRepository.patch(billId, { paid: true });
    results.push(result);
  }
  return results;
}

export const billService = {
  getAll,
  getById,
  create,
  patch,
  delete: handleDelete,
  payByIds
};
