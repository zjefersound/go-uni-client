import { IBill, IBillPayload } from "@/models/IBill";
import { groq } from "next-sanity";
import { BaseRepository } from "./BaseRepository";
import { ISort } from "@/models/ISort";

class BillRepository extends BaseRepository<
  IBill,
  IBillPayload
> {
  constructor() {
    super();
    this.type = "bill";
    this.objectProjection = groq`
      _id,
      payer -> {
        _id,
        name,
        username,
        avatar,
      },
      receiver -> {
        _id,
        name,
        username,
        avatar,
      },
      date,
      amount,
      currency,
      description,
      paid,
    `;
    this.defaultSort = { key: "date", type: "desc" } as ISort;
  }
}

export default new BillRepository();
