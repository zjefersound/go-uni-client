"use client";
import { Receipt } from "@/components/Receipt";
import { IBill } from "@/models/IBill";
import { IGroupedBills, getBillsSum } from "@/services/utils/billServiceUtils";

interface Props {
  groupedBills: IGroupedBills;
  bills: IBill[];
}

export function TotalBillReceipt({ groupedBills, bills }: Props) {
  return (
    <Receipt.Root>
      <h2 className="font-bold">Totais:</h2>
      <Receipt.Section>
        {Object.entries(groupedBills).map(([key, bills]) => (
          <div key={key} className="flex items-center">
            <p>+ {bills[0].payer?.name || "Convidados"}</p>
            <Receipt.Amount amount={getBillsSum(bills)} />
          </div>
        ))}
      </Receipt.Section>
      <Receipt.Total amount={getBillsSum(bills)} />
    </Receipt.Root>
  );
}
