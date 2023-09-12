import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { UpdateFuelSupplyForm } from "./UpdateFuelSupplyForm";
import { fuelSupplyService } from "@/services/fuelSupply";
import { Content } from "@/components/Content";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function EditFuelSupply({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession(nextAuthOptions);
  const fuelSupply = await fuelSupplyService.getById(id);
  const cars = await carService.getAll({ userId: session?.user.id});

  return (
    <main>
      <Header title="Editar abastecimento" goBackHref={`/fuel-supplies`} />
      <Content>
        <p className="text-sm text-gray-600">
          Preencha as informações para atualizar o abastecimento
        </p>
        <UpdateFuelSupplyForm fuelSupply={fuelSupply} cars={cars} />
      </Content>
    </main>
  );
}
