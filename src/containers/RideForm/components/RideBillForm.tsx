import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { FormControl } from "@/components/forms/FormControl";
import { Switch } from "@/components/forms/Switch";
import { TextInput } from "@/components/forms/TextInput";
import { SelectUser } from "@/containers/components/SelectUser";
import { IUser } from "@/models/IUser";
import { IValidationError } from "@/models/IValidationReturn";
import { ICreateRidePayload, IRideBill } from "@/services/ride";
import React, { useState } from "react";
import { isValidRideBill } from "../validation";

interface Props {
  initialData?: IRideBill | null;
  passengers: IUser[];
  rideData: ICreateRidePayload;
  onSubmit: (value: IRideBill) => void;
}
export function RideBillForm({
  passengers,
  rideData,
  initialData,
  onSubmit,
}: Props) {
  const defaultData = {
    payerId: "",
    amount: rideData.pricePerPassenger,
    description: "",
  };
  const [loading, setLoading] = useState(false);
  const [passengerData, setPassengerData] = useState<IRideBill>(
    initialData || defaultData
  );
  const isOneWay = passengerData.amount !== rideData.pricePerPassenger;
  const [errors, setErrors] = useState<IValidationError[]>([]);

  const handleChangeValue = (id: string, value: any) => {
    setPassengerData((d: any) => ({ ...d, [id]: value }));
    const newErrors = errors.filter((error) => error.field !== id);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { isValid, errors: newErrors } = isValidRideBill(passengerData);

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      setErrors([]);
      const bill = {
        ...passengerData,
      };
      if (bill.payerId === "") {
        delete bill.payerId;
      }
      onSubmit(bill);
      setPassengerData(defaultData);
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col space-y-3">
      <FormControl id="payerId" label="Passageiro" optional errors={errors}>
        <SelectUser
          value={passengerData.payerId!}
          onChange={(value) => {
            handleChangeValue("payerId", value);
            handleChangeValue(
              "payer",
              passengers.find((p) => p._id === value)
            );
          }}
          items={passengers}
        />
      </FormControl>
      <FormControl id="description" label="Descrição" errors={errors}>
        <TextInput.Root>
          <TextInput.Input
            value={passengerData.description}
            onChange={(e) => handleChangeValue("description", e.target.value)}
            placeholder="Nome do passageiro não cadastrado..."
          />
        </TextInput.Root>
      </FormControl>
      <FormControl id="amount" label="Apenas ida (ou volta)" errors={errors}>
        <Switch
          value={isOneWay}
          onChange={(value) =>
            handleChangeValue(
              "amount",
              rideData.pricePerPassenger / (isOneWay ? 1 : 2)
            )
          }
        />
      </FormControl>
      <Button type="button" disabled={loading} onClick={handleSubmit}>
        {loading && <Loading className="mr-2" size="sm" />}
        {initialData ? "Salvar" : "Adicionar"}
      </Button>
    </form>
  );
}
