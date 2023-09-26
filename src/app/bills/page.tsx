import { billService } from "@/services/bill";
import { getSessionUser } from "../api/auth/[...nextauth]/functions/getSessionUser";
import { Card } from "@/components/Card";
import { toCurrency } from "@/utils/toCurrency";
import { printDate } from "@/utils/date/printDate";
import { IBill } from "@/models/IBill";
import { printWeekday } from "@/utils/date/printWeekday";
import { urlFor } from "@/configs/sanity";
import { getBillsSum } from "@/services/utils/billServiceUtils";

export default async function Bills() {
  const user = await getSessionUser();
  const bills = await billService.getAll({
    filters: [
      { key: "receiver._id", operation: "==", value: user.id },
      { key: "paid", operation: "==", value: false },
    ],
  });

  const serializedBills = bills.reduce((payerObj, bill) => {
    const key = bill.payer?._id || "other";
    if (Array.isArray(payerObj[key])) {
      payerObj[key].push(bill);
    } else {
      payerObj[key] = [bill];
    }
    return payerObj;
  }, {} as { [key: string]: IBill[] });

  return (
    <>
      {Object.entries(serializedBills).map(([key, bills]) => (
        <Card key={key}>
          <div className="flex items-center">
            {bills[0].payer?.avatar && (
              <img
                src={urlFor(bills[0].payer?.avatar).url()}
                alt={bills[0].payer?.name}
                className="h-8 w-8 rounded-full mr-2"
              />
            )}
            <p className="font-bold">{bills[0].payer?.name || "Convidados"}:</p>
          </div>

          <ul className="space-y-1 text-sm text-gray-600 mt-3">
            {bills.map((bill) => (
              <li key={bill._id} className="flex">
                <div>
                  <p className="flex">
                    <span className="w-[5.5rem]">{printDate(bill.date)}</span>
                    {printWeekday(bill.date)}{" "}
                  </p>
                  <p className="text-xs">{bill.description}</p>
                </div>
                <p className="ml-auto">{toCurrency(bill.amount)}</p>
              </li>
            ))}
          </ul>
          <hr className="my-1 border-emerald-600" />
          <div className="flex text-emerald-600">
            <p>Total:</p>
            <p className="ml-auto">{toCurrency(getBillsSum(bills))}</p>
          </div>
        </Card>
      ))}

      <Card>
        <h2 className="font-bold">Totais a receber:</h2>
        <div className="text-sm text-gray-600 mt-3">
          {Object.entries(serializedBills).map(([key, bills]) => (
            <div key={key} className="flex items-center">
              <p>+ {bills[0].payer?.name || "Convidados"}</p>
              <p className="ml-auto">{toCurrency(getBillsSum(bills))}</p>
            </div>
          ))}
        </div>
        <hr className="my-1 border-emerald-600" />
        <div className="flex text-emerald-600">
          <p>Total:</p>
          <p className="ml-auto">{toCurrency(getBillsSum(bills))}</p>
        </div>
      </Card>
    </>
  );
}
