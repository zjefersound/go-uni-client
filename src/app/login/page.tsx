'use client'
import { LoginForm } from "@/containers/LoginForm";
import React from "react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={(props: any) => "ok" as any} submitText="Entrar" />
    </div>
  );
}
