import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { fuelSupplyService } from "@/services/fuelSupply";
import { rideService } from "@/services/ride";
import { dateToString } from "@/utils/dateToString";
import { printDate, toCurrency } from "@/utils/formatters";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCalendar,
} from "react-icons/ai";
import { PiGasPump } from "react-icons/pi";

export default async function Payments() {
  const now = new Date();
  const today = dateToString(now);
  const startDate = dateToString(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
  );

  const fuelSupplies = await fuelSupplyService.getAll({
    filters: [
      { key: "date", operation: "<=", value: today },
      { key: "date", operation: ">=", value: startDate },
    ],
  });

  const rides = await rideService.getAll({
    filters: [
      { key: "date", operation: "<=", value: today },
      { key: "date", operation: ">=", value: startDate },
    ],
  });
  return (
    <main>
      <Header title="Pagamentos" goBackHref="/" />
      <div className="p-3 flex flex-col space-y-3">
        <h2 className="font-bold">Entradas e saídas nos últimos 7 dias </h2>
        <div className="flex items-center text-sm text-gray-600">
          <AiOutlineCalendar className="text-emerald-600 mr-2" />
          De {printDate(startDate)} até {printDate(today)}
        </div>
        <h3 className="font-bold">Abastecimentos:</h3>
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
        <h3 className="font-bold">Caronas pagas:</h3>
        {rides.filter(ride => ride.paid).map((ride) => (
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
        <h3 className="font-bold">Caronas a receber:</h3>
        {rides.filter(ride => !ride.paid).map((ride) => (
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
      </div>
    </main>
  );
}
