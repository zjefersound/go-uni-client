"use client";
import { RideForm } from "@/containers/RideForm";
import { parseRideToPayload } from "@/containers/RideForm/utils/parseRideToPayload";
import { useToast } from "@/hooks/useToast";
import { ICar } from "@/models/ICar";
import { IRide, IRidePayload } from "@/models/IRide";
import { ITrip } from "@/models/ITrip";
import { rideService } from "@/services/ride";
import { useRouter } from "next/navigation";
interface Props {
  ride: IRide;
  trips: ITrip[];
  cars: ICar[];
}
export function UpdateRideForm({ ride, cars, trips }: Props) {
  const router = useRouter();
  const { launchToast } = useToast();

  const onSubmit = (rideData: IRidePayload) => {
    return rideService
      .patch(ride._id, rideData)
      .then((res) => {
        launchToast({
          open: true,
          title: "Carona atualizada",
          description: "",
          type: "success",
        });
      })
      .then(() => {
        router.push(`/ride/${ride._id}`)
        router.refresh()
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

  return (
    <RideForm
      trips={trips}
      cars={cars}
      initialData={parseRideToPayload(ride)}
      submitText="Salvar alterações"
      onSubmit={onSubmit}
    />
  );
}
