import { AiOutlineArrowRight } from "react-icons/ai";
import { Select } from "@/components/forms/Select";
import { ITrip } from "@/models/ITrip";

interface Props {
  value: string;
  onChange: (value: string) => void;
  items: ITrip[];
  required?: boolean;
}

export const SelectTrip = ({ items, value, onChange, required }: Props) => (
  <Select.Root
    placeholder="Selecione um trajeto..."
    value={value}
    onChange={onChange}
    required={required}
  >
    {items.map((item) => (
      <Select.Item
        value={item._id}
        className="block p-3 border-b"
        key={item._id}
      >
        <div className="flex text-gray-600 items-center space-x-2">
          <span>{item.from}</span>
          <AiOutlineArrowRight className="text-emerald-600 h-4 w-4" />
          <span>{item.to}</span>
          <span>{item.distance} Km</span>
        </div>
      </Select.Item>
    ))}
  </Select.Root>
);
