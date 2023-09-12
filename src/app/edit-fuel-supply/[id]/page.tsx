import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { UpdateFuelSupplyForm } from "./UpdateFuelSupplyForm";
import { fuelSupplyService } from "@/services/fuelSupply";
import { Content } from "@/components/Content";

export const dynamic = "force-dynamic";

export default async function EditFuelSupply({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const fuelSupply = await fuelSupplyService.getById(id);
  const cars = await carService.getAll();

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
