import { ISanityImage } from "./ISanityImage";

export interface ICar {
  _id: string;
  model: string;
  freeSeats: number;
  distancePerLiter: number;
  photo: ISanityImage;
}

export interface ICarPayload {
  model: string;
  freeSeats: number;
  distancePerLiter: number;
  ownerId: string;
  photo: any;
}