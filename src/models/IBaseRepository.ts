import { SanityDocument } from "next-sanity";
import { IRepositoryOptions } from "./IRepositoryOptions";

export interface IBaseRepository<T, P> {
  getAll(options?: IRepositoryOptions): Promise<T[]>;
  getById(id: string, options?: IRepositoryOptions): Promise<T>;
  create(payload: P): Promise<SanityDocument<Record<string, any>>>;
  patch(
    id: string,
    payload: Partial<P>
  ): Promise<SanityDocument<Record<string, any>>>;
  delete(id: string): Promise<SanityDocument<Record<string, any>>>;
}
