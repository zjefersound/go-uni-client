import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { tripService } from "@/services/trip";
import { UpdateRideForm } from "./UpdateRideForm";
import { rideService } from "@/services/ride";

export default async function NewRide({ params }: { params: { id: string } }) {
  const { id } = params;
  const ride = await rideService.getById(id);
  const trips = await tripService.getAll();
  const cars = await carService.getAll();

  return (
    <main>
      <Header title="Editar carona" goBackHref={`/ride/${ride._id}`} />
      <div className="p-3 flex flex-col space-y-3">
        <p className="text-sm text-gray-600">
          Preencha as informações para atualizar a carona
        </p>
        <UpdateRideForm ride={ride} trips={trips} cars={cars} />
      </div>
    </main>
  );
}
