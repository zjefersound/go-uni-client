import { Select } from "@/components/forms/Select";
import { IUser } from "@/models/IUser";
import { urlFor } from "@/configs/sanity";

interface Props {
  value: string;
  onChange: (value: string) => void;
  items: IUser[];
  required?: boolean;
}

export const SelectUser = ({ items, value, onChange, required }: Props) => (
  <Select.Root
    placeholder="Selecione o passageiro..."
    value={value}
    onChange={onChange}
    required={required}
  >
    <Select.Item value={""} className="block p-3 border-b">
      Selecione o passageiro
    </Select.Item>
    {items.map((item) => (
      <Select.Item
        value={item._id}
        className="block p-3 border-b"
        key={item._id}
      >
        <div className="flex text-gray-600 items-center space-x-2">
          <img
            className="h-8"
            src={urlFor(item.avatar).url()}
            alt={item.name}
          />
          <span>{item.name}</span>
        </div>
      </Select.Item>
    ))}
  </Select.Root>
);
