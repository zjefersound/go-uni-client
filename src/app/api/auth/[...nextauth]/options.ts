import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorize } from "./functions/authorize";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Digite seu username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Digite sua senha",
        },
      },
      authorize,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login'
  },
};
