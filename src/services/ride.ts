import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { IBill } from "@/models/IBill";
import { IRide } from "@/models/IRide";
import { IServiceOptions } from "@/models/IServiceOptions";
import BillRepository from "@/repositories/BillRepository";
import RideRepository from "@/repositories/RideRepository";
import { getRideBillPayload, getRidePayload } from "./utils/rideServiceUtils";

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

export interface IPatchRidePayload extends ICreateRidePayload {
  billsToDelete: string[];
}

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

const create = async (ride: ICreateRidePayload) => {
  const payload: any = getRidePayload(ride);
  const bills = [];

  // Create and save bills from payload
  for (const bill of ride.bills) {
    const response = await BillRepository.create(
      getRideBillPayload(ride, bill)
    );
    bills.push(response);
  }

  // Link bill ids to ride
  payload.billIds = bills.map((bill) => bill._id);

  return RideRepository.create(payload);
};

const patch = async (id: string, ride: IPatchRidePayload) => {
  const payload: any = getRidePayload(ride);
  const bills = [];

  // Handle bills for a ride
  for (const bill of ride.bills) {
    const billPayload = getRideBillPayload(ride, bill);
    let response;
    if (bill._id) {
      // Update existent bill
      response = await BillRepository.patch(bill._id, billPayload);
    } else {
      // Create a new bill
      response = await BillRepository.create(billPayload);
    }
    bills.push(response);
  }
  payload.billIds = bills.map((bill) => bill._id);
  const result = await RideRepository.patch(id, payload);

  // Delete bills after removing the reference from the ride
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
