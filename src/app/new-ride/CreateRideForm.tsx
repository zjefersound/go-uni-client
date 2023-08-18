"use client";

import { RideForm } from "@/containers/RideForm";
import { useToast } from "@/hooks/useToast";
import { ICar } from "@/models/ICar";
import { ITrip } from "@/models/ITrip";
import { IRidePayload, rideService } from "@/services/ride";
import { useRouter } from "next/navigation";

interface Props {
  trips: ITrip[];
  cars: ICar[];
}
export function CreateRideForm({ trips, cars }: Props) {
  const router = useRouter();
  const { launchToast } = useToast();

  const onSubmit = (rideData: IRidePayload) => {
    return rideService
      .create(rideData)
      .then((res) => {
        launchToast({
          open: true,
          title: "Carona criada",
          description: "",
          type: "success",
        });
        router.push("/");
        router.refresh();
      })
      .catch((error) => {
        launchToast({
          open: true,
          title: "Erro ao criar carona",
          description: "Tente novamente",
          type: "error",
        });
      });
  };
  return (
    <RideForm
      trips={trips}
      cars={cars}
      submitText="Criar carona"
      onSubmit={onSubmit}
    />
  );
}
