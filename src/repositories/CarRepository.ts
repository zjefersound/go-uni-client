import { ICar, ICarPayload } from "@/models/ICar";
import { BaseRepository } from "./BaseRepository";

class CarRepository extends BaseRepository<ICar, ICarPayload> {
  constructor() {
    super();
    this.type = "car";
  }
}

export default new CarRepository();
