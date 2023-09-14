import { ITrip, ITripPayload } from "@/models/ITrip";
import { BaseRepository } from "./BaseRepository";

class TripRepository extends BaseRepository<ITrip, ITripPayload> {
  constructor() {
    super();
    this.type = "trip";
  }
}

export default new TripRepository();
