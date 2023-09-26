"use client";
import { IRide } from "@/models/IRide";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { AiOutlineCheck } from "react-icons/ai";
import { Receipt } from "@/components/Receipt";

export function RideReceipt({ ride }: { ride: IRide }) {
  return (
    <Receipt.Root>
      <h2 className="font-bold">A receber:</h2>

      <Receipt.Section>
        <Receipt.Subtitle>Passageiros</Receipt.Subtitle>
        {ride.bills
          ?.filter((bill) => bill.amount === ride.pricePerPassenger)
          .map((bill) => (
            <Receipt.Item key={bill._id}>
              <p>+ {bill.payer?.name || bill.description || "Convidado"}</p>
              {bill.paid && (
                <AiOutlineCheck className="bg-emerald-600 text-white ml-1 rounded" />
              )}
              <Receipt.Amount amount={bill.amount} />
            </Receipt.Item>
          ))}
      </Receipt.Section>

      {Boolean(ride.passengersOneWay) && (
        <Receipt.Section>
          <Receipt.Subtitle>Passageiros (apenas ida ou volta)</Receipt.Subtitle>
          {ride.bills
            ?.filter((bill) => bill.amount === ride.pricePerPassenger / 2)
            .map((bill) => (
              <Receipt.Item key={bill._id}>
                <p>+ {bill.payer?.name || bill.description || "Convidado"}</p>
                {bill.paid && (
                  <AiOutlineCheck className="bg-emerald-600 text-white ml-1 rounded" />
                )}
                <Receipt.Amount amount={bill.amount} />
              </Receipt.Item>
            ))}
        </Receipt.Section>
      )}

      <Receipt.Section>
        <Receipt.Item>
          <p>+ Custos extras:</p>
          <Receipt.Amount amount={ride.extraCosts} />
        </Receipt.Item>
      </Receipt.Section>

      <Receipt.Total amount={calculateRideTotal(ride)} />
    </Receipt.Root>
  );
}
