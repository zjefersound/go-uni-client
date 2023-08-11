import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Skeleton({ className, children}: Props) {
  return (
    <div
      role="status"
      className= {`flex items-center justify-center h-16 bg-gray-200 rounded animate-pulse ${className}`}
    >
      {children}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
