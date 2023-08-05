export function stringToDate(stringDate: string) {
  const date = new Date(stringDate);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
}