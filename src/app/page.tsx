"use client";
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
import { toCurrency } from "@/utils/toCurrency";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { urlFor } from "@/configs/sanity";
import Link from "next/link";
import { printDate } from "@/utils/date/printDate";

export default async function Home() {
  const todaysRide = await rideService.getToday();
  const rides = await rideService.getRecents();
  return (
    <main>
      <Header />
      <div className="p-3 flex flex-col space-y-3">
        {todaysRide && (
          <Link href={`/ride/${todaysRide._id}`}>
            <Card>
              <h3 className="font-bold">Carona do dia:</h3>
              <div className="flex justify-between mt-3 space-x-3">
                <div className="text-sm text-gray-600">
                  <p>Carro: {todaysRide.car.model}</p>
                  <p>Passageiros: {todaysRide.passengers}</p>
                  <p>Apenas ida ou volta: {todaysRide.passengersOneWay}</p>
                  <p>
                    Preço/passageiro: {toCurrency(todaysRide.pricePerPassenger)}
                  </p>
                  <hr className="my-2" />
                  <p>
                    <strong>
                      Total: {toCurrency(calculateRideTotal(todaysRide))}
                    </strong>
                  </p>
                </div>
                <img
                  className="h-[5rem]"
                  src={urlFor(todaysRide.car.photo).url()}
                  alt={todaysRide.car.model}
                />
              </div>
            </Card>
          </Link>
        )}

        <div className="flex space-x-2">
          <CardButton href="/new-ride">
            <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Nova carona
          </CardButton>
          <CardButton href="/payments">
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
          <Link className="text-emerald-600 font-semibold" href="/rides">
            Ver todas
          </Link>
        </div>
        <ul className="space-y-2">
          {rides.map((ride) => (
            <li key={ride._id}>
              <Link href={`/ride/${ride._id}`}>
                <Card>
                  <div className="flex justify-between">
                    <div>
                      <p> {printDate(ride.date)}</p>
                      <div className="flex space-x-2">
                        <p className="text-xs text-gray-600">
                          {ride.car.model}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center">
                          <AiOutlineUser /> {ride.passengers}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center">
                          <AiOutlineUserSwitch /> {ride.passengersOneWay || 0}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center">
                          Pago: {ride.paid ? "Sim" : "Não"}
                        </p>
                      </div>
                    </div>
                    <p>
                      <strong>{toCurrency(calculateRideTotal(ride))}</strong>
                    </p>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
