import { IRide } from "@/models/IRide";
import { BaseRepository } from "./BaseRepository";
import { ISort } from "@/models/ISort";
import { groq } from "next-sanity";
import { IRepositoryOptions } from "@/models/IRepositoryOptions";
import { sanityClient } from "@/configs/sanity";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { dateToString } from "@/utils/date/dateToString";

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

class RideRepository extends BaseRepository<IRide, IRidePayload> {
  constructor() {
    super();
    this.type = "ride";
    this.objectProjection = groq`
      _id,
      _createdAt,
      passengers,
      passengersOneWay,
      date,
      pricePerPassenger,
      extraCosts,
      observations,
      paid,
      car -> {
        ...
      },
      trip -> {
        ...
      },
      bills[] -> {
        ...,
        payer -> {
          ...
        },
        receiver -> {
          ...
        },
      },
    `;
    this.defaultSort = { key: "date", type: "desc" } as ISort;
  }

  getToday(options?: IRepositoryOptions) {
    return sanityClient.fetch(groq`*[_type == "ride"][date == "${
      new Date().toISOString().split("T")[0]
    }"] ${filtersToGroq(options?.filters)} [0]{
      ${this.objectProjection}
    }`);
  }

  getRecents(options: IRepositoryOptions) {
    return sanityClient.fetch(groq`*[_type == "ride"][date != "${dateToString(
      new Date()
    )}"] ${filtersToGroq(options?.filters)} | order(date desc)[0..3]{
      _id,
      _createdAt,
      passengers,
      passengersOneWay,
      date,
      pricePerPassenger,
      extraCosts,
      observations,
      paid,
      car -> {
        ...
      },
      trip -> {
        ...
      }
    }`);
  }
}

export default new RideRepository();
