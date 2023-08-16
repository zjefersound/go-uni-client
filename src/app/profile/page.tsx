"use client";
import { ButtonOutlined } from "@/components/ButtonOutlined";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/Skeleton";
import { urlFor } from "@/configs/sanity";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();

  function signOutHandler() {
    router.push("/api/auth/federated-sign-out");
  }

  return (
    <main>
      <Header title="Perfil" goBackHref="/" />
      <div className="p-3 flex flex-col space-y-3">
        {session?.user ? (
          <Card>
            <img
              src={urlFor(session.user.image).url()}
              alt={session.user.name}
              className="h-32 w-32 rounded-full mx-auto"
            />
            <p className="font-bold mt-3">{session.user.name}</p>
            <p className="text-sm text-gray-600">{session.user.email}</p>
          </Card>
        ) : <Skeleton className="h-52" />}

        <ButtonOutlined
          type="danger"
          onClick={() =>
            signOut({ redirect: false }).then(() => {
              router.push("/");
            })
          }
        >
          <AiOutlineLogout className="mr-2" />
          Sair
        </ButtonOutlined>
      </div>
    </main>
  );
}
