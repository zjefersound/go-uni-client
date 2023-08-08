"use client";
import { Toast } from "@/components/Toast";
import { Switch } from "@/components/forms/Switch";
import { IRide } from "@/models/IRide";
import { rideService } from "@/services/ride";
import { useCallback, useState } from "react";

interface Props {
  ride: IRide;
}
export function SwitchPaid({ ride }: Props) {
  const [isPaid, setIsPaid] = useState(ride.paid);
  const [toastProps, setToastProps] = useState({
    open: false,
    type: "success",
    title: "",
    description: "",
  });

  const handleOnChange = useCallback(() => {
    setIsPaid(!isPaid);

    rideService
      .patch(ride._id, { paid: !isPaid })
      .then(() => {
        setToastProps({
          open: true,
          title: "Carona atualizada",
          description: "",
          type: "success",
        });
      })
      .catch((error) => {
        setToastProps({
          open: true,
          title: "Erro ao atualizar",
          description: "Tente novamente",
          type: "error",
        });
      });
  }, [isPaid]);

  return (
    <>
      <Switch value={isPaid} onChange={handleOnChange} />
      <Toast
        type={toastProps.type as any}
        title={toastProps.title}
        description={toastProps.description}
        open={toastProps.open}
        setOpen={(value) => setToastProps({ ...toastProps, open: value })}
      />
    </>
  );
}
