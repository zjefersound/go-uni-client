"use client";
import { ReactNode } from "react";
import { Card } from "./Card";
import { toCurrency } from "@/utils/toCurrency";

function ReceiptRoot({ children }: { children: ReactNode }) {
  return <Card>{children}</Card>;
}
ReceiptRoot.displayName = "Receipt.Root";

function ReceiptSection({ children }: { children: ReactNode }) {
  return <div className="text-sm text-gray-600 mt-3">{children}</div>;
}
ReceiptItem.displayName = "Receipt.Section";

function ReceiptItem({ children }: { children: ReactNode }) {
  return <div className="flex items-center">{children}</div>;
}
ReceiptItem.displayName = "Receipt.Item";

function ReceiptAmount({ amount }: { amount: number }) {
  return <p className="ml-auto">{toCurrency(amount)}</p>;
}
ReceiptAmount.displayName = "Receipt.Amount";

function ReceiptTotal({ amount }: { amount: number }) {
  return (
    <>
      <hr className="my-1 border-emerald-600" />
      <div className="flex text-emerald-600">
        <p>Total:</p>
        <ReceiptAmount amount={amount} />
      </div>
    </>
  );
}
ReceiptTotal.displayName = "Receipt.Total";

function ReceiptSubtitle({ children }: { children: ReactNode }) {
  return (
    <>
      <p>{children}</p>
      <hr className="my-1" />
    </>
  );
}
ReceiptSubtitle.displayName = "Receipt.Subtitle";

export const Receipt = {
  Root: ReceiptRoot,
  Total: ReceiptTotal,
  Subtitle: ReceiptSubtitle,
  Amount: ReceiptAmount,
  Item: ReceiptItem,
  Section: ReceiptSection,
};
