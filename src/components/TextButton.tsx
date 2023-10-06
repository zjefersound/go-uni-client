"use client";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  type?: "primary" | "danger" | "success" | "secondary";
  children: ReactNode;
  onClick?: any;
  className?: string;
  disabled?: boolean;
}

export function TextButton({
  type = "primary",
  children,
  onClick,
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "flex items-center font-bold w-min transition disabled:opacity-75",
        {
          "text-neutral-800 hover:text-neutral-700 active:text-neutral-600":
            type === "primary",
          "text-neutral-600 hover:text-neutral-500 active:text-neutral-400":
            type === "secondary",
          "text-emerald-600 hover:text-emerald-400 active:text-emerald-300":
            type === "success",
          "text-red-600 hover:text-red-400 active:text-red-300":
            type === "danger",
        },
        className
      )}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
