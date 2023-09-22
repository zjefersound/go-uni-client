import { carService } from "@/services/car";
import { CreateFuelSupplyForm } from "./CreateFuelSupplyForm";

export default async function NewFuelSupply() {
  const cars = await carService.getAll();

  return (
    <>
      <p className="text-sm text-gray-600">
        Preencha as informações para criar um abastecimento
      </p>
      <CreateFuelSupplyForm cars={cars} />
    </>
  );
}
