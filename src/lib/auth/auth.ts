import { getUserByEmail } from "@/features/user/actions/get-user";
import { verifyUserPassword } from "@/features/user/utils/password";
import * as authErrors from "@/lib/auth/errors";

import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { User as SchemaUser } from "@/types";

// Aumentacion del modulo de next auth para soportar nuestras propiedades
declare module "next-auth" {
  interface User extends SchemaUser {}
}

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT extends SchemaUser {}
}

// Declaracion de la autentifiacion
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        user = await getUserByEmail(credentials.email as string);

        // User does not exists
        if (!user) {
          throw new authErrors.MemberNotFoundError();
        }

        // Password is invalid
        if (
          !verifyUserPassword(credentials.password as string, user.password)
        ) {
          throw new authErrors.InvalidLoginError();
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // user proviene de lo que authorized en credentials
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token, user }) {
      // token se usa cuando la estrategia declarada es JWT
      // user se usa cuando la estrategia declarada es Database

      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
