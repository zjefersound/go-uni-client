import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Content({ className, children}: Props) {
  return (
    <div className={`p-3 flex flex-col space-y-3 ${className}`}>
      {children}
    </div>
  );
}
