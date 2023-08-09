import { ICar } from "./ICar";

export interface IFuelSupply {
  _id: string;
  _createdAt: string;
  pricePerLiter: number;
  price: number;
  date: string;
  car: ICar;
}