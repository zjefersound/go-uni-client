'use client';
import React, { ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { RxCheck, RxChevronDown, RxChevronUp } from "react-icons/rx";

export interface SelectRootProps {
  children: ReactNode;
  placeholder: string;
  defaultValue?: string;
  value: string;
  onChange: (value: string) => void;
}

const SelectRoot = ({ value, defaultValue, children, placeholder, onChange }: SelectRootProps) => (
  <SelectPrimitive.Root defaultValue={defaultValue} value={value}  onValueChange={onChange}>
    <SelectPrimitive.Trigger
      className="h-12
      flex items-center space-x-2
      py-4 px-3 rounded
      border 
      bg-gray-100
      w-full 
      outline-0
      focus-within:ring-2 ring-emerald-600  
      text-sm
      leading-none text-gray-600 hover:bg-white  focus:shadow-black data-[placeholder]:text-gray-500 outline-none"
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon className="text-gray-200">
        <RxChevronDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="overflow-hidden bg-white border rounded shadow-lg">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <RxChevronUp />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport>
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <RxChevronDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);
SelectRoot.displayName = "Select.Root";

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={clsx(
          "text-sm leading-none text-gray-800 flex items-center pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <RxCheck />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);
SelectItem.displayName = "Select.Item";


export const Select = {
  Root: SelectRoot,
  Item: SelectItem
}
