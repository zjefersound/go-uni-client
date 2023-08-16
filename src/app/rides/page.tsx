import { AiOutlineUser, AiOutlineUserSwitch } from "react-icons/ai";

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { rideService } from "@/services/ride";
import { toCurrency } from "@/utils/toCurrency";
import { printDate } from "@/utils/date/printDate";
import { calculateRideTotal } from "@/logic/calculateRideTotal";
import Link from "next/link";
import { Content } from "@/components/Content";

export const dynamic = "force-dynamic";

export default async function Rides() {
  const rides = await rideService.getAll();
  return (
    <main>
      <Header title="Caronas" goBackHref="/" />
      <Content>
        <h2 className="font-bold">Todas as caronas:</h2>

        <ul className="space-y-2">
          {rides.map((ride) => (
            <li key={ride._id}>
              <Link href={`/ride/${ride._id}`}>
                <Card>
                  <div className="flex justify-between">
                    <div>
                      <p>{printDate(ride.date)}</p>
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
      </Content>
    </main>
  );
}
