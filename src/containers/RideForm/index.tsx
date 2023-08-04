"use client";
import { useState } from "react";
import { SelectTrip } from "./components/SelectTrip";
import { ITrip } from "@/models/ITrip";
import { ICar } from "@/models/ICar";

interface Props {
  trips: ITrip[];
  cars: ICar[];
}

export function RideForm({ trips, cars }: Props) {
  const [rideData, setRideData] = useState({} as any);
  return (
    <div>
      <div>
        <label htmlFor="">Trajeto:</label>
        <SelectTrip
          items={trips}
          value={rideData.tripId}
          onChange={(value) =>
            setRideData((d: any) => ({ ...d, tripId: value }))
          }
        />
      </div>
    </div>
  );
}
