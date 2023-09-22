import { Card } from "@/components/Card";
import { IRide } from "@/models/IRide";
import { toCurrency } from "@/utils/toCurrency";
import { arrayOfKeys } from "@/utils/arrayOfKeys";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import {
  AiOutlineCheck,
} from "react-icons/ai";

export function RideReceipt({ ride }: { ride: IRide }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-bold">A receber:</h2>
      </div>
      <div className="text-sm text-gray-600 mt-3">
        <p>Passageiros</p>
        <hr className="my-1" />
        {ride.bills
          ?.filter((bill) => bill.amount === ride.pricePerPassenger)
          .map((bill) => (
            <div key={bill._id} className="flex items-center">
              <p>+ {bill.payer?.name || bill.description || "Convidado"}</p>
              {bill.paid && <AiOutlineCheck className="bg-emerald-600 text-white ml-1 rounded" />}
              <p className="ml-auto">{toCurrency(bill.amount)}</p>
            </div>
          ))}
        {!ride.bills &&
          arrayOfKeys(ride.passengers).map((index) => (
            <div key={index} className="flex justify-between">
              <p>+ passageiro {index + 1}:</p>
              <p>{toCurrency(ride.pricePerPassenger)}</p>
            </div>
          ))}
      </div>

      {Boolean(ride.passengersOneWay) && (
        <div className="text-sm text-gray-600 mt-3">
          <p>Passageiros (apenas ida ou volta)</p>
          <hr className="my-1" />
          {ride.bills
            ?.filter((bill) => bill.amount === ride.pricePerPassenger/2)
            .map((bill) => (
              <div key={bill._id} className="flex items-center">
                <p>+ {bill.payer?.name || bill.description || "Convidado"}</p>
                {bill.paid && <AiOutlineCheck className="bg-emerald-600 text-white ml-1 rounded" />}
                <p className="ml-auto">{toCurrency(bill.amount)}</p>
              </div>
            ))}
          {!ride.bills && arrayOfKeys(ride.passengersOneWay).map((index) => (
            <div key={index} className="flex justify-between">
              <p>+ passageiro {index + 1}:</p>
              <p>{toCurrency(ride.pricePerPassenger / 2)}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-600 mt-3">
        <div className="flex justify-between">
          <p>+ Custos extras:</p>
          <p>{toCurrency(ride.extraCosts)}</p>
        </div>
      </div>

      <hr className="my-1 border-emerald-600" />
      <div className=" text-emerald-600">
        <div className="flex justify-between">
          <p>Total</p>
          <p>{toCurrency(calculateRideTotal(ride))}</p>
        </div>
      </div>
    </Card>
  );
}
