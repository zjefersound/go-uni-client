"use client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: any;
  className?: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
}

export function Button({ children, onClick, className, ...props }: Props) {
  return (
    <button
      className={
        "flex justify-center items-center bg-neutral-800 hover:bg-neutral-700 active::bg-neutral-600 transition text-white font-bold p-2 rounded disabled:opacity-75 " +
        className
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
