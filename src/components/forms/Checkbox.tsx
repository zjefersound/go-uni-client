'use client';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { PiCheck } from "react-icons/pi";
import { FormEventHandler } from "react";

export interface CheckboxProps {
  value?: boolean;
  className?: string;
  onChange?: FormEventHandler<HTMLButtonElement>;
}

export function Checkbox({ value, onChange, className }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      checked={value}
      className={`w-7 h-7 p-[1px] rounded border-[1px] bg-gray-100 shrink-0 ${className}`}
      onClick={onChange}
    >
      <CheckboxPrimitive.CheckboxIndicator asChild>
        <PiCheck weight="bold" className="h-6 w-6 text-emerald-600" />
      </CheckboxPrimitive.CheckboxIndicator>
    </CheckboxPrimitive.Root>
  );
}
