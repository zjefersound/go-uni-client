"use client";
import { Label } from "@/components/forms/Label";
import { ICreateRidePayload } from "@/services/ride";
import { AiOutlinePlus } from "react-icons/ai";
import { IUser } from "@/models/IUser";
import { CardButton } from "@/components/CardButton";
import { Dialog } from "@/components/Dialog";
import { RideBillForm } from "../RideBillForm";
import { RidePassengersList } from "../RidePassengersList";
import { useRidePassengers } from "./hooks/useRidePassengers";

interface Props {
  passengers: IUser[];
  rideData: ICreateRidePayload;
  handleChangeValue: (id: string, value: any) => void;
}
export function RidePassengers({
  passengers,
  rideData,
  handleChangeValue,
}: Props) {
  const {
    openModal,
    setOpenModal,
    initialData,
    onDeleteRideForm,
    onSubmitRideForm,
    toggleBillPaid,
    handleItemClick,
    handleOpenCreate,
  } = useRidePassengers({ handleChangeValue, rideData });

  return (
    <div className="flex flex-col">
      <Label>Passageiros:</Label>
      <RidePassengersList
        rideData={rideData}
        onItemClick={handleItemClick}
        onToggleBillPaid={toggleBillPaid}
      />
      <div className="flex mt-2">
        <CardButton
          className="my-2"
          onClick={handleOpenCreate}
          disabled={Boolean(!rideData.pricePerPassenger)}
        >
          <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Adicionar
          passageiro
        </CardButton>
      </div>
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Content title="Adicionar passageiro">
          {openModal && (
            <RideBillForm
              initialData={initialData}
              onSubmit={onSubmitRideForm}
              onDelete={onDeleteRideForm}
              passengers={passengers}
              rideData={rideData}
            />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
