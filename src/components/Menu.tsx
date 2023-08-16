'use client';
import { AiOutlineHistory, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import { Drawer } from "./Drawer";
import Link from "next/link";

const defaultMenus = [
  {
    path: "/",
    Icon: AiOutlineHome,
    label: "Home",
  },
  {
    path: "/profile",
    Icon: AiOutlineUser,
    label: "Perfil",
  },
  {
    path: "/rides",
    Icon: AiOutlineHistory,
    label: "Histórico de caronas",
  },
];

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer.Hamburger setOpen={setOpen} />
      <Drawer.Root open={open}>
        <Drawer.Header setOpen={setOpen} />
        <div className="py-2">
          {defaultMenus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              className="flex items-center space-x-2 px-3 py-2 transition-all active:bg-gray-200"
            >
              <menu.Icon className="h-5 w-5 text-emerald-600" />{" "}
              <p>{menu.label}</p>
            </Link>
          ))}
        </div>
      </Drawer.Root>
    </>
  );
}
