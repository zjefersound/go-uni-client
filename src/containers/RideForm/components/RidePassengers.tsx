"use client";
import { Label } from "@/components/forms/Label";
import { ICreateRidePayload, IRideBill } from "@/services/ride";
import { AiOutlinePlus } from "react-icons/ai";
import { IUser } from "@/models/IUser";
import { CardButton } from "@/components/CardButton";
import { Dialog } from "@/components/Dialog";
import { RideBillForm } from "./RideBillForm";
import { useState } from "react";
import { RidePassengersList } from "./RidePassengersList";

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
  const [openModal, setOpenModal] = useState(false);
  const [billToEditIndex, setBillToEditIndex] = useState<number | null>(null);
  const isEditing = typeof billToEditIndex === "number";

  const toggleBillPaid = (index: number, value: boolean) => {
    const newBills = [...rideData.bills];
    newBills[index].paid = value;
    handleChangeValue("bills", newBills);
  };

  const onDeleteRideForm = () => {
    const newBills = [...rideData.bills].filter(
      (_, index) => index !== billToEditIndex
    );
    handleChangeValue("bills", newBills);
    setBillToEditIndex(null);
    setOpenModal(false);
  };

  const onSubmitRideForm = (bill: IRideBill) => {
    const newBills = [...rideData.bills];
    if (isEditing) {
      newBills[billToEditIndex] = bill;
    } else {
      newBills.push(bill);
    }
    handleChangeValue("bills", newBills);
    setBillToEditIndex(null);
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col">
      <Label>Passageiros:</Label>
      <RidePassengersList
        rideData={rideData}
        onItemClick={(index) => {
          setOpenModal(true);
          setBillToEditIndex(index);
        }}
        onToggleBillPaid={toggleBillPaid}
      />
      <div className="flex mt-2">
        <CardButton
          className="my-2"
          onClick={() => {
            setBillToEditIndex(null);
            setOpenModal(true);
          }}
          disabled={Boolean(!rideData.pricePerPassenger)}
        >
          <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Adicionar
          passageiro
        </CardButton>
      </div>
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Content title="Adicionar passageiro">
          {(isEditing || openModal) && (
            <RideBillForm
              initialData={isEditing ? rideData.bills[billToEditIndex] : null}
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
