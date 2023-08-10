import { ISanityFilter } from "@/models/ISanityFilter";

function stringifyValue (value: any) {
  if(typeof value === 'string') return `"${value}"`;
  return value;
}

export function filtersToGroq(filters: ISanityFilter[] = []) {
  if (!filters.length) return "";
  let filtersText = filters
    .map(
      (filter) =>
        `[${filter.key} ${filter.operation} ${stringifyValue(filter.value)}]`
    )
    .reduce((text, filter) => text + " " + filter, "");
  return filtersText;
}
