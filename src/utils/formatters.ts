import { stringToDate } from "./stringToDate";

export function toCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
export function printDate(stringDate: string) {
  const date = stringToDate(stringDate) ;
  return date.toLocaleDateString("pt-BR");
}
