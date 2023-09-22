import { Switch } from "@/components/forms/Switch";
import { urlFor } from "@/configs/sanity";
import { ICreateRidePayload, IRideBill } from "@/services/ride";
import { toCurrency } from "@/utils/toCurrency";
import clsx from "clsx";
import { AiOutlineUser } from "react-icons/ai";

interface Props {
  rideData: ICreateRidePayload;
  onItemClick: (index: number) => void;
  onToggleBillPaid: (index: number, value: boolean) => void;
}
export function RidePassengersList({
  rideData,
  onItemClick,
  onToggleBillPaid,
}: Props) {
  return (
    <ul
      className={clsx("flex flex-col space-y-2", {
        "mt-3 mb-3": rideData.bills.length,
      })}
    >
      {rideData.bills?.map((bill: IRideBill, index) => (
        <li key={bill._id} className="flex items-center">
          <div
            className="flex flex-1 items-center"
            onClick={() => onItemClick(index)}
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
            <p className="ml-auto mr-2 font-bold">{toCurrency(bill.amount)}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 leading-1">Pago</span>
            <Switch
              value={bill.paid}
              onChange={(value) => onToggleBillPaid(index, !bill.paid)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
