import { Card } from "@/components/Card";
import { Header } from "@/components/Header";

export default function Payments() {
  /**
   * calculateTotal for each ride of the week
   */
  return (
    <main>
      <Header title="Pagamentos" goBackHref="/" />
      <div className="p-3 flex flex-col space-y-3">
        <h2 className="font-bold">Entrada e saída semana:</h2>
        <Card>
          
        </Card>
      </div>
    </main>
  )
}
