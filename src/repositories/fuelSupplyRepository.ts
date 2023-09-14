import { sanityClient } from "@/configs/sanity";
import { IFuelSupply } from "@/models/IFuelSupply";
import { IRepositoryOptions } from "@/models/IRepositoryOptions";
import { groq } from "next-sanity";
import { BaseRepository } from "./BaseRepository";
import { ISort } from "@/models/ISort";

export interface IFuelSupplyPayload {
  date: string;
  carId: string;
  price: number;
  pricePerLiter: number;
}

class FuelSupplyRepository extends BaseRepository<
  IFuelSupply,
  IFuelSupplyPayload
> {
  type = "fuelSupply";
  objectProjection = groq`
    _id,
    _createdAt,
    date,
    price,
    pricePerLiter,
    car -> {
      ...
    },
  `;
  sort: ISort = { key: "date", type: "desc" };

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
