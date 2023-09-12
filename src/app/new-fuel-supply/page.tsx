import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { Content } from "@/components/Content";
import { CreateFuelSupplyForm } from "./CreateFuelSupplyForm";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";

export default async function NewFuelSupply() {
  const session = await getServerSession(nextAuthOptions);
  const cars = await carService.getAll({ userId: session?.user.id});
  
  return (
    <main>
      <Header title="Novo abastecimento" goBackHref="/fuel-supplies" />
      <Content>
        <p className="text-sm text-gray-600">
          Preencha as informações para criar um abastecimento
        </p>
        <CreateFuelSupplyForm cars={cars}/>
      </Content>
    </main>
  );
}
