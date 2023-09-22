import { CardButton } from "@/components/CardButton";
import { AiOutlineAreaChart, AiOutlineDollar, AiOutlinePlus } from "react-icons/ai";

export function HomeCards() {
  return (
    <div className="flex space-x-2">
      <CardButton href="/new-ride">
        <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Nova carona
      </CardButton>
      <CardButton href="/payments">
        <AiOutlineDollar className="h-8 w-8 text-emerald-600" />
        Pagamentos
      </CardButton>
      <CardButton href="/new-ride">
        <AiOutlineAreaChart className="h-8 w-8 text-emerald-600" />
        Relatórios
      </CardButton>
    </div>
  );
}
