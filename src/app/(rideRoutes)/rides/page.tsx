import { rideService } from "@/services/ride";
import Link from "next/link";
import { RideCard } from "@/components/ride/RideCard";
import { Empty } from "@/components/Empty";

export default async function Rides() {
  const rides = await rideService.getAll();
  return (
    <>
      {Boolean(rides?.length) && <h2 className="font-bold">Todas as caronas:</h2>}
      {!rides?.length && <Empty>Nenhuma carona encontrada</Empty>}
      <ul className="space-y-2">
        {rides.map((ride) => (
          <li key={ride._id}>
            <Link href={`/ride/${ride._id}`}>
              <RideCard ride={ride} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
