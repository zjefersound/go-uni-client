import { Select } from "@/components/forms/Select";
import { urlFor } from "@/configs/sanity";
import { ICar } from "@/models/ICar";

interface Props {
  value: string;
  onChange: (value: string) => void;
  items: ICar[];
}

export const SelectCar = ({ items, value, onChange }: Props) => (
  <Select.Root
    placeholder="Selecione o carro..."
    value={value}
    onChange={onChange}
  >
    {items.map((item) => (
      <Select.Item
        value={item._id}
        className="block p-3 border-b"
        key={item._id}
      >
        <div className="flex text-gray-600 items-center space-x-2">
          <img
            className="h-8"
            src={urlFor(item.photo).url()}
            alt={item.model}
          />
          <span>{item.model}</span>
        </div>
      </Select.Item>
    ))}
  </Select.Root>
);
