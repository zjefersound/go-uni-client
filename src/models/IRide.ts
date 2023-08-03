import { ICar } from "./ICar";
import { ITrip } from "./ITrip";

export interface IRide {
  _id: string;
  _createdAt: string;
  passengers: number;
  passengersOneWay: number;
  date: string;
  pricePerPassenger: number;
  extraCosts: number;
  observations: string;
  paid: boolean;
  car: ICar;
  trip: ITrip;
}
