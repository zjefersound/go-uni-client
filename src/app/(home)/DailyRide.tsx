import { Card } from "@/components/Card";
import { urlFor } from "@/configs/sanity";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import { IRide } from "@/models/IRide";
import { toCurrency } from "@/utils/toCurrency";
import Link from "next/link";
import React from "react";

export function DailyRide({ ride }: { ride: IRide }) {
  return (
    <Link href={`/ride/${ride._id}`}>
      <Card>
        <h3 className="font-bold">Carona do dia:</h3>
        <div className="flex justify-between mt-3 space-x-3">
          <div className="text-sm text-gray-600">
            <p>Carro: {ride.car.model}</p>
            <p>Passageiros: {ride.passengers}</p>
            <p>Apenas ida ou volta: {ride.passengersOneWay}</p>
            <p>Preço/passageiro: {toCurrency(ride.pricePerPassenger)}</p>
            <hr className="my-2" />
            <p>
              <strong>
                Total: {toCurrency(calculateRideTotal(ride))}
              </strong>
            </p>
          </div>
          <img
            className="h-[5rem]"
            src={urlFor(ride.car.photo).url()}
            alt={ride.car.model}
          />
        </div>
      </Card>
    </Link>
  );
}
