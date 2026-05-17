import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { z } from "zod";

import { generateUniqueUsername } from "@/src/lib/auth/generate-unique-username";
import prisma from "@/src/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

const defaultUserSelect = {
  id: true,
  name: true,
  username: true,
  email: true,
  image: true,
  role: true,
  accountType: true,
  professionRole: true,
} as const;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? null,
          email: profile.email,
          image: profile.picture ?? null,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsedCredentials.data.email },
          select: {
            ...defaultUserSelect,
            password: true,
          },
        });

        if (!user?.password) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(parsedCredentials.data.password, user.password);

        if (!isValidPassword) {
          return null;
        }

        const username = user.username ?? (await generateUniqueUsername(prisma, user.name ?? user.email));

        if (!user.username) {
          await prisma.user.update({
            where: { id: user.id },
            data: { username },
          });
        }

        console.log(`[AUTHORIZE] Email: ${user.email}, DB Role: ${user.role}, Type: ${typeof user.role}`);

        const returnUser = {
          id: user.id,
          name: user.name ?? user.username ?? user.email,
          email: user.email,
          image: user.image,
          username,
          role: user.role,
          accountType: user.accountType,
          professionRole: user.professionRole,
        };

        console.log(`[AUTHORIZE] Returning user with role: ${returnUser.role}, Type: ${typeof returnUser.role}`);

        return returnUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!user.email) {
        return false;
      }

      const googleProfile = profile as Partial<GoogleProfile> | undefined;
      const googleName = googleProfile?.name ?? user.name ?? null;
      const googleImage = googleProfile?.picture ?? user.image ?? null;
      const usernameInput = googleName ?? user.email.split("@")[0] ?? user.email;
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
          role: true,
        },
      });

      console.log(`[SIGNIN GOOGLE] Email: ${user.email}, Existing User: ${!!existingUser}, Existing Role: ${existingUser?.role}`);

      if (existingUser) {
        const updateData: { name?: string; image?: string; username?: string } = {};

        if (!existingUser.name && googleName) {
          updateData.name = googleName;
        }

        if (!existingUser.image && googleImage) {
          updateData.image = googleImage;
        }

        if (!existingUser.username) {
          updateData.username = await generateUniqueUsername(prisma, usernameInput);
        }

        if (Object.keys(updateData).length > 0) {
          await prisma.user.update({
            where: { email: user.email },
            data: updateData,
          });
        }
      } else {
        console.log(`[SIGNIN GOOGLE] Creating new user with email ${user.email}, will use default role`);
        await prisma.user.create({
          data: {
            email: user.email,
            name: googleName,
            image: googleImage,
            username: await generateUniqueUsername(prisma, usernameInput),
            password: null,
          },
        });
      }

      console.log(`[SIGNIN GOOGLE] SignIn callback returning true`);
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }

      if (!token.email) {
        return token;
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
        select: defaultUserSelect,
      });

      if (!dbUser) {
        return token;
      }

      console.log(`[JWT CALLBACK] Email: ${token.email}`);
      console.log(`[JWT CALLBACK] DB User Role:`, { value: dbUser.role, type: typeof dbUser.role, json: JSON.stringify(dbUser.role) });
      console.log(`[JWT CALLBACK] DB User Full:`, { email: dbUser.email, role: dbUser.role, username: dbUser.username, id: dbUser.id });

      token.id = dbUser.id;
      token.name = dbUser.name ?? dbUser.username ?? dbUser.email;
      token.username = dbUser.username ?? undefined;
      token.email = dbUser.email;
      token.image = dbUser.image;
      token.role = dbUser.role;
      token.accountType = dbUser.accountType;
      token.professionRole = dbUser.professionRole;

      console.log(`[JWT CALLBACK] Token Role After Assignment:`, { value: token.role, type: typeof token.role, json: JSON.stringify(token.role) });

      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }

      console.log(`[SESSION CALLBACK START]`);
      console.log(`[SESSION CALLBACK] Token Role Input:`, { value: token.role, type: typeof token.role, json: JSON.stringify(token.role) });

      session.user.id = token.id ?? token.sub ?? "";
      session.user.name = token.name ?? session.user.name;
      session.user.email = token.email ?? session.user.email;
      session.user.image = token.image ?? session.user.image;
      session.user.username = token.username ?? "";
      session.user.role = typeof token.role === "string" ? token.role : "USER";
      session.user.accountType = token.accountType ?? "PERSONAL";
      session.user.professionRole = token.professionRole ?? "OTHER";

      console.log(`[SESSION CALLBACK] Session Role After Assignment:`, { value: session.user.role, type: typeof session.user.role, json: JSON.stringify(session.user.role) });
      console.log(`[SESSION CALLBACK] Full session.user:`, { id: session.user.id, email: session.user.email, role: session.user.role, username: session.user.username, accountType: session.user.accountType });

      if (process.env.NODE_ENV === "development") {
        console.log("SESSION ROLE:", session.user.role);
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      const resolvedUrl = url.startsWith("/") ? new URL(url, baseUrl) : new URL(url);

      if (resolvedUrl.origin !== baseUrl) {
        return baseUrl;
      }

      // Force protected destinations through role resolver so callbackUrl never bypasses role mapping.
      if (
        resolvedUrl.pathname.startsWith("/admin") ||
        resolvedUrl.pathname.startsWith("/competition") ||
        resolvedUrl.pathname.startsWith("/home")
      ) {
        return `${baseUrl}/auth/role-redirect`;
      }

      return resolvedUrl.toString();
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
