"use client";

import { FuelSupplyForm } from "@/containers/FuelSupplyForm";
import { useToast } from "@/hooks/useToast";
import { ICar } from "@/models/ICar";
import { IFuelSupplyPayload, fuelSupplyService } from "@/services/fuelSupply";
import { useRouter } from "next/navigation";

interface Props {
  cars: ICar[];
}
export function CreateFuelSupplyForm({ cars }: Props) {
  const router = useRouter();
  const { launchToast } = useToast();

  const onSubmit = (data: IFuelSupplyPayload) => {
    return fuelSupplyService
      .create(data)
      .then((res) => {
        launchToast({
          open: true,
          title: "Abastecimento criado",
          description: "",
          type: "success",
        });
        router.push("/fuel-supplies");
        router.refresh();
      })
      .catch((error) => {
        launchToast({
          open: true,
          title: "Erro ao criar abastecimento",
          description: "Tente novamente",
          type: "error",
        });
      });
  };
  return (
    <FuelSupplyForm cars={cars} submitText="Salvar abastecimento" onSubmit={onSubmit} />
  );
}
