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
import { FieldError } from "@/components/forms/FieldError";
import { Toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import { rideService } from "@/services/ride";

interface Props {
  trips: ITrip[];
  cars: ICar[];
}

export function RideForm({ trips, cars }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [rideData, setRideData] = useState({
    tripId: trips[0]._id,
    date: new Date().toISOString().slice(0, 10),
    paid: false,
  } as any);

  const [toastProps, setToastProps] = useState({
    open: false,
    type: "success",
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<IValidationError[]>([]);

  const handleSubmit = () => {
    setLoading(true);
    const { isValid, errors: newErrors } = isValidNewRide(rideData);

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      setErrors([]);
      rideService
        .create(rideData)
        .then((res) => {
          setToastProps({
            open: true,
            title: "Carona criada",
            description: "",
            type: "success",
          });
          setLoading(false);
          router.push("/");
        })
        .catch((error) => {
          setToastProps({
            open: true,
            title: "Erro ao criar carona",
            description: "Tente novamente",
            type: "error",
          });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="space-y-3 flex flex-col">
        <div>
          <label className="text-gray-700 font-bold">Trajeto:</label>
          <SelectTrip
            items={trips}
            value={rideData.tripId}
            onChange={(value) =>
              setRideData((d: any) => ({ ...d, tripId: value }))
            }
          />
          <FieldError id="tripId" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">Carro:</label>
          <SelectCar
            items={cars}
            value={rideData.carId}
            onChange={(value) =>
              setRideData((d: any) => ({ ...d, carId: value }))
            }
          />
          <FieldError id="carId" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">Data:</label>
          <TextInput.Root>
            <TextInput.Input
              type="date"
              value={rideData.date}
              onChange={(e) =>
                setRideData((d: any) => ({ ...d, date: e.target.value }))
              }
              placeholder="mm/dd/yyyy"
            />
          </TextInput.Root>
          <FieldError id="date" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">Nº de passageiros:</label>
          <TextInput.Root>
            <TextInput.Input
              type="number"
              value={rideData.passengers}
              onChange={(e) =>
                setRideData((d: any) => ({
                  ...d,
                  passengers: e.target.value ? Number(e.target.value) : "",
                }))
              }
              placeholder="0"
            />
          </TextInput.Root>
          <FieldError id="passengers" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">
            Apenas ida ou volta:
          </label>
          <TextInput.Root>
            <TextInput.Input
              type="number"
              value={rideData.passengersOneWay}
              onChange={(e) =>
                setRideData((d: any) => ({
                  ...d,
                  passengersOneWay: e.target.value
                    ? Number(e.target.value)
                    : "",
                }))
              }
              placeholder="0"
            />
          </TextInput.Root>
          <FieldError id="passengersOneWay" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">
            Preço por passageiro:
          </label>
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
                setRideData((d: any) => ({
                  ...d,
                  pricePerPassenger: values?.float || 0,
                }))
              }
              required
            />
          </TextInput.Root>
          <FieldError id="pricePerPassenger" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">Custos extras:</label>
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
                setRideData((d: any) => ({
                  ...d,
                  extraCosts: values?.float || 0,
                }))
              }
              required
            />
          </TextInput.Root>
          <FieldError id="extraCosts" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">Observações:</label>
          <TextInput.Root>
            <TextInput.Input
              value={rideData.observations}
              onChange={(e) =>
                setRideData((d: any) => ({
                  ...d,
                  observations: e.target.value,
                }))
              }
              placeholder="Digite alguma informação adicional..."
            />
          </TextInput.Root>
          <FieldError id="observations" errors={errors} />
        </div>
        <div>
          <label className="text-gray-700 font-bold">Pago:</label>
          <Switch
            value={rideData.paid}
            onChange={(value) =>
              setRideData((d: any) => ({ ...d, paid: !d.paid }))
            }
          />
          <FieldError id="paid" errors={errors} />
        </div>
        <Button onClick={handleSubmit} disabled={loading}>Criar carona</Button>
      </div>
      <Toast
        type={toastProps.type as any}
        title={toastProps.title}
        description={toastProps.description}
        open={toastProps.open}
        setOpen={(value) => setToastProps({ ...toastProps, open: value })}
      />
    </>
  );
}
