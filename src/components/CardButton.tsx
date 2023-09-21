"use client";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: any;
  className?: string;
  href?: string;
  disabled?: boolean;
}
export function CardButton({ onClick, children, href, disabled }: Props) {
  const Element = href ? Link : "button";
  const clickProps = href ? { href } : { onClick, disabled, type: "button" };
  return (
    <Element
      className={clsx(
        `
        bg-gray-100 rounded p-2
        border-[1px]
        transition: ;
        hover:border-emerald-600
        active:bg-gray-200
        flex flex-1 flex-col items-center justify-center 
        h-[5rem] 
        text-sm font-semibold text-gray-700`,
        {
          "opacity-50 pointer-events-none": disabled,
        }
      )}
      {...(clickProps as any)}
    >
      {children}
    </Element>
  );
}
