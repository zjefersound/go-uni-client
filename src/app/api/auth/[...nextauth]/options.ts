import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./functions/verifyPassword";
import { userService } from "@/services/user";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
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
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const authorizedId = await verifyPassword(
          credentials.username,
          credentials.password
        );

        if (authorizedId) {
          const user = await userService.getById(authorizedId);
          return {
            id: user._id,
            email: user.email,
            image: user.avatar,
            name: user.name,
          } as any;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  // pages: {
  //   signIn: "/signin",
  // },
};
