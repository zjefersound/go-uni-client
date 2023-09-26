import { Card } from "@/components/Card";
import { urlFor } from "@/configs/sanity";
import { rideService } from "@/services/ride";
import { toCurrency } from "@/utils/toCurrency";
import { printDate } from "@/utils/date/printDate";
import Link from "next/link";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineUserSwitch,
  AiOutlineArrowRight,
  AiOutlineEdit,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { fuelSupplyService } from "@/services/fuelSupply";
import { ESTIMATED_FUEL_PRICE_PER_LITER } from "@/constants";
import { calculateFuelCost } from "@/logic/calculateFuelCost";
import { RideReceipt } from "./RideReceipt";

export const dynamic = "force-dynamic";

export default async function Ride({ params }: { params: { id: string } }) {
  const { id } = params;
  const ride = await rideService.getById(id);
  const lastFuelSupply = await fuelSupplyService.getLastUntilDate(ride.date);
  const fuelPrice =
    lastFuelSupply?.pricePerLiter || ESTIMATED_FUEL_PRICE_PER_LITER;
  return (
    <>
      <Card>
        <div className="flex justify-between mt-3 space-x-3">
          <div>
            <h2 className="font-bold">Carro:</h2>
            <p className="text-sm text-gray-600">Modelo: {ride.car.model}</p>
            <p className="text-sm text-gray-600">
              Bancos livres: {ride.car.freeSeats}
            </p>
            <p className="text-sm text-gray-600">
              Consumo: {ride.car.distancePerLiter} Km/L
            </p>
          </div>
          <img
            className="h-[5rem]"
            src={urlFor(ride.car.photo).url()}
            alt={ride.car.model}
          />
        </div>
      </Card>
      <Card>
        <h2 className="font-bold">Trajeto:</h2>
        <div className="mt-3">
          <div className="flex justify-evenly items-center mb-3">
            <span className="text-gray-600 text-sm flex items-center">
              <AiOutlineEnvironment className="mr-1" />
              {ride.trip.from}
            </span>
            <AiOutlineArrowRight className="text-emerald-600 h-4 w-4" />
            <span className="text-gray-600 text-sm flex items-center">
              <AiOutlineEnvironment className="mr-1" />
              {ride.trip.to}
            </span>
          </div>
          <div className="flex space-x-4">
            <p className="text-xs text-gray-600">
              Distância (ida e volta): {ride.trip.distance} Km
            </p>
            <p className="text-xs text-gray-600 flex items-center">
              <AiOutlineClockCircle className="mr-1" /> {ride.trip.duration} min
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <AiOutlineCalendar className="text-emerald-600 mr-1 h-4 w-4" />
          <h2 className="font-bold text-sm">
            {printDate(ride.date)} - Passageiros
          </h2>
          <Link
            href={`/edit-ride/${ride._id}`}
            className="ml-auto transition text-emerald-600 hover:text-emerald-500"
          >
            <AiOutlineEdit className="h-5 w-5" />
          </Link>
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

      <RideReceipt ride={ride} />
    </>
  );
}