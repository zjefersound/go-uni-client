import { Card } from "@/components/Card";
import { fuelSupplyService } from "@/services/fuelSupply";
import { toCurrency } from "@/utils/toCurrency";
import { printDate } from "@/utils/date/printDate";
import { PiGasPump } from "react-icons/pi";
import { CardButton } from "@/components/CardButton";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { Empty } from "@/components/Empty";

export const dynamic = "force-dynamic";

export default async function FuelSupplies() {
  const fuelSupplies = await fuelSupplyService.getAll();
  return (
    <>
      <CardButton href="/new-fuel-supply">
        <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Novo
        abastecimento
      </CardButton>
      {!fuelSupplies.length && <Empty>Nenhum abastecimento encontrado</Empty>}
      <ul className="space-y-2">
        {fuelSupplies.map((fuelSupply) => (
          <li key={fuelSupply._id}>
            <Link href={`/edit-fuel-supply/${fuelSupply._id}`}>
            <Card>
              <div className="flex items-center">
                <PiGasPump className="text-red-600 h-5 w-5 mr-3" />
                <div className="mr-auto">
                  <p className="text-sm text-gray-600">
                    {printDate(fuelSupply.date)}
                  </p>
                  <p className="text-xs text-gray-600 mr-3">
                    {fuelSupply.car.model}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mr-3">
                  {toCurrency(fuelSupply.pricePerLiter)}/L
                </p>
                <p className="text-sm text-red-600 font-bold">
                  {toCurrency(fuelSupply.price)}
                </p>
              </div>
            </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
