"use client";
import { Header } from "@/components/Header";
import { Checkbox } from "@/components/forms/Checkbox";
import { TextInput } from "@/components/forms/TextInput";
import { AiOutlineDollar } from "react-icons/ai";

export default function NewRide() {
  return (
    <main>
      <Header title="Nova carona" goBackHref="/" />
      <div className="p-3 flex flex-col space-y-3">
        <Checkbox value />
        <TextInput.Root>
          <TextInput.Icon>
            <AiOutlineDollar />
          </TextInput.Icon>
          <TextInput.Currency
            name="value"
            placeholder="0,00"
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            defaultValue={0}
            decimalsLimit={2}
            onValueChange={(_, name, values) => 0}
            required
          />
        </TextInput.Root>
      </div>
    </main>
  );
}
