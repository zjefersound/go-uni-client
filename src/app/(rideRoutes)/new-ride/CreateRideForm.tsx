"use client";

import { RideForm } from "@/containers/RideForm";
import { useToast } from "@/hooks/useToast";
import { ICar } from "@/models/ICar";
import { ITrip } from "@/models/ITrip";
import { useRouter } from "next/navigation";
import { ICreateRidePayload } from "@/services/ride";
import { IUser } from "@/models/IUser";
import { api } from "@/utils/api";

interface Props {
  trips: ITrip[];
  cars: ICar[];
  passengers: IUser[];
}
export function CreateRideForm({ trips, cars, passengers }: Props) {
  const router = useRouter();
  const { launchToast } = useToast();

  const onSubmit = (rideData: ICreateRidePayload) => {
    const payload = {
      ...rideData,
      extraCosts: rideData.extraCosts ?? 0,
    };
    
    return api
      .post("/ride", payload)
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
      passengers={passengers}
      submitText="Criar carona"
      onSubmit={onSubmit}
    />
  );
}
