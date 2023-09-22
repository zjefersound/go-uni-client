import { ICreateRidePayload, IPatchRidePayload, IRideBill } from "../ride";

export function getRidePayload(ride: ICreateRidePayload | IPatchRidePayload) {
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
  return payload;
}

export function getRideBillPayload(ride: ICreateRidePayload, bill: IRideBill) {
  return {
    amount: bill.amount,
    date: ride.date,
    paid: bill.paid ?? false,
    description: bill.description,
    payerId: bill.payerId,
    receiverId: ride.driverId,
  };
}
