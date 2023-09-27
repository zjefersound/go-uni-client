import { Card } from "@/components/Card";
import { IRide } from "@/models/IRide";
import { ESTIMATED_FUEL_PRICE_PER_LITER } from "@/constants";
import { calculateFuelCost } from "@/logic/calculateFuelCost";
import { toCurrency } from "@/utils/toCurrency";
import { printDate } from "@/utils/date/printDate";
import { IFuelSupply } from "@/models/IFuelSupply";

interface Props {
  ride: IRide;
  lastFuelSupply: IFuelSupply;
}

export function RideCostsCard({ lastFuelSupply, ride }: Props) {
  const fuelPrice =
    lastFuelSupply?.pricePerLiter || ESTIMATED_FUEL_PRICE_PER_LITER;

  return (
    <Card>
      <h2 className="font-bold">Custos:</h2>
      <div className="mt-3">
        {lastFuelSupply?.date && (
          <p className="text-sm text-gray-600">
            Abastecido em: {printDate(lastFuelSupply.date)}
          </p>
        )}
        <p className="text-sm text-gray-600">
          Litro gasolina: {toCurrency(fuelPrice)}
        </p>
        <p className="text-sm text-red-600">
          Custo pela viagem:{" "}
          {toCurrency(
            calculateFuelCost({
              distance: ride.trip.distance,
              distancePerLiter: ride.car.distancePerLiter,
              fuelPrice,
            })
          )}
        </p>
      </div>
    </Card>
  );
}
