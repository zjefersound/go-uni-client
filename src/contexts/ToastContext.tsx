"use client";
import { Toast } from "@/components/Toast";
import { createContext, useMemo, useState } from "react";

interface ToastProviderProps {
  children: React.ReactNode;
}
export interface ToastContextType {
  launchToast: (props: any) => void;
}

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastProps, setToastProps] = useState({
    open: false,
    type: "success",
    title: "",
    description: "",
  });

  const values = useMemo(() => ({ launchToast: setToastProps }), []);

  return (
    <ToastContext.Provider value={values}>
      {children}
      <Toast
        type={toastProps.type as any}
        title={toastProps.title}
        description={toastProps.description}
        open={toastProps.open}
        setOpen={(value) => setToastProps({ ...toastProps, open: value })}
      />
    </ToastContext.Provider>
  );
};
