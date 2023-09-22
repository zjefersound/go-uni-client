import { rideService } from "@/services/ride";
import Link from "next/link";
import { RideCard } from "@/components/ride/RideCard";

export default async function Rides() {
  const rides = await rideService.getAll();
  return (
    <>
      <h2 className="font-bold">Todas as caronas:</h2>
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
