import { ISanityFilter } from "@/models/ISanityFilter";

function stringifyValue (value: any) {
  if(typeof value === 'string') return `"${value}"`;
  return value;
}

function adaptKey (key: string){
  return key.replace('._id', '._ref');
}

export function filtersToGroq(filters: ISanityFilter[] = []) {
  if (!filters.length) return "";
  let filtersText = filters
    .map(
      (filter) =>
        `[${adaptKey(filter.key)} ${filter.operation} ${stringifyValue(filter.value)}]`
    )
    .reduce((text, filter) => text + " " + filter, "");
  return filtersText;
}
