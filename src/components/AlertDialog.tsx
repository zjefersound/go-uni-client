"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { ButtonOutlined } from "./ButtonOutlined";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
  okText: string;
  okType?: "danger" | "primary" | "success" | "secondary";
  onConfirm: () => void;
}

export function AlertDialog({
  children,
  title,
  description,
  okText,
  onConfirm,
  okType = "danger",
}: Props) {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {children}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="bg-black opacity-40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialogPrimitive.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[calc(100%-1.5rem)] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialogPrimitive.Title className="m-0 text-md font-bold">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-gray-600 mt-4 mb-5 text-sm">
            {description}
          </AlertDialogPrimitive.Description>
          <div className="flex justify-end space-x-3">
            <AlertDialogPrimitive.Cancel asChild>
              <ButtonOutlined type="secondary">Cancelar</ButtonOutlined>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <ButtonOutlined type={okType} onClick={onConfirm}>
                {okText}
              </ButtonOutlined>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
