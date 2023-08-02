export function toCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
export function printDate(stringDate: string) {
  const date = new Date(stringDate);
  var userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const newDate = new Date(date.getTime() + userTimezoneOffset);
  return newDate.toLocaleDateString("pt-BR");
}
