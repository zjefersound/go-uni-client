import { Card } from "@/components/Card";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { ISanityFilter } from "@/models/ISanityFilter";
import { fuelSupplyService } from "@/services/fuelSupply";
import { rideService } from "@/services/ride";
import { addDays } from "@/utils/date/addDays";
import { dateToString } from "@/utils/date/dateToString";
import { toCurrency } from "@/utils/toCurrency";
import { printDate } from "@/utils/date/printDate";
import { getPreviousMonday } from "@/utils/date/getPreviousMonday";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCalendar,
} from "react-icons/ai";
import { PiGasPump } from "react-icons/pi";
import { WeekBar } from "./WeekBar";
import { reverseArray } from "@/utils/reverseArray";
import { Empty } from "@/components/Empty";

export const dynamic = "force-dynamic";

export default async function Payments() {
  const previousMonday = getPreviousMonday();
  const startDate = dateToString(previousMonday);
  const finishDate = dateToString(addDays(previousMonday, 6));

  const dateFilters: ISanityFilter[] = [
    { key: "date", operation: ">=", value: startDate },
    { key: "date", operation: "<=", value: finishDate },
  ];

  const fuelSupplies = await fuelSupplyService.getAll({
    filters: dateFilters,
  });
  const rides = await rideService.getAll({
    filters: dateFilters,
  });

  return (
    <>
      <h2 className="font-bold">Entradas e saídas da semana </h2>
      <div className="flex items-center text-sm text-gray-600">
        <AiOutlineCalendar className="text-emerald-600 mr-2" />
        De {printDate(startDate)} até {printDate(finishDate)}
      </div>
      <WeekBar firstDate={previousMonday} rides={reverseArray(rides)} />

      {Boolean(fuelSupplies?.length) && (
        <h3 className="font-bold">Abastecimentos:</h3>
      )}
      {fuelSupplies.map((fuelSupply) => (
        <Card key={fuelSupply._id}>
          <div className="flex items-center">
            <AiOutlineArrowUp className="text-red-600 h-5 w-5" />
            <PiGasPump className="text-red-600 h-5 w-5 mr-3" />

            <p className="text-sm text-gray-600 mr-auto">
              {printDate(fuelSupply.date)}
            </p>
            <p className="text-sm text-gray-600 mr-3">
              {toCurrency(fuelSupply.pricePerLiter)}/L
            </p>
            <p className="text-sm text-red-600 font-bold">
              {toCurrency(fuelSupply.price)}
            </p>
          </div>
        </Card>
      ))}
      {Boolean(rides?.length) && <h3 className="font-bold">Caronas pagas:</h3>}
      {rides
        .filter((ride) => ride.paid)
        .map((ride) => (
          <Card key={ride._id}>
            <div className="flex items-center">
              <AiOutlineArrowDown className="text-emerald-600 h-5 w-5" />
              <PiGasPump className="text-emerald-600 h-5 w-5 mr-3" />
              <p className="text-sm text-gray-600 mr-auto">
                {printDate(ride.date)}
              </p>
              <p className="text-sm text-gray-600 mr-3">
                {toCurrency(ride.pricePerPassenger)}/p
              </p>
              <p className="text-sm text-emerald-600 font-bold">
                {toCurrency(calculateRideTotal(ride))}
              </p>
            </div>
          </Card>
        ))}
      {Boolean(rides?.length) && (
        <h3 className="font-bold">Caronas a receber:</h3>
      )}
      {rides
        .filter((ride) => !ride.paid)
        .map((ride) => (
          <Card key={ride._id}>
            <div className="flex items-center">
              <PiGasPump className="text-gray-600 h-5 w-5 mr-3" />
              <p className="text-sm text-gray-600 mr-auto">
                {printDate(ride.date)}
              </p>
              <p className="text-sm text-gray-600 mr-3">
                {toCurrency(ride.pricePerPassenger)}/p
              </p>
              <p className="text-sm text-gray-600 font-bold">
                {toCurrency(calculateRideTotal(ride))}
              </p>
            </div>
          </Card>
        ))}
      {!rides?.length && <Empty>Nenhuma carona encontrada</Empty>}
    </>
  );
}
