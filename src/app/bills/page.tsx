import { billService } from "@/services/bill";
import { getSessionUser } from "../api/auth/[...nextauth]/functions/getSessionUser";
import { TotalBillReceipt } from "./TotalBillReceipt";
import { PassengerReceipt } from "./PassengerReceipt";
import { getBillsGroupedByPayer } from "@/services/utils/billServiceUtils";

export default async function Bills() {
  const user = await getSessionUser();
  const bills = await billService.getAll({
    filters: [
      { key: "receiver._id", operation: "==", value: user.id },
      { key: "paid", operation: "==", value: false },
    ],
  });
  const groupedBills = getBillsGroupedByPayer(bills);

  return (
    <>
      <TotalBillReceipt groupedBills={groupedBills} bills={bills} />
      {Object.entries(groupedBills).map(([key, bills]) => (
        <PassengerReceipt key={key} bills={bills} />
      ))}
    </>
  );
}
