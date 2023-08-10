import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Skeleton({ className, children}: Props) {
  return (
    <div
      role="status"
      className= {`flex items-center justify-center h-16 max-w-sm bg-gray-200 rounded animate-pulse dark:bg-gray-500 ${className}`}
    >
      {children}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
