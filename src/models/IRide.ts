import { IBill } from "./IBill";
import { ICar } from "./ICar";
import { ITrip } from "./ITrip";
import { IUser } from "./IUser";

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
  driver: IUser;
  bills: IBill[];
}

export interface IRidePayload {
  date: string;
  paid: boolean;
  tripId: string;
  carId: string;
  driverId?: string;
  passengers: number;
  passengersOneWay: number;
  pricePerPassenger: number;
  extraCosts: number;
  observations: string;
  billIds: string[];
}