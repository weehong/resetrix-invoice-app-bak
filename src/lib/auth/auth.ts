import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        login: { label: "Username or Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ login, password }) {
        console.log(login, password);
        if (!login || !password) {
          throw new Error("Username/Email and password are required");
        }

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

        if (!companyUser) {
          throw new Error("Invalid username/email or password");
        }

        const isPasswordValid = await bcrypt.compare(
          password as string,
          companyUser.user.password as string,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: companyUser.user.id,
          name: companyUser.user.name,
          email: companyUser.user.email,
          image: companyUser.user.image,
        };
      },
    }),
  ],
});
