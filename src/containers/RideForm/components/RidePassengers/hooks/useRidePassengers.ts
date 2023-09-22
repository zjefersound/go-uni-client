import { ICreateRidePayload, IRideBill } from "@/services/ride";
import { useState } from "react";

interface Props {
  rideData: ICreateRidePayload;
  handleChangeValue: (id: string, value: any) => void;
}
export function useRidePassengers({ rideData, handleChangeValue }: Props) {
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

  const handleItemClick = (index: number) => {
    setOpenModal(true);
    setBillToEditIndex(index);
  };

  const handleOpenCreate = () => {
    setBillToEditIndex(null);
    setOpenModal(true);
  };

  const initialData = isEditing ? rideData.bills[billToEditIndex] : null;

  return {
    openModal,
    setOpenModal,
    toggleBillPaid,
    onDeleteRideForm,
    onSubmitRideForm,
    setBillToEditIndex,
    handleItemClick,
    handleOpenCreate,
    initialData,
  };
}
