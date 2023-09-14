import { IRide, IRidePayload } from "@/models/IRide";
import { BaseRepository } from "./BaseRepository";
import { ISort } from "@/models/ISort";
import { groq } from "next-sanity";
import { IRepositoryOptions } from "@/models/IRepositoryOptions";
import { sanityClient } from "@/configs/sanity";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { dateToString } from "@/utils/date/dateToString";

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
      driver -> {
        ...
      },
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

  getToday(options?: IRepositoryOptions): Promise<IRide> {
    return sanityClient.fetch(groq`*[_type == "ride"][date == "${
      new Date().toISOString().split("T")[0]
    }"] ${filtersToGroq(options?.filters)} [0]{
      ${this.objectProjection}
    }`);
  }

  getRecents(options: IRepositoryOptions): Promise<IRide[]> {
    return sanityClient.fetch(groq`*[_type == "ride"][date != "${dateToString(
      new Date()
    )}"] ${filtersToGroq(options?.filters)} | order(date desc)[0..3]{
      ${this.objectProjection}
    }`);
  }
}

export default new RideRepository();
