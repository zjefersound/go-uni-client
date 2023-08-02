import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { urlFor } from "@/config/sanity";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { rideService } from "@/services/ride";
import { arrayOfKeys } from "@/utils/arrayOfKeys";
import { printDate, toCurrency } from "@/utils/formatters";
import {
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";

export default async function Ride({ params }: { params: { id: string } }) {
  const { id } = params;
  const ride = await rideService.getById(id);

  return (
    <main>
      <Header title="Carona" goBackHref="/" />
      <div className="p-3 flex flex-col space-y-3">
        <Card>
          <div className="flex justify-between mt-3 space-x-3">
            <div>
              <h2 className="font-bold">Carro:</h2>
              <p className="text-sm text-gray-600">Modelo: {ride.car.model}</p>
              <p className="text-sm text-gray-600">
                Bancos livres: {ride.car.freeSeats}
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
            <p className="mt-3">
              Obs: {ride.observations || "Sem observações"}
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="font-bold">A receber:</h2>
          <div className="text-sm text-gray-600 mt-3">
            <p>Passageiros</p>
            <hr className="my-1" />
            {arrayOfKeys(ride.passengers).map((index) => (
              <div key={index} className="flex justify-between">
                <p>+ passageiro {index + 1}:</p>
                <p>{toCurrency(ride.pricePerPassenger)}</p>
              </div>
            ))}
          </div>
          {ride.passengersOneWay && (
            <div className="text-sm text-gray-600 mt-3">
              <p>Passageiros (apenas ida ou volta)</p>
              <hr className="my-1" />
              {arrayOfKeys(ride.passengersOneWay).map((index) => (
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

          <hr className="my-1 border-emerald-600"/>
          <div className=" text-emerald-600">
            <div className="flex justify-between">
              <p>Total</p>
              <p>{toCurrency(calculateRideTotal(ride))}</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
