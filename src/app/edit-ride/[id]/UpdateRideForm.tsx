"use client";
import { RideForm } from "@/containers/RideForm";
import { parseRideToPayload } from "@/containers/RideForm/utils/parseRideToPayload";
import { ICar } from "@/models/ICar";
import { IRide } from "@/models/IRide";
import { ITrip } from "@/models/ITrip";
interface Props {
  ride: IRide;
  trips: ITrip[];
  cars: ICar[];
}
export function UpdateRideForm({ ride, cars, trips }: Props) {
  return (
    <RideForm
      trips={trips}
      cars={cars}
      initialData={parseRideToPayload(ride)}
      submitText="Salvar alterações"
      onSubmit={(() => {}) as any}
    />
  );
}
