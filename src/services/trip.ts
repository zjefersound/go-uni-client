import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import TripRepository from "@/repositories/TripRepository";

const getAll = async () => {
  const user = await getSessionUser();
  return TripRepository.getAll({
    filters: [{ key: "user._id", operation: "==", value: user.id }],
  });
};

export const tripService = {
  getAll,
};
