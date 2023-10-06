import { Switch } from "@/components/forms/Switch";
import { IBill } from "@/models/IBill";
import { printDate } from "@/utils/date/printDate";
import { toCurrency } from "@/utils/toCurrency";

interface Props {
  bill: IBill;
  selected: boolean;
  onToggle: (id: string) => void
}

export function PayBillItem({ bill, selected, onToggle }: Props) {
  return (
    <div key={bill._id} className="flex text-gray-600">
      <p>{printDate(bill.date)}</p>
      <p className="ml-auto font-bold">{toCurrency(bill.amount)}</p>
      <Switch
        className="ml-2"
        value={selected}
        onChange={() => onToggle(bill._id)}
      />
    </div>
  );
}
