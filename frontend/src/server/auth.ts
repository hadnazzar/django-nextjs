import { type GetServerSidePropsContext } from "next";
import {
  type User,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "src/server/api";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      // ...other properties
    };
  }

  interface User {
    username: string;
    token: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "testuser",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        const { username, password } = credentials;

        const userData = await api.post<User>("/login-or-register", {
          username,
          password,
        });

        const { token } = userData;
        return {
          ...userData,
          token: token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.name = user.username;
      }
      return token;
    },
    session({ session, token }) {
      const isSignIn = token ? true : false;
      if (isSignIn) {
        session.user = {
          name: token.name,
        };
      }
      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
