import { ISort } from "@/models/ISort";

export function sortToGroq(sort: ISort | ISort[]) {
  const sortArray = Array.isArray(sort) ? [...sort] : [sort];
  return sortArray.reduce(
    (result, sortItem) => result + ` order(${sortItem.key} ${sortItem.type})`,
    ""
  );
}
