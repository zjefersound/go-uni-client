"use client";
import { useToast } from "@/hooks/useToast";
import { IBill } from "@/models/IBill";
import { billService } from "@/services/bill";
import { getBillsSum } from "@/services/utils/billServiceUtils";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export function usePayBills({ bills }: { bills: IBill[] }) {
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

  return {
    open,
    setOpen,
    billsToPay,
    handleToggleBill,
    loading,
    total,
    onSubmit,
  };
}
