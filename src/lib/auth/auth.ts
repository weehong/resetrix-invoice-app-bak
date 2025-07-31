import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        login: { label: "Username or Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ login, password }) {
        console.log("[Auth] Attempting login for:", login);

        if (!login || !password) {
          console.log("[Auth] Missing credentials");
          throw new Error("Username/Email and password are required");
        }

        try {
          const companyUser = await prisma.companyUser.findFirst({
            where: {
              user: {
                OR: [{ username: login as string }, { email: login as string }],
              },
              status: UserStatus.ACTIVE,
            },
            include: {
              user: true,
            },
          });

          console.log("[Auth] CompanyUser found:", !!companyUser);

          if (!companyUser) {
            console.log("[Auth] No active company user found");
            throw new Error("Invalid username/email or password");
          }

          if (!companyUser.user.password) {
            console.log("[Auth] User has no password set");
            throw new Error("Invalid username/email or password");
          }

          const isPasswordValid = await bcrypt.compare(
            password as string,
            companyUser.user.password,
          );

          console.log("[Auth] Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("[Auth] Password comparison failed");
            throw new Error("Invalid password");
          }

          console.log("[Auth] Login successful for user:", companyUser.user.email);

          return {
            id: companyUser.user.id,
            name: companyUser.user.name,
            email: companyUser.user.email,
            image: companyUser.user.image,
          };
        } catch (error) {
          console.error("[Auth] Database error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
});
