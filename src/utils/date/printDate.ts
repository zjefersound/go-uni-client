import { stringToDate } from "./stringToDate";

export function printDate(stringDate: string) {
  const date = stringToDate(stringDate) ;
  return date.toLocaleDateString("pt-BR");
}