import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { tripService } from "@/services/trip";
import { UpdateRideForm } from "./UpdateRideForm";
import { rideService } from "@/services/ride";
import { Content } from "@/components/Content";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";

export const dynamic = "force-dynamic";

export default async function EditRide({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession(nextAuthOptions);
  const ride = await rideService.getById(id);
  const trips = await tripService.getAll();
  const cars = await carService.getAll({ userId: session?.user.id});

  return (
    <main>
      <Header title="Editar carona" goBackHref={`/ride/${ride._id}`} />
      <Content>
        <p className="text-sm text-gray-600">
          Preencha as informações para atualizar a carona
        </p>
        <UpdateRideForm ride={ride} trips={trips} cars={cars} />
      </Content>
    </main>
  );
}
