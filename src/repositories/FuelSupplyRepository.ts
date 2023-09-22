import { sanityClient } from "@/configs/sanity";
import { IFuelSupply, IFuelSupplyPayload } from "@/models/IFuelSupply";
import { IRepositoryOptions } from "@/models/IRepositoryOptions";
import { groq } from "next-sanity";
import { BaseRepository } from "./BaseRepository";
import { ISort } from "@/models/ISort";

class FuelSupplyRepository extends BaseRepository<
  IFuelSupply,
  IFuelSupplyPayload
> {
  constructor() {
    super();
    this.type = "fuelSupply";
    this.objectProjection = groq`
      _id,
      _createdAt,
      date,
      price,
      pricePerLiter,
      car -> {
        ...
      },
    `;
    this.defaultSort = { key: "date", type: "desc" } as ISort;
  }

  getLastUntilDate: (
    date: string,
    options?: IRepositoryOptions
  ) => Promise<IFuelSupply> = async (date, { rawGroq = "" } = {}) => {
    return sanityClient.fetch(groq`*[_type == "${this.type}"][date <= "${date}"] ${rawGroq} | order(date desc)[0]{
      ...
    }`);
  };
}

export default new FuelSupplyRepository();
