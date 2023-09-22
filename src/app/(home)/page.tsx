import { rideService } from "@/services/ride";
import { HomeCards } from "./HomeCards";
import { DailyRide } from "./DailyRide";
import { LastRides } from "./LastRides";

export default async function Home() {
  const dailyRide = await rideService.getToday();
  const rides = await rideService.getRecents();
  return (
    <>
      {dailyRide && <DailyRide ride={dailyRide} />}
      <HomeCards />
      <LastRides rides={rides} />
    </>
  );
}
