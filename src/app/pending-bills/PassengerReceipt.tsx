"use client";
import { Receipt } from "@/components/Receipt";
import { urlFor } from "@/configs/sanity";
import { IBill } from "@/models/IBill";
import { getBillsSum } from "@/services/utils/billServiceUtils";
import { printDate } from "@/utils/date/printDate";
import { printWeekday } from "@/utils/date/printWeekday";

interface Props {
  bills: IBill[];
}

export function PassengerReceipt({ bills }: Props) {
  return (
    <Receipt.Root>
      <div className="flex items-center">
        {bills[0].payer?.avatar && (
          <img
            src={urlFor(bills[0].payer?.avatar).url()}
            alt={bills[0].payer?.name}
            className="h-8 w-8 rounded-full mr-2"
          />
        )}
        <p className="font-bold">{bills[0].payer?.name || "Convidados"}:</p>
      </div>

      <Receipt.Section>
        {bills.map((bill) => (
          <Receipt.Item key={bill._id}>
            <div>
              <p className="flex">
                <span className="w-[5.5rem]">{printDate(bill.date)}</span>
                {printWeekday(bill.date)}
              </p>
              {bill.description?.trim() && (
                <p className="text-xs mb-1">{bill.description}</p>
              )}
            </div>
            <Receipt.Amount amount={bill.amount} />
          </Receipt.Item>
        ))}
      </Receipt.Section>
      <Receipt.Total amount={getBillsSum(bills)} />
    </Receipt.Root>
  );
}
