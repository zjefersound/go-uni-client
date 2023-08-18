import { Card } from "@/components/Card";
import { fuelSupplyService } from "@/services/fuelSupply";
import { toCurrency } from "@/utils/toCurrency";
import { printDate } from "@/utils/date/printDate";
import { PiGasPump } from "react-icons/pi";
import { CardButton } from "@/components/CardButton";
import { AiOutlinePlus } from "react-icons/ai";

export const dynamic = "force-dynamic";

export default async function FuelSupplies() {
  const fuelSupplies = await fuelSupplyService.getAll();
  return (
    <>
      <CardButton href="/new-fuel-supply">
        <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Novo
        abastecimento
      </CardButton>
      {fuelSupplies.map((fuelSupply) => (
        <Card key={fuelSupply._id}>
          <div className="flex items-center">
            <PiGasPump className="text-red-600 h-5 w-5 mr-3" />

            <p className="text-sm text-gray-600 mr-auto">
              {printDate(fuelSupply.date)}
            </p>
            <p className="text-sm text-gray-600 mr-3">{fuelSupply.car.model}</p>
            <p className="text-sm text-gray-600 mr-3">
              {toCurrency(fuelSupply.pricePerLiter)}/L
            </p>
            <p className="text-sm text-red-600 font-bold">
              {toCurrency(fuelSupply.price)}
            </p>
          </div>
        </Card>
      ))}
    </>
  );
}
