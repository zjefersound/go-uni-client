import { ITrip } from "@/models/ITrip";
import TripRepository from "@/repositories/TripRepository";

const getAll: () => Promise<ITrip[]> = () => {
  return TripRepository.getAll();
};

export const tripService = {
  getAll,
};
