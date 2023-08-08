"use client";
import { useState } from "react";
import { SelectTrip } from "./components/SelectTrip";
import { ITrip } from "@/models/ITrip";
import { ICar } from "@/models/ICar";
import { SelectCar } from "./components/SelectCar";
import { TextInput } from "@/components/forms/TextInput";
import { AiOutlineDollar } from "react-icons/ai";
import { Switch } from "@/components/forms/Switch";
import { Button } from "@/components/Button";
import { isValidNewRide } from "./validation";
import { IValidationError } from "@/models/IValidationReturn";
import { IRidePayload } from "@/services/ride";
import { FormControl } from "@/components/forms/FormControl";
import { Loading } from "@/components/Loading";

interface Props {
  trips: ITrip[];
  cars: ICar[];
  submitText: string;
  onSubmit: (rideData: IRidePayload) => Promise<void>;
}

export function RideForm({ trips, cars, submitText, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [rideData, setRideData] = useState({
    tripId: trips[0]._id,
    date: new Date().toISOString().slice(0, 10),
    paid: false,
  } as any);

  const [errors, setErrors] = useState<IValidationError[]>([]);

  const handleChangeValue = (id: string, value: any) => {
    setRideData((d: any) => ({ ...d, [id]: value }));
    const newErrors = errors.filter((error) => error.field !== id);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { isValid, errors: newErrors } = isValidNewRide(rideData);

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      setErrors([]);
      onSubmit(rideData).finally(() => setLoading(false));
    }
  };

  return (
    <>
      <div className="space-y-3 flex flex-col">
        <FormControl id="tripId" label="Trajeto" errors={errors}>
          <SelectTrip
            items={trips}
            value={rideData.tripId}
            onChange={(value) => handleChangeValue("tripId", value)}
          />
        </FormControl>
        <FormControl id="carId" label="Carro" errors={errors}>
          <SelectCar
            items={cars}
            value={rideData.carId}
            onChange={(value) => handleChangeValue("carId", value)}
          />
        </FormControl>
        <FormControl id="date" label="Data" errors={errors}>
          <TextInput.Root>
            <TextInput.Input
              type="date"
              value={rideData.date}
              onChange={(e) => handleChangeValue("date", e.target.value)}
              placeholder="mm/dd/yyyy"
            />
          </TextInput.Root>
        </FormControl>
        <FormControl id="passengers" label="Nº de passageiros" errors={errors}>
          <TextInput.Root>
            <TextInput.Input
              type="number"
              value={rideData.passengers}
              onChange={(e) =>
                handleChangeValue(
                  "passengers",
                  e.target.value ? Number(e.target.value) : ""
                )
              }
              placeholder="0"
            />
          </TextInput.Root>
        </FormControl>
        <FormControl
          id="passengersOneWay"
          label="Apenas ida ou volta"
          errors={errors}
        >
          <TextInput.Root>
            <TextInput.Input
              type="number"
              value={rideData.passengersOneWay}
              onChange={(e) =>
                handleChangeValue(
                  "passengersOneWay",
                  e.target.value ? Number(e.target.value) : ""
                )
              }
              placeholder="0"
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
              defaultValue={rideData.pricePerPassenger}
              decimalsLimit={2}
              onValueChange={(_, name, values) =>
                handleChangeValue("pricePerPassenger", values?.float || 0)
              }
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
              defaultValue={rideData.extraCosts}
              decimalsLimit={2}
              onValueChange={(_, name, values) =>
                handleChangeValue("extraCosts", values?.float || 0)
              }
              required
            />
          </TextInput.Root>
        </FormControl>
        <FormControl id="observations" label="Observações" errors={errors}>
          <TextInput.Root>
            <TextInput.Input
              value={rideData.observations}
              onChange={(e) =>
                handleChangeValue("observations", e.target.value)
              }
              placeholder="Digite alguma informação adicional..."
            />
          </TextInput.Root>
        </FormControl>
        <FormControl id="paid" label="Pago" errors={errors}>
          <Switch
            value={rideData.paid}
            onChange={(value) => handleChangeValue("paid", !rideData.paid)}
          />
        </FormControl>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading && <Loading className="mr-2" size="sm" />}
          {submitText}
        </Button>
      </div>
    </>
  );
}
