"use client";
import { Switch } from "@/components/forms/Switch";
import { useToast } from "@/hooks/useToast";
import { IRide } from "@/models/IRide";
import { rideService } from "@/services/ride";
import { useCallback, useState } from "react";

interface Props {
  ride: IRide;
}
export function SwitchPaid({ ride }: Props) {
  const { launchToast } = useToast();
  const [isPaid, setIsPaid] = useState(ride.paid);

  const handleOnChange = useCallback(() => {
    setIsPaid(!isPaid);

    rideService
      .patch(ride._id, { paid: !isPaid })
      .then(() => {
        launchToast({
          open: true,
          title: "Carona atualizada",
          description: "",
          type: "success",
        });
      })
      .catch((error) => {
        launchToast({
          open: true,
          title: "Erro ao atualizar",
          description: "Tente novamente",
          type: "error",
        });
      });
  }, [isPaid]);

  return <Switch value={isPaid} onChange={handleOnChange} />;
}
