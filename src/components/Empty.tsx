"use client";
import { ReactNode } from "react";
import noDataAnimation from "@/assets/lotties/noDataAnimation.json";
import Lottie from "lottie-react";
export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[13rem] h-[13rem]">
        <Lottie animationData={noDataAnimation} loop={false} />
      </div>
      <p className="font-bold">{children}</p>
    </div>
  );
}
