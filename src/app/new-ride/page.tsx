import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { tripService } from "@/services/trip";
import { CreateRideForm } from "./CreateRideForm";
import { Content } from "@/components/Content";

export default async function NewRide() {
  const trips = await tripService.getAll();
  const cars = await carService.getAll();

  return (
    <main>
      <Header title="Nova carona" goBackHref="/" />
      <Content>
        <p className="text-sm text-gray-600">
          Preencha as informações para criar uma nova carona
        </p>
        <CreateRideForm trips={trips} cars={cars} />
      </Content>
    </main>
  );
}
