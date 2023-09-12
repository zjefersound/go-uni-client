import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { tripService } from "@/services/trip";
import { CreateRideForm } from "./CreateRideForm";
import { Content } from "@/components/Content";
import { getSessionUser } from "../api/auth/[...nextauth]/functions/getSessionUser";

export default async function NewRide() {
  const user = await getSessionUser();
  const trips = await tripService.getAll();
  const cars = await carService.getAll({ userId: user?.id });

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
