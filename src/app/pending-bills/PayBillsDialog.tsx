"use client";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Loading } from "@/components/Loading";
import { TextButton } from "@/components/TextButton";
import { Switch } from "@/components/forms/Switch";
import { useToast } from "@/hooks/useToast";
import { IBill } from "@/models/IBill";
import { billService } from "@/services/bill";
import { getBillsSum } from "@/services/utils/billServiceUtils";
import { printDate } from "@/utils/date/printDate";
import { toCurrency } from "@/utils/toCurrency";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export function PayBillsDialog({ bills }: { bills: IBill[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { launchToast } = useToast();

  const [billsToPay, setBillsToPay] = useState<string[]>([]);
  const total = useMemo(() => {
    const selectedBills = bills.filter((bill) => billsToPay.includes(bill._id));
    return getBillsSum(selectedBills);
  }, [billsToPay]);

  const handleToggleBill = (billId: string) => {
    return setBillsToPay(
      billsToPay.includes(billId)
        ? billsToPay.filter((id) => id !== billId)
        : [...billsToPay, billId]
    );
  };

  const onSubmit = useCallback(() => {
    setLoading(true);
    billService
      .payByIds(billsToPay)
      .then((res) => {
        launchToast({
          title: "Contas pagas!",
          type: "success",
        });
      })
      .then(() => {
        router.refresh();
        setOpen(false);
      })
      .catch((error) => {
        launchToast({
          title: "Erro ao pagar contas",
          description: "Tente novamente",
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  }, [billsToPay]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <TextButton className="ml-auto" type="success">
          Pagar
        </TextButton>
      </Dialog.Trigger>
      <Dialog.Content
        title={
          bills[0].payer
            ? `Pagar contas de ${bills[0].payer?.name}`
            : "Pagar contas dos convidados"
        }
      >
        <div className="flex flex-col space-y-3">
          {bills.map((bill) => (
            <div key={bill._id} className="flex text-gray-600">
              <p>{printDate(bill.date)}</p>
              <p className="ml-auto font-bold">{toCurrency(bill.amount)}</p>
              <Switch
                className="ml-2"
                value={billsToPay.includes(bill._id)}
                onChange={() => handleToggleBill(bill._id)}
              />
            </div>
          ))}
          <Button disabled={total === 0} onClick={onSubmit}>
            {loading && <Loading className="mr-2" size="sm" />}
            Pagar ({toCurrency(total)})
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
