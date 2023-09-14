import { sanityClient } from "@/configs/sanity";
import { IBaseRepository } from "@/models/IBaseRepository";
import { IRepositoryOptions } from "@/models/IRepositoryOptions";
import { ISort } from "@/models/ISort";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { sortToGroq } from "@/utils/sortToGroq";
import { toSanityRef } from "@/utils/toSanityRef";
import { groq } from "next-sanity";

export class BaseRepository<T, P> implements IBaseRepository<T, P> {
  type?: string;
  objectProjection?: string;
  sort?: ISort;

  private createPayload(data: any) {
    const payload = { ...data };
    Object.entries(payload).forEach(([key, value]) => {
      if (key.endsWith("Id")) {
        payload[key.replace("Id", "")] = toSanityRef(value as string);
        delete payload[key];
      }
    });
    return payload;
  }

  getAll: (options?: IRepositoryOptions) => Promise<T[]> = async ({
    filters,
    rawGroq = "",
    sort,
  } = {}) => {
    return sanityClient.fetch(groq`*[_type == "${this.type}"] ${filtersToGroq(
      filters
    )} ${rawGroq} | ${sortToGroq(sort ?? this.sort ?? { key: "_createdAt", type: "desc" })} {
      ${this.objectProjection}
    }`);
  };

  getById: (id: string, options?: IRepositoryOptions) => Promise<T> = (id) => {
    return sanityClient.fetch(groq`*[_type == "${this.type}"][_id == "${id}"][0]{
      ${this.objectProjection}
    }`);
  };

  create = (entity: P) => {
    const payload: any = this.createPayload({ _type: this.type, ...entity });
    return sanityClient.create(payload);
  };

  patch = (id: string, entity: P) => {
    const payload: any = this.createPayload(entity);
    return sanityClient.patch(id).set(payload).commit();
  };

  delete = (id: string) => {
    return sanityClient.delete(id);
  };
}
