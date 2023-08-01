import { ReactNode } from "react"

interface Props {
  children: ReactNode;
}
export function Card({ children}: Props) {
  return (
    <div className="bg-gray-100 rounded p-3 border-[1px]">{children}</div>
  )
}
