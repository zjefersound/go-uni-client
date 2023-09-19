import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IBillPayload } from "@/models/IBill";
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

export interface IRideBill extends Partial<IBillPayload>{
  amount: number;
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
  bills: IRideBill[];
}

const create = async (ride: ICreateRidePayload) => {
  const payload: any = { ...ride };
  delete payload.bills;
  const bills = [];
  for (const bill of ride.bills) {
    const response = await BillRepository.create({
      amount: bill.amount,
      date: ride.date,
      paid: bill.paid || false,
      description: bill.description,
      payerId: bill.payerId,
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
