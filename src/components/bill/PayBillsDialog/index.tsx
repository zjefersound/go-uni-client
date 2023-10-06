"use client";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { Loading } from "@/components/Loading";
import { TextButton } from "@/components/TextButton";
import { IBill } from "@/models/IBill";
import { toCurrency } from "@/utils/toCurrency";
import { PayBillItem } from "./PayBillItem";
import { usePayBillsDialog } from "./hooks/usePayBillsDialog";

export function PayBillsDialog({ bills }: { bills: IBill[] }) {
  const {
    open,
    setOpen,
    billsToPay,
    handleToggleBill,
    loading,
    total,
    onSubmit
  } = usePayBillsDialog({ bills })

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
            <PayBillItem
              key={bill._id}
              bill={bill}
              selected={billsToPay.includes(bill._id)}
              onToggle={handleToggleBill}
            />
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
