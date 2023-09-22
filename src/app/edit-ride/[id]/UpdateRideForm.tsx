"use client";
import { AlertDialog } from "@/components/AlertDialog";
import { TextButton } from "@/components/TextButton";
import { RideForm } from "@/containers/RideForm";
import { parseRideToPayload } from "@/containers/RideForm/utils/parseRideToPayload";
import { useToast } from "@/hooks/useToast";
import { ICar } from "@/models/ICar";
import { IRide } from "@/models/IRide";
import { ITrip } from "@/models/ITrip";
import { IUser } from "@/models/IUser";
import { ICreateRidePayload, rideService } from "@/services/ride";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
interface Props {
  ride: IRide;
  trips: ITrip[];
  cars: ICar[];
  passengers: IUser[];
}
export function UpdateRideForm({ ride, cars, trips, passengers }: Props) {
  const router = useRouter();
  const { launchToast } = useToast();

  const onSubmit = (rideData: ICreateRidePayload) => {
    const payload = {
      ...rideData,
      extraCosts: rideData.extraCosts ?? 0,
      billsToDelete: (ride.bills || [])
        .filter(
          (bill) =>
            bill._id &&
            !rideData.bills.some((payloadBill) => payloadBill._id === bill._id)
        )
        .map((b) => b._id),
    };

    return api
      .patch(`/ride/${ride._id}`, payload)
      .then((res) => {
        launchToast({
          open: true,
          title: "Carona atualizada",
          description: "",
          type: "success",
        });
      })
      .then(() => {
        router.push(`/ride/${ride._id}`);
        router.refresh();
      })
      .catch((error) => {
        launchToast({
          open: true,
          title: "Erro ao atualizar carona",
          description: "Tente novamente",
          type: "error",
        });
      });
  };

  const onDelete = () => {
    rideService
      .delete(
        ride._id,
        ride.bills.map((bill) => bill._id)
      )
      .then((res) => {
        launchToast({
          open: true,
          title: "Carona deletada",
          description: "",
          type: "success",
        });
      })
      .then(() => {
        router.push(`/`);
        router.refresh();
      })
      .catch((error) => {
        launchToast({
          open: true,
          title: "Erro ao deletar carona",
          description: "Tente novamente",
          type: "error",
        });
      });
  };
  return (
    <>
      <RideForm
        trips={trips}
        cars={cars}
        passengers={passengers}
        initialData={parseRideToPayload(ride)}
        submitText="Salvar alterações"
        onSubmit={onSubmit}
      />
      <AlertDialog
        title="Deletar carona"
        description="Esta ação não poderá ser desfeita. Você realmente deseja deletar essa carona?"
        okText="Sim, deletar"
        onConfirm={onDelete}
      >
        <TextButton type="danger">
          <AiOutlineDelete className="mr-2" /> Excluir
        </TextButton>
      </AlertDialog>
    </>
  );
}
