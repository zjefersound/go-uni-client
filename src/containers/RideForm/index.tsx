"use client";
import { SelectTrip } from "../components/SelectTrip";
import { ITrip } from "@/models/ITrip";
import { ICar } from "@/models/ICar";
import { SelectCar } from "../components/SelectCar";
import { TextInput } from "@/components/forms/TextInput";
import { AiOutlineDollar } from "react-icons/ai";
import { Switch } from "@/components/forms/Switch";
import { Button } from "@/components/Button";
import { isValidNewRide } from "./validation";
import { FormControl } from "@/components/forms/FormControl";
import { Loading } from "@/components/Loading";
import { ICreateRidePayload } from "@/services/ride";
import { RidePassengers } from "./components/RidePassengers";
import { IUser } from "@/models/IUser";
import { useForm } from "@/hooks/useForm";

interface Props {
  trips: ITrip[];
  cars: ICar[];
  passengers: IUser[];
  submitText: string;
  onSubmit: (rideData: ICreateRidePayload) => Promise<void>;
  initialData?: ICreateRidePayload;
}

export function RideForm({
  trips,
  cars,
  passengers,
  submitText,
  onSubmit,
  initialData,
}: Props) {
  const defaultData = {
    bills: [],
    observations: "",
    tripId: trips[0]._id,
    date: new Date().toISOString().slice(0, 10),
    paid: false,
  };
  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<ICreateRidePayload>({
      defaultData,
      initialData,
      onSubmit,
      validator: isValidNewRide,
    });

  return (
    <form className="space-y-3 flex flex-col" onSubmit={handleSubmit}>
      <FormControl id="tripId" label="Trajeto" errors={errors}>
        <SelectTrip
          items={trips}
          value={data.tripId}
          onChange={(value) => handleChangeValue("tripId", value)}
          required
        />
      </FormControl>
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
        id="pricePerPassenger"
        label="Preço por passageiro"
        errors={errors}
      >
        <TextInput.Root>
          <TextInput.Icon>
            <AiOutlineDollar />
          </TextInput.Icon>
          <TextInput.Currency
            placeholder="0,00"
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            defaultValue={data.pricePerPassenger}
            decimalsLimit={2}
            onValueChange={(_, name, values) => {
              handleChangeValue("pricePerPassenger", values?.float || 0);
              handleChangeValue("bills", []);
            }}
            required
          />
        </TextInput.Root>
      </FormControl>
      <FormControl id="extraCosts" label="Custos extras" errors={errors}>
        <TextInput.Root>
          <TextInput.Icon>
            <AiOutlineDollar />
          </TextInput.Icon>
          <TextInput.Currency
            placeholder="0,00"
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            defaultValue={data.extraCosts}
            decimalsLimit={2}
            onValueChange={(_, name, values) =>
              handleChangeValue("extraCosts", values?.float || 0)
            }
          />
        </TextInput.Root>
      </FormControl>
      <RidePassengers
        passengers={passengers}
        rideData={data}
        handleChangeValue={handleChangeValue}
      />
      <FormControl id="paid" label="Pago" errors={errors}>
        <Switch
          value={data.paid}
          onChange={(value) => handleChangeValue("paid", !data.paid)}
        />
      </FormControl>
      <FormControl id="observations" label="Observações" errors={errors}>
        <TextInput.Root>
          <TextInput.Input
            value={data.observations}
            onChange={(e) => handleChangeValue("observations", e.target.value)}
            placeholder="Digite alguma informação adicional..."
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
