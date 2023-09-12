import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { Content } from "@/components/Content";
import { CreateFuelSupplyForm } from "./CreateFuelSupplyForm";
import { getSessionUser } from "../api/auth/[...nextauth]/functions/getSessionUser";

export default async function NewFuelSupply() {
  const user = await getSessionUser();
  const cars = await carService.getAll({ userId: user?.id });

  return (
    <main>
      <Header title="Novo abastecimento" goBackHref="/fuel-supplies" />
      <Content>
        <p className="text-sm text-gray-600">
          Preencha as informações para criar um abastecimento
        </p>
        <CreateFuelSupplyForm cars={cars} />
      </Content>
    </main>
  );
}
