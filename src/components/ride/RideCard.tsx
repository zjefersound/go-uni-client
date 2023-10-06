import { printDate } from "@/utils/date/printDate";
import { Card } from "../Card";
import {
  AiOutlineUser,
  AiOutlineUserSwitch,
  AiOutlineDollar,
} from "react-icons/ai";
import { toCurrency } from "@/utils/toCurrency";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { IRide } from "@/models/IRide";

export function RideCard({ ride }: { ride: IRide }) {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <p> {printDate(ride.date)}</p>
          <div className="flex space-x-2">
            <p className="text-xs text-gray-600">{ride.car.model}</p>
            <p className="text-xs text-gray-600 flex items-center">
              <AiOutlineUser /> {ride.passengers}
            </p>
            <p className="text-xs text-gray-600 flex items-center">
              <AiOutlineUserSwitch /> {ride.passengersOneWay || 0}
            </p>
            <p
              className={`text-xs font-bold ${
                ride.paid ? "text-emerald-600" : "text-gray-600"
              } flex items-center`}
            >
              <AiOutlineDollar /> {ride.paid ? "Pago" : "Pendente"}
            </p>
          </div>
        </div>
        <p>
          <strong>{toCurrency(calculateRideTotal(ride))}</strong>
        </p>
      </div>
    </Card>
  );
}
