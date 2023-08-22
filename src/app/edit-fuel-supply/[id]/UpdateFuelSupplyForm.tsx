"use client";
import { FuelSupplyForm } from "@/containers/FuelSupplyForm";
import { parseFuelSupplyToPayload } from "@/containers/FuelSupplyForm/utils/parseFuelSupplyToPayload";
import { useToast } from "@/hooks/useToast";
import { ICar } from "@/models/ICar";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IFuelSupplyPayload, fuelSupplyService } from "@/services/fuelSupply";
import { useRouter } from "next/navigation";
interface Props {
  fuelSupply: IFuelSupply;
  cars: ICar[];
}
export function UpdateFuelSupplyForm({ fuelSupply, cars }: Props) {
  const router = useRouter();
  const { launchToast } = useToast();

  const onSubmit = (data: IFuelSupplyPayload) => {
    return fuelSupplyService
      .patch(fuelSupply._id, data)
      .then((res) => {
        launchToast({
          open: true,
          title: "Abastecimento atualizado",
          description: "",
          type: "success",
        });
      })
      .then(() => {
        router.push(`/fuel-supplies`)
        router.refresh()
      })
      .catch((error) => {
        launchToast({
          open: true,
          title: "Erro ao atualizar abastecimento",
          description: "Tente novamente",
          type: "error",
        });
      });
  };

  return (
    <FuelSupplyForm
      cars={cars}
      initialData={parseFuelSupplyToPayload(fuelSupply)}
      submitText="Salvar alterações"
      onSubmit={onSubmit}
    />
  );
}
