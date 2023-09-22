import { carService } from "@/services/car";
import { UpdateFuelSupplyForm } from "./UpdateFuelSupplyForm";
import { fuelSupplyService } from "@/services/fuelSupply";

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
    <>
      <p className="text-sm text-gray-600">
        Preencha as informações para atualizar o abastecimento
      </p>
      <UpdateFuelSupplyForm fuelSupply={fuelSupply} cars={cars} />
    </>
  );
}
