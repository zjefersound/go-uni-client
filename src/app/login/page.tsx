"use client";
import { ILoginPayload, LoginForm } from "@/containers/LoginForm";
import { useToast } from "@/hooks/useToast";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCar } from "react-icons/ai";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { launchToast } = useToast();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const onSubmit = async (data: ILoginPayload) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        launchToast({
          open: true,
          type: "error",
          title: "Credenciais inválidas",
          description: "Username ou senha incorretos",
        });
      }
    } catch (error) {}
  };

  return (
    <main>
      <div className="rounded-full h-[50rem] w-[45rem] bg-gray-100 fixed opacity-50 -right-[25rem] -bottom-[20rem] -z-10" />
      <div className="p-3 flex flex-col h-screen space-y-3 justify-center ">
        <div className="flex justify-center items-center ">
          <AiOutlineCar className="h-28 w-28 text-emerald-600 opacity-20 absolute left-0 " />
          <h1 className="text-6xl font-extrabold flex flex-col leading-10 italic">
            Go
            <span className="text-emerald-600 ml-3">UNI</span>
          </h1>
        </div>
        <h2 className="font-bold text-xl">Login</h2>
        <p className="text-gray-600 text-sm">
          Seu aplicativo de gestão de caronas
        </p>

        <LoginForm onSubmit={onSubmit} submitText="Entrar" />
      </div>
    </main>
  );
}
