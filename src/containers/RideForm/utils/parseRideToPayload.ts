import { IRide } from "@/models/IRide";
import { ICreateRidePayload } from "@/services/ride";

export function parseRideToPayload(ride: IRide) {
  return {
    tripId: ride.trip._id,
    carId: ride.car._id,
    date: ride.date,
    passengers: ride.passengers,
    passengersOneWay: ride.passengersOneWay,
    pricePerPassenger: ride.pricePerPassenger,
    extraCosts: ride.extraCosts,
    observations: ride.observations,
    paid: ride.paid,
    bills: ride.bills.map((bill) => ({
      amount: bill.amount,
      payer: bill.payer,
      payerId: bill.payer?._id,
      description: bill.description,
      paid: bill.paid,
      _id: bill._id,
      date: bill.date,
      currency: bill.currency,
      receiver: bill.receiver,
    })),
  } as ICreateRidePayload;
}
