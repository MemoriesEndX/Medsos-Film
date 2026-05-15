import type { DefaultSession, DefaultUser } from "next-auth";

type AppRole = "USER" | "CREATOR" | "COMPETITION_JUDGE" | "ADMIN";
type AppAccountType = "PERSONAL" | "STUDIO" | "ORGANIZED";
type AppProfessionRole =
  | "DIRECTOR"
  | "PRODUCER"
  | "SCREENWRITER"
  | "ACTOR"
  | "EDITOR"
  | "DOP"
  | "SOUND_DESIGNER"
  | "PRODUCTION_DESIGNER"
  | "OTHER";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: AppRole;
      accountType: AppAccountType;
      professionRole: AppProfessionRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string;
    role?: AppRole;
    accountType?: AppAccountType;
    professionRole?: AppProfessionRole;
    password?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    role?: AppRole;
    accountType?: AppAccountType;
    professionRole?: AppProfessionRole;
    image?: string | null;
  }
}
