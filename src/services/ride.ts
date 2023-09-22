import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IBill } from "@/models/IBill";
import { IRide } from "@/models/IRide";
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

export interface IRideBill extends Partial<IBill> {
  amount: number;
  description: string;
  payerId?: string;
}
export interface ICreateRidePayload {
  date: string;
  paid: boolean;
  tripId: string;
  carId: string;
  driverId: string;
  pricePerPassenger: number;
  extraCosts: number;
  observations: string;
  bills: IRideBill[];
}

const create = async (ride: ICreateRidePayload) => {
  const payload: any = {
    ...ride,
    passengers: ride.bills.filter(
      (bill) => bill.amount === ride.pricePerPassenger
    ).length,
    passengersOneWay: ride.bills.filter(
      (bill) => bill.amount === ride.pricePerPassenger / 2
    ).length,
  };
  delete payload.bills;
  const bills = [];
  for (const bill of ride.bills) {
    const response = await BillRepository.create({
      amount: bill.amount,
      date: ride.date,
      paid: bill.paid ?? false,
      description: bill.description,
      payerId: bill.payerId,
      receiverId: ride.driverId,
    });
    bills.push(response);
  }
  payload.billIds = bills.map((bill) => bill._id);

  return RideRepository.create(payload);
};

export interface IPatchRidePayload extends ICreateRidePayload {
  billsToDelete: string[];
}

const patch = async (id: string, ride: IPatchRidePayload) => {
  const payload: any = {
    ...ride,
    passengers: ride.bills.filter(
      (bill) => bill.amount === ride.pricePerPassenger
    ).length,
    passengersOneWay: ride.bills.filter(
      (bill) => bill.amount === ride.pricePerPassenger / 2
    ).length,
  };
  delete payload.bills;
  delete payload.billsToDelete;
  const bills = [];

  for (const bill of ride.bills) {
    if (bill._id) {
      const response = await BillRepository.patch(bill._id, {
        amount: bill.amount,
        date: ride.date,
        paid: bill.paid ?? false,
        description: bill.description,
        payerId: bill.payerId,
        receiverId: ride.driverId,
      });

      bills.push(response);
    } else {
      const response = await BillRepository.create({
        amount: bill.amount,
        date: ride.date,
        paid: bill.paid ?? false,
        description: bill.description,
        payerId: bill.payerId,
        receiverId: ride.driverId,
      });

      bills.push(response);
    }
  }

  payload.billIds = bills.map((bill) => bill._id);

  const result = await RideRepository.patch(id, payload);

  for (const billId of ride.billsToDelete) {
    await BillRepository.delete(billId);
  }

  return result;
};
const handleDelete = async (id: string, billIds: string[]) => {
  const result = await RideRepository.delete(id);
  for (const billId of billIds) {
    await BillRepository.delete(billId);
  }

  return result;
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
