import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IRide } from "@/models/IRide";
import { IServiceOptions } from "@/models/IServiceOptions";
import RideRepository, { IRidePayload } from "@/repositories/RideRepository";

const getToday = async () => {
  const user = await getSessionUser();
  return RideRepository.getToday({
    filters: [{ key: "driver._id", operation: "==", value: user.id }],
  });
};

const getRecents = async () => {
  const user = await getSessionUser();
  return RideRepository.getRecents({
    filters: [{ key: "driver._id", operation: "==", value: user.id }],
  });
};

const getAll = async ({ filters = [] }: IServiceOptions = {}) => {
  const user = await getSessionUser();
  return RideRepository.getAll({
    filters: [
      { key: "driver._id", operation: "==", value: user.id },
      ...filters,
    ],
  });
};

const getById: (id: string) => Promise<IRide> = (id) => {
  return RideRepository.getById(id);
};

const create = async (ride: IRidePayload) => {
  const user = await getSessionUser();
  return RideRepository.create({ ...ride, driverId: user.id });
};

const patch = (id: string, ride: Partial<IRidePayload>) => {
  return RideRepository.patch(id, ride);
};
const handleDelete = (id: string) => {
  return RideRepository.delete(id);
};

export const rideService = {
  getAll,
  getById,
  create,
  patch,
  delete: handleDelete,
  getToday,
  getRecents,
};
