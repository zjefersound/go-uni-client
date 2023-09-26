"use client";
import { AiOutlineHistory, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import { Drawer } from "./Drawer";
import Link from "next/link";
import { PiGasPump, PiWallet } from "react-icons/pi";

const defaultMenus = [
  {
    path: "/",
    Icon: AiOutlineHome,
    label: "Home",
  },
  {
    path: "/rides",
    Icon: AiOutlineHistory,
    label: "Histórico de caronas",
  },
  {
    path: "/fuel-supplies",
    Icon: PiGasPump,
    label: "Abastecimentos",
  },
  {
    path: "/bills",
    Icon: PiWallet,
    label: "Contas a receber",
  },
  {
    path: "/profile",
    Icon: AiOutlineUser,
    label: "Perfil",
  },
];

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer.Hamburger setOpen={setOpen} />
      <Drawer.Root open={open}>
        <Drawer.Header setOpen={setOpen} />
        <div className="py-2 flex flex-col flex-1 overflow-y-auto">
          {defaultMenus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              className="flex items-center space-x-2 px-3 py-2 transition-all hover:bg-gray-100 active:bg-gray-200"
            >
              <menu.Icon className="h-6 w-6 text-emerald-600" />{" "}
              <p>{menu.label}</p>
            </Link>
          ))}
        </div>
      </Drawer.Root>
    </>
  );
}
