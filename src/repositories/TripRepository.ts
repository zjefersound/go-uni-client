import { ITrip } from "@/models/ITrip";
import { BaseRepository } from "./BaseRepository";

export interface ITripPayload {
  from: string;
  to: string;
  distance: number;
  duration: number;
}

class TripRepository extends BaseRepository<ITrip, ITripPayload> {
  constructor() {
    super();
    this.type = "trip";
  }
}

export default new TripRepository();
