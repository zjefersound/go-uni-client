import { IBill } from "@/models/IBill";

export function getBillsSum(bills: IBill[]) {
  return bills
    .map((bill) => bill.amount)
    .reduce((sum, amount) => sum + amount, 0);
}
