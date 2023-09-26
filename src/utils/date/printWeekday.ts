import { stringToDate } from "./stringToDate";

export function printWeekday(stringDate: string) {
  const date = stringToDate(stringDate);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
  });
}
