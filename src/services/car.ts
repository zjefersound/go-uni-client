import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import CarRepository from "@/repositories/CarRepository";

const getAll = async () => {
  const user = await getSessionUser();
  return CarRepository.getAll({
    filters: [{ key: "owner._id", operation: "==", value: user.id }],
  });
};

export const carService = {
  getAll,
};
