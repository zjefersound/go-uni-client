import { Card } from "@/components/Card";
import { IRide } from "@/models/IRide";
import { printDate } from "@/utils/date/printDate";
import { toCurrency } from "@/utils/toCurrency";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";

export function RidePassengersCard({ ride }: { ride: IRide }) {
  return (
    <Card>
      <div className="flex items-center">
        <AiOutlineCalendar className="text-emerald-600 mr-1 h-4 w-4" />
        <h2 className="font-bold text-sm">
          {printDate(ride.date)} - Passageiros
        </h2>
      </div>
      <div className="text-sm text-gray-600 mt-3">
        <div className="flex justify-between">
          <div className=" py-1 flex flex-col items-center">
            <div className="flex text-emerald-600 items-center space-x-1">
              <span className="text-xl">{ride.passengers}</span>
              <AiOutlineUser className="h-5 w-5" />
            </div>
            <p className="text-xs">Passageiros</p>
          </div>
          <div className="py-1 flex flex-col items-center">
            <div className="flex text-emerald-600 items-center space-x-1">
              <span className="text-xl">{ride.passengersOneWay || 0}</span>
              <AiOutlineUserSwitch className=" h-5 w-5" />
            </div>
            <p className="text-xs">Apenas ida ou volta</p>
          </div>
          <div className="py-1 flex flex-col items-center">
            <div className="flex text-emerald-600 items-center space-x-1">
              <span className="text-xl">
                {toCurrency(ride.pricePerPassenger)}
              </span>
            </div>
            <p className="text-xs">Preço/passageiro</p>
          </div>
        </div>
        <p className="mt-3">Obs: {ride.observations || "Sem observações"}</p>
      </div>
    </Card>
  );
}
