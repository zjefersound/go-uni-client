export function dateToString(date: Date) {
  return date.toISOString().split("T")[0];
}
