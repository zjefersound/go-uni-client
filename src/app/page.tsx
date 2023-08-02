import {
  AiOutlineUser,
  AiOutlineUserSwitch,
  AiOutlinePlus,
  AiOutlineAreaChart,
  AiOutlineDollar,
} from "react-icons/ai";

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { CardButton } from "@/components/CardButton";
import { rideService } from "@/services/ride";
import { printDate, toCurrency } from "@/utils/formatters";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { urlFor } from "@/config/sanity";

export default async function Home() {
  const todaysRide = await rideService.getToday();
  const rides = await rideService.getRecents();
  return (
    <main>
      <Header />
      <div className="p-3 flex flex-col space-y-3">
        {todaysRide && (
          <Card>
            <h3 className="font-bold">Carona do dia:</h3>
            <div className="flex justify-between mt-3 space-x-3">
              <div className="text-sm text-gray-600">
                <p>Carro: {todaysRide.car.model}</p>
                <p>Passageiros: {todaysRide.passengers}</p>
                <p>Apenas ida ou volta: {todaysRide.passengersOneWay}</p>
                <p>Preço/passageiro: {toCurrency(todaysRide.pricePerPassenger)}</p>
                <hr className="my-2" />
                <p>
                  <strong>Total: {toCurrency(calculateRideTotal(todaysRide))}</strong>
                </p>
              </div>
              <img
                className="h-[5rem]"
                src={urlFor(todaysRide.car.photo).url()}
                alt={todaysRide.car.model}
              />
            </div>
          </Card>
        )}

        <div className="flex space-x-2">
          <CardButton href="/new-ride">
            <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Nova carona
          </CardButton>
          <CardButton href="/new-ride">
            <AiOutlineDollar className="h-8 w-8 text-emerald-600" />
            Pagamentos
          </CardButton>
          <CardButton href="/new-ride">
            <AiOutlineAreaChart className="h-8 w-8 text-emerald-600" />
            Relatórios
          </CardButton>
        </div>

        <div className="flex justify-between">
          <h3 className="font-bold">Últimas caronas:</h3>
          <a className="text-emerald-600 font-semibold" href="">
            Ver todas
          </a>
        </div>
        <ul className="space-y-2">
          {rides.map((ride) => (
            <li key={ride._id}>
              <Card>
                <div className="flex justify-between">
                  <div>
                    <p>{ride.car.model}</p>
                    <div className="flex space-x-2">
                      <p className="text-xs text-gray-600">
                        {printDate(ride.date)}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center">
                        <AiOutlineUser /> {ride.passengers}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center">
                        <AiOutlineUserSwitch /> {ride.passengersOneWay || 0}
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong>{toCurrency(calculateRideTotal(ride))}</strong>
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
