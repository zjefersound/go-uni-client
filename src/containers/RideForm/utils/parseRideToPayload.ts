import { IRide } from "@/models/IRide";
import { IRidePayload } from "@/repositories/RideRepository";

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
  } as IRidePayload;
}
