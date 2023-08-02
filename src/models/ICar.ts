import { ISanityImage } from "./ISanityImage";

export interface ICar {
  _id: string;
  model: string;
  freeSeats: number;
  photo: ISanityImage;
}