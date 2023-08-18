import { Header } from "@/components/Header";
import { carService } from "@/services/car";
import { Content } from "@/components/Content";

export default async function NewFuelSupply() {
  const cars = await carService.getAll();
  
  return (
    <main>
      <Header title="Novo abastecimento" goBackHref="/fuel-supplies" />
      <Content>
        <p className="text-sm text-gray-600">
          Preencha as informações para criar um abastecimento
        </p>
      </Content>
    </main>
  );
}
