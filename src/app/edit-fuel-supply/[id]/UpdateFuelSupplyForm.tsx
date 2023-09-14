"use client";
import { AlertDialog } from "@/components/AlertDialog";
import { FuelSupplyForm } from "@/containers/FuelSupplyForm";
import { parseFuelSupplyToPayload } from "@/containers/FuelSupplyForm/utils/parseFuelSupplyToPayload";
import { useToast } from "@/hooks/useToast";
import { ICar } from "@/models/ICar";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IFuelSupplyPayload } from "@/repositories/FuelSupplyRepository";
import { fuelSupplyService } from "@/services/fuelSupply";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
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
        router.push(`/fuel-supplies`);
        router.refresh();
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
  const onDelete = () => {
    fuelSupplyService
      .delete(fuelSupply._id)
      .then((res) => {
        launchToast({
          open: true,
          title: "Abastecimento deletado",
          description: "",
          type: "success",
        });
      })
      .then(() => {
        router.push(`/fuel-supplies`);
        router.refresh();
      })
      .catch((error) => {
        launchToast({
          open: true,
          title: "Erro ao deletar abastecimento",
          description: "Tente novamente",
          type: "error",
        });
      });
  };

  return (
    <>
      <FuelSupplyForm
        cars={cars}
        initialData={parseFuelSupplyToPayload(fuelSupply)}
        submitText="Salvar alterações"
        onSubmit={onSubmit}
      />
      <AlertDialog
        title="Deletar abastecimento"
        description="Esta ação não poderá ser desfeita. Você realmente deseja deletar esse abastecimento?"
        okText="Sim, deletar"
        onConfirm={onDelete}
      >
        <button className="text-red-600  flex items-center font-bold w-min ">
          <AiOutlineDelete className="mr-2" /> Excluir
        </button>
      </AlertDialog>
    </>
  );
}
