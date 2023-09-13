import { ISanityFilter } from "./ISanityFilter";

export interface IRepositoryOptions {
  filters?: ISanityFilter[],
  rawGroq?: string;
  order?: { key: string; type: 'asc' | 'desc'}
}