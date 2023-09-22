import { ISanityFilter } from "./ISanityFilter";
import { ISort } from "./ISort";

export interface IRepositoryOptions {
  filters?: ISanityFilter[],
  rawGroq?: string;
  sort?: ISort | ISort[];
}