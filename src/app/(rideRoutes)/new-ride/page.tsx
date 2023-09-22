import { carService } from "@/services/car";
import { tripService } from "@/services/trip";
import { CreateRideForm } from "./CreateRideForm";
import { userService } from "@/services/user";

export default async function NewRide() {
  const trips = await tripService.getAll();
  const cars = await carService.getAll();
  const passengers = await userService.getAllPassengers();

  return (
    <>
      <p className="text-sm text-gray-600">
        Preencha as informações para criar uma nova carona
      </p>
      <CreateRideForm trips={trips} cars={cars} passengers={passengers} />
    </>
  );
}
