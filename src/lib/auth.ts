import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import * as authErros from "./authErrors";

// Aumentacion del modulo de next auth para soportar nuestras propiedades
declare module "next-auth" {
  interface User {
    address?: string;
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    address?: string;
  }
}

// Servicio backend que autentifica al usuario
type User = {
  address?: string;
  backendToken?: string;
} & DefaultSession["user"];

const getUserFromDb = async (
  email: string,
  password: string
): Promise<User | null> => {
  if (email === "felixlopzd@gmail.com" && password === "1234") {
    return {
      email: "felixlopzd@gmail.com",
      name: "Felix",
      address: "Venezuela",
      backendToken: "MySuperTokenProvenienteDelBacken",
    };
  } else return null;
};

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

        // logic to verify if the user exists
        user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) {
          throw new authErros.InvalidLoginError();
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // user proviene de lo que authorized en credentials
      if (user) {
        token.backendToken = user.backendToken;
        token.address = user.address;
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
          address: token.address,
          backendToken: token.backendToken,
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
