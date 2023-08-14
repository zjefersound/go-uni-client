'use client'
import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import React from "react";

export default function Profile() {
  const { data: session, status, update } = useSession();
  
  return (
    <main>
      <Header title="Perfil" goBackHref="/" />
      {JSON.stringify(session?.user?.email)}
    </main>
  );
}
