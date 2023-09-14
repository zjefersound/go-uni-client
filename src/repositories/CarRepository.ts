import { ICar } from "@/models/ICar";
import { groq } from "next-sanity";
import { BaseRepository } from "./BaseRepository";

export interface ICarPayload {
  model: string;
  freeSeats: number;
  distancePerLiter: number;
  ownerId: string;
  photo: any;
}

class CarRepository extends BaseRepository<ICar, ICarPayload> {
  constructor() {
    super();
    this.type = "car";
  }
}

export default new CarRepository();
