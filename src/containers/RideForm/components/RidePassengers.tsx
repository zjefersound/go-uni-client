"use client";
import { Label } from "@/components/forms/Label";
import { Switch } from "@/components/forms/Switch";
import { ICreateRidePayload, IRideBill } from "@/services/ride";
import { toCurrency } from "@/utils/toCurrency";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { IUser } from "@/models/IUser";
import { urlFor } from "@/configs/sanity";
import { CardButton } from "@/components/CardButton";
import { Dialog } from "@/components/Dialog";
import { RideBillForm } from "./RideBillForm";
import { useState } from "react";

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

  const toggleBillPaid = (index: number, value: boolean) => {
    const newBills = [...rideData.bills];
    newBills[index].paid = value;
    handleChangeValue("bills", newBills);
  };

  const onDeleteRideForm = () => {
    const newBills = [...rideData.bills].filter((_, index) => index !== billToEditIndex);
    handleChangeValue("bills", newBills);
    setOpenModal(false)
  };
  
  const onSubmitRideForm = (bill: IRideBill) => {
    const newBills = [...rideData.bills];
    if (typeof billToEditIndex === "number") {
      newBills[billToEditIndex] = bill;
    } else {
      newBills.push(bill);
    }
    handleChangeValue("bills", newBills);
    setBillToEditIndex(null);
    setOpenModal(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex">
        <Label>Passageiros:</Label>
      </div>
      <ul className="flex flex-col space-y-2">
        {rideData.bills?.map((bill: IRideBill, index) => (
          <li key={bill._id} className="flex items-center">
            <div
              className="flex flex-1 items-center"
              onClick={() => {
                setOpenModal(true);
                setBillToEditIndex(index);
              }}
            >
              {bill.payer?.avatar ? (
                <img
                  className="h-8 w-8 rounded-full mr-2"
                  src={urlFor(bill.payer?.avatar).url()}
                  alt={bill.payer?.name}
                />
              ) : (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 mr-2">
                  <AiOutlineUser className="text-white h-4 w-4" />
                </div>
              )}
              <div className="flex flex-col">
                <p className="text-red-400">
                  {bill.payer?.name || bill.description || "Convidado"}
                </p>
                <span className="text-xs text-gray-600">
                  {bill.amount === rideData.pricePerPassenger
                    ? "Ida e volta"
                    : "Apenas ida (ou volta)"}
                </span>
              </div>
              <p className="ml-auto mr-2 font-bold">
                {toCurrency(bill.amount)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 leading-1">Pago</span>
              <Switch
                value={bill.paid}
                onChange={(value) => toggleBillPaid(index, !bill.paid)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex">
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
          {(typeof billToEditIndex === "number" || openModal) && (
            <RideBillForm
              initialData={
                typeof billToEditIndex === "number"
                  ? rideData.bills[billToEditIndex]
                  : null
              }
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
