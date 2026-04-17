import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

const ALLOWED_EXTERNAL_REDIRECT_URL = "https://postiz.com/agent";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV === "production",
  // For Netlify it's important to set NEXTAUTH_URL in env variables
  // Should be: https://your-domain.netlify.app
  session: {
    strategy: "jwt", // recommended for App Router
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async createUser(message) {
      if (process.env.NODE_ENV === "development") {
        console.log("✅ User created:", message.user.email);
      }
    },
    async linkAccount({ account, user }) {
      if (account.provider === "google" && user.email) {
        // Check if another user with this email exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser && existingUser.id !== user.id) {
          // If another user with this email is found, update Account link
          await prisma.account.updateMany({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
            data: {
              userId: existingUser.id,
            },
          });
        }
      }
    },
  },

  providers: [
    // GOOGLE LOGIN (only if credentials are set)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true, // Allow account linking by email
          }),
        ]
      : []),

    // EMAIL + PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          // 1. Find user
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          // 2. Check password
          const valid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!valid) {
            throw new Error("Invalid email or password");
          }

          // 3. Return user object (will be in JWT)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google" && !user?.email) {
        console.error("Google OAuth: No email in user object");
        return false;
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (url === ALLOWED_EXTERNAL_REDIRECT_URL) {
        return url;
      }

      try {
        const targetUrl = new URL(url);
        const appUrl = new URL(baseUrl);

        if (targetUrl.origin === appUrl.origin) {
          return url;
        }
      } catch {
        return baseUrl;
      }

      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/login", // custom login page
    error: "/auth/login", // error page
  },
};
