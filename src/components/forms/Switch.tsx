"use client";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import clsx from "clsx";
import { FormEventHandler } from "react";

export interface SwitchProps {
  value?: boolean;
  className?: string;
  onChange?: FormEventHandler<HTMLButtonElement>;
}

export function Switch({ value, onChange, className }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={clsx(
        `w-[3rem] h-[1.75rem] block px-1 rounded-full border-[1px] shrink-0 transition ${className}`,
        {
          "bg-emerald-600": value,
        },
        {
          "bg-gray-400": !value,
        }
      )}
      checked={value}
      onClick={onChange}
    >
      <SwitchPrimitive.Thumb
        className={clsx("h-5 w-5 block rounded-full bg-gray-100 shadow-sm shadow-gray-600", {
          "translate-x-[1.1rem]": value,
        })}
      />
    </SwitchPrimitive.Root>
  );
}
