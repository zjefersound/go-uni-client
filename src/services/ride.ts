import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IRide, IRidePayload } from "@/models/IRide";
import { IServiceOptions } from "@/models/IServiceOptions";
import BillRepository from "@/repositories/BillRepository";
import RideRepository from "@/repositories/RideRepository";

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

export interface IRidePayloadPassenger {
  oneWay: boolean;
  userId?: string;
  description: string;
}
export interface ICreateRidePayload {
  date: string;
  paid: boolean;
  tripId: string;
  carId: string;
  driverId: string;
  passengers: number;
  passengersOneWay: number;
  pricePerPassenger: number;
  extraCosts: number;
  observations: string;
  selectedPassengers: IRidePayloadPassenger[];
}

const create = async (ride: ICreateRidePayload) => {
  const payload: any = { ...ride };
  delete payload.selectedPassengers;
  const bills = [];
  for (const passenger of ride.selectedPassengers) {
    const response = await BillRepository.create({
      amount: passenger.oneWay
        ? ride.pricePerPassenger / 2
        : ride.pricePerPassenger,
      date: ride.date,
      paid: false,
      description: passenger.description,
      payerId: passenger.userId,
      receiverId: ride.driverId,
    });
    bills.push(response);
  }
  payload.billIds = bills.map((bill) => bill._id)

  return RideRepository.create(payload);
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
