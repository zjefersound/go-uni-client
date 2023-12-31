import { billService } from "@/services/bill";
import { getSessionUser } from "../api/auth/[...nextauth]/functions/getSessionUser";
import { TotalBillReceipt } from "./TotalBillReceipt";
import { PassengerReceipt } from "./PassengerReceipt";
import { getBillsGroupedByPayer } from "@/services/utils/billServiceUtils";
import { Empty } from "@/components/Empty";

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
      {!bills?.length && <Empty>Sem contas a receber</Empty>}
      {Boolean(bills?.length) && (
        <>
          <TotalBillReceipt groupedBills={groupedBills} bills={bills} />
          <h2 className="font-bold">Contas por passageiro:</h2>
        </>
      )}
      {Object.entries(groupedBills).map(([key, bills]) => (
        <PassengerReceipt key={key} bills={bills} />
      ))}
    </>
  );
}
