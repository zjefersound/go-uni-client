'use client'
import Link from "next/link";
import { AiOutlineCar, AiOutlineArrowLeft } from "react-icons/ai";
import { Menu } from "./Menu";

interface Props {
  title?: string;
  goBackHref?: string;
}

export function Header({ goBackHref, title }: Props) {
  return (
    <div className="h-16 border-b flex items-center px-3 sticky top-0 bg-white">
      {goBackHref && <Link href={goBackHref}> <AiOutlineArrowLeft className="h-5 w-5 mr-2"/></Link>}
      <AiOutlineCar className="h-7 w-7 text-emerald-600 mr-1" />
      <h1 className="font-extrabold text-lg tracking-normal">
        {title || (
          <span className="italic">
            Go
            <span className="text-emerald-600">UNI</span>
          </span>
        )}
      </h1>
      <Menu />
    </div>
  );
}
