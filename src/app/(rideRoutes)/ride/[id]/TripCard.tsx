import { Card } from "@/components/Card";
import { ITrip } from "@/models/ITrip";
import {
  AiOutlineArrowRight,
  AiOutlineClockCircle,
  AiOutlineEnvironment,
} from "react-icons/ai";

export function TripCard({ trip }: { trip: ITrip }) {
  return (
    <Card>
      <h2 className="font-bold">Trajeto:</h2>
      <div className="mt-3">
        <div className="flex justify-evenly items-center mb-3">
          <span className="text-gray-600 text-sm flex items-center">
            <AiOutlineEnvironment className="mr-1" />
            {trip.from}
          </span>
          <AiOutlineArrowRight className="text-emerald-600 h-4 w-4" />
          <span className="text-gray-600 text-sm flex items-center">
            <AiOutlineEnvironment className="mr-1" />
            {trip.to}
          </span>
        </div>
        <div className="flex space-x-4">
          <p className="text-xs text-gray-600">
            Distância (ida e volta): {trip.distance} Km
          </p>
          <p className="text-xs text-gray-600 flex items-center">
            <AiOutlineClockCircle className="mr-1" /> {trip.duration} min
          </p>
        </div>
      </div>
    </Card>
  );
}
