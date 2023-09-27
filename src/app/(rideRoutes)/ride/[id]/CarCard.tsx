import { Card } from "@/components/Card";
import { urlFor } from "@/configs/sanity";
import { ICar } from "@/models/ICar";

export function CarCard({ car }: { car: ICar }) {
  return (
    <Card>
        <div className="flex justify-between mt-3 space-x-3">
          <div>
            <h2 className="font-bold">Carro:</h2>
            <p className="text-sm text-gray-600">Modelo: {car.model}</p>
            <p className="text-sm text-gray-600">
              Bancos livres: {car.freeSeats}
            </p>
            <p className="text-sm text-gray-600">
              Consumo: {car.distancePerLiter} Km/L
            </p>
          </div>
          <img
            className="h-[5rem]"
            src={urlFor(car.photo).url()}
            alt={car.model}
          />
        </div>
      </Card>
  );
}
