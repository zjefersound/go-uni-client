"use client";
import { ICar } from "@/models/ICar";
import { SelectCar } from "../components/SelectCar";
import { TextInput } from "@/components/forms/TextInput";
import { AiOutlineDollar } from "react-icons/ai";
import { Button } from "@/components/Button";
import { isValidNewFuelSupply } from "./validation";
import { FormControl } from "@/components/forms/FormControl";
import { Loading } from "@/components/Loading";
import { IFuelSupplyPayload } from "@/models/IFuelSupply";
import { useForm } from "@/hooks/useForm";

interface Props {
  cars: ICar[];
  submitText: string;
  onSubmit: (data: IFuelSupplyPayload) => Promise<void>;
  initialData?: IFuelSupplyPayload;
}

export function FuelSupplyForm({
  cars,
  submitText,
  onSubmit,
  initialData,
}: Props) {
  const defaultData = {
    date: new Date().toISOString().slice(0, 10),
    paid: false,
  };

  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<IFuelSupplyPayload>({
      initialData,
      defaultData,
      onSubmit,
      validator: isValidNewFuelSupply,
    });

  return (
    <form className="space-y-3 flex flex-col" onSubmit={handleSubmit}>
      <FormControl id="carId" label="Carro" errors={errors}>
        <SelectCar
          items={cars}
          value={data.carId}
          onChange={(value) => handleChangeValue("carId", value)}
          required
        />
      </FormControl>
      <FormControl id="date" label="Data" errors={errors}>
        <TextInput.Root>
          <TextInput.Input
            type="date"
            value={data.date}
            onChange={(e) => handleChangeValue("date", e.target.value)}
            placeholder="mm/dd/yyyy"
            required
          />
        </TextInput.Root>
      </FormControl>
      <FormControl
        id="pricePerLiter"
        label="Preço por litro (L)"
        errors={errors}
      >
        <TextInput.Root>
          <TextInput.Icon>
            <AiOutlineDollar />
          </TextInput.Icon>
          <TextInput.Currency
            placeholder="0,00"
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            defaultValue={data.pricePerLiter}
            decimalsLimit={2}
            onValueChange={(_, name, values) =>
              handleChangeValue("pricePerLiter", values?.float || 0)
            }
            required
          />
        </TextInput.Root>
      </FormControl>
      <FormControl id="price" label="Valor abastecido" errors={errors}>
        <TextInput.Root>
          <TextInput.Icon>
            <AiOutlineDollar />
          </TextInput.Icon>
          <TextInput.Currency
            placeholder="0,00"
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            defaultValue={data.price}
            decimalsLimit={2}
            onValueChange={(_, name, values) =>
              handleChangeValue("price", values?.float || 0)
            }
            required
          />
        </TextInput.Root>
      </FormControl>
      <Button disabled={loading}>
        {loading && <Loading className="mr-2" size="sm" />}
        {submitText}
      </Button>
    </form>
  );
}
