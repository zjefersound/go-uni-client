"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: any;
  className?: string;
  href?: string;
}
export function CardButton({ onClick, children, href }: Props) {
  const Element = href ? Link : "button";
  const clickProps = href ? { href } : { onClick };
  return (
    <Element
      className="
        bg-gray-100 rounded p-2
        border-[1px]
        transition: ;
        hover:border-emerald-600
        active:bg-gray-200
        flex flex-1 flex-col items-center justify-center 
        h-[5rem] 
        text-sm font-semibold text-gray-700"
      {...clickProps as any}
    >
      {children}
    </Element>
  );
}
