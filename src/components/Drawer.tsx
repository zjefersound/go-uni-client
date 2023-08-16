'use client';
import clsx from "clsx";
import { PiX, PiList } from "react-icons/pi";
import { ReactNode } from "react";

interface DrawerRootProps {
  children: ReactNode;
  open: boolean;
}

function DrawerRoot({ children, open }: DrawerRootProps) {
  return (
    <div
      className={clsx(
        "fixed h-full w-full bg-white top-0 left-0 transition-all z-50",
        {
          "translate-x-full": !open,
        }
      )}
    >
      {children}
    </div>
  );
}
DrawerRoot.displayName = "Drawer.Root";

interface DrawerHeaderProps {
  setOpen: (open: boolean) => void;
}

function DrawerHeader({ setOpen }: DrawerHeaderProps) {
  return (
    <div className="px-3 py-4 flex items-center border-b-2 border-gray-100 z-10">
      <h2 className="font-bold">Menu</h2>
      <button className="ml-auto" onClick={() => setOpen(false)}>
        <PiX className="h-8 w-8 text-emerald-600" />
      </button>
    </div>
  );
}
DrawerHeader.displayName = "Drawer.Header";

interface DrawerHamburgerProps {
  setOpen: (open: boolean) => void;
}

function DrawerHamburger({ setOpen }: DrawerHamburgerProps) {
  return (
    <div className="ml-auto">
      <button onClick={() => setOpen(true)}>
        <PiList className="h-8 w-8 text-emerald-600" />
      </button>
    </div>
  );
}
DrawerHamburger.displayName = "Drawer.Hamburger";

export const Drawer = {
  Root: DrawerRoot,
  Header: DrawerHeader,
  Hamburger: DrawerHamburger,
};
