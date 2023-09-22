import { ReactNode } from "react";

interface Props {
  id?: string;
  children: ReactNode;
}
export function Label({ id, children }: Props) {
  return (
    <label htmlFor={id} className="flex text-gray-700 font-bold">
      {children}
    </label>
  );
}
