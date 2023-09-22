import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { FormControl } from "@/components/forms/FormControl";
import { Switch } from "@/components/forms/Switch";
import { TextInput } from "@/components/forms/TextInput";
import { SelectUser } from "@/containers/components/SelectUser";
import { IUser } from "@/models/IUser";
import { ICreateRidePayload, IRideBill } from "@/services/ride";
import { isValidRideBill } from "../validation";
import { TextButton } from "@/components/TextButton";
import { AiOutlineDelete } from "react-icons/ai";
import { useForm } from "@/hooks/useForm";

interface Props {
  initialData?: IRideBill | null;
  passengers: IUser[];
  rideData: ICreateRidePayload;
  onSubmit: (value: IRideBill) => void;
  onDelete: () => void;
}
export function RideBillForm({
  passengers,
  rideData,
  initialData,
  onSubmit,
  onDelete,
}: Props) {
  const defaultData = {
    payerId: "",
    amount: rideData.pricePerPassenger,
    description: "",
  };
  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<IRideBill>({
      defaultData,
      initialData,
      onSubmit: (data) => {
        return new Promise(() => {
          const bill = {
            ...data,
          };
          if (bill.payerId === "") {
            delete bill.payerId;
          }
          onSubmit(bill);
        });
      },
      validator: isValidRideBill,
    });
  const isOneWay = data.amount !== rideData.pricePerPassenger;

  return (
    <form className="flex flex-col space-y-3">
      <FormControl id="payerId" label="Passageiro" optional errors={errors}>
        <SelectUser
          value={data.payerId!}
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
            value={data.description}
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
      {initialData && (
        <TextButton type="danger" onClick={onDelete}>
          <AiOutlineDelete className="mr-2" /> Remover
        </TextButton>
      )}
    </form>
  );
}
