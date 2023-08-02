import { IRide } from "@/models/IRide";

export function calculateRideTotal({
  pricePerPassenger = 0,
  passengers = 0,
  passengersOneWay = 0,
  extraCosts = 0,
}: IRide) {
  return (
    pricePerPassenger * passengers +
    (pricePerPassenger / 2) * passengersOneWay +
    extraCosts
  );
}
