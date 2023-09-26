import { IBill } from "@/models/IBill";

export function getBillsSum(bills: IBill[]) {
  return bills
    .map((bill) => bill.amount)
    .reduce((sum, amount) => sum + amount, 0);
}

export interface IGroupedBills {
  [key: string]: IBill[];
}
/**
 * Groups bills by payer id or add to "guests"
 */
export function getBillsGroupedByPayer(bills: IBill[]) {
  return bills.reduce((groupsObj, bill) => {
    const key = bill.payer?._id || "guests";
    if (Array.isArray(groupsObj[key])) {
      groupsObj[key].push(bill);
    } else {
      groupsObj[key] = [bill];
    }
    return groupsObj;
  }, {} as IGroupedBills);
}