import { rideService } from "@/services/ride";
import { fuelSupplyService } from "@/services/fuelSupply";
import { RideReceipt } from "./RideReceipt";
import { CarCard } from "./CarCard";
import { TripCard } from "./TripCard";
import { RideCostsCard } from "./RideCostsCard";
import { RidePassengersCard } from "./RidePassengersCard";

export default async function Ride({ params }: { params: { id: string } }) {
  const { id } = params;
  const ride = await rideService.getById(id);
  const lastFuelSupply = await fuelSupplyService.getLastUntilDate(ride.date);

  return (
    <>
      <CarCard car={ride.car} />
      <TripCard trip={ride.trip} />
      <RidePassengersCard ride={ride} />
      <RideCostsCard ride={ride} lastFuelSupply={lastFuelSupply} />
      <RideReceipt ride={ride} />
    </>
  );
}
