import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

import {
  AccountType,
  PrismaClient,
  ProfessionRole,
  Role,
} from "../src/generated/prisma/client";

const website = "https://linktr.ee/MemoriesEndXYZ";
const plainPassword = "daffa170805";

type SeedUser = {
  email: string;
  name: string;
  username: string;
  role: Role;
  accountType: AccountType;
  professionRole: ProfessionRole;
  bio: string;
  gender: string;
  phoneNumber: string;
  address: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
};

type SeedUserData = {
  name: string;
  username: string;
  password: string;
  role: Role;
  accountType: AccountType;
  professionRole: ProfessionRole;
  website: string;
  bio: string;
  gender: string;
  phoneNumber: string;
  address: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
};

const seedUsers: SeedUser[] = [
  {
    email: "memoriesendx@gmail.com",
    name: "MemoriesEndX",
    username: "memoriesendx",
    role: Role.CREATOR,
    accountType: AccountType.PERSONAL,
    professionRole: ProfessionRole.DIRECTOR,
    bio: "Creator film indie dan pengembang platform Cineku.",
    gender: "male",
    phoneNumber: "+6281708050001",
    address: "Indonesia",
    profilePhoto: null,
    coverPhoto: null,
  },
  {
    email: "dafarizqy1@gmail.com",
    name: "Dafa Rizqy",
    username: "dafa-rizqy",
    role: Role.COMPETITION_JUDGE,
    accountType: AccountType.PERSONAL,
    professionRole: ProfessionRole.PRODUCER,
    bio: "Juri kompetisi film dan reviewer karya kreator.",
    gender: "male",
    phoneNumber: "+6281708050002",
    address: "Indonesia",
    profilePhoto: null,
    coverPhoto: null,
  },
  {
    email: "cineku.app@gmail.com",
    name: "CineKU",
    username: "cineku-admin",
    role: Role.ADMIN,
    accountType: AccountType.ORGANIZED,
    professionRole: ProfessionRole.OTHER,
    bio: "Akun admin resmi platform Cineku.",
    gender: "organization",
    phoneNumber: "+6281708050003",
    address: "Indonesia",
    profilePhoto: null,
    coverPhoto: null,
  },
];

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({ adapter });
}

async function seedUsersData(prisma: PrismaClient): Promise<void> {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  for (const user of seedUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true, username: true },
    });
    const username = await resolveUniqueSeedUsername(prisma, user.email, user.username, existingUser?.username);
    const data = createSeedUserData(user, hashedPassword, username);

    if (existingUser) {
      await prisma.user.update({
        where: { email: user.email },
        data,
      });
      console.log(`Updated user: ${user.email} (${user.role})`);
      continue;
    }

    await prisma.user.create({
      data: {
        ...data,
        email: user.email,
      },
    });
    console.log(`Created user: ${user.email} (${user.role})`);
  }
}

function createSeedUserData(
  user: SeedUser,
  hashedPassword: string,
  username: string,
): SeedUserData {
  return {
    name: user.name,
    username,
    password: hashedPassword,
    role: user.role,
    accountType: user.accountType,
    professionRole: user.professionRole,
    website,
    bio: user.bio,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    address: user.address,
    profilePhoto: user.profilePhoto,
    coverPhoto: user.coverPhoto,
  };
}

async function resolveUniqueSeedUsername(
  prisma: PrismaClient,
  email: string,
  desiredUsername: string,
  currentUsername?: string | null,
): Promise<string> {
  const desiredOwner = await prisma.user.findUnique({
    where: { username: desiredUsername },
    select: { email: true },
  });

  if (!desiredOwner || desiredOwner.email === email) {
    return desiredUsername;
  }

  if (currentUsername) {
    const currentOwner = await prisma.user.findUnique({
      where: { username: currentUsername },
      select: { email: true },
    });

    if (currentOwner?.email === email) {
      return currentUsername;
    }
  }

  const emailLocalPart = email.split("@")[0] ?? "user";

  for (let index = 1; index <= 20; index += 1) {
    const candidate = `${desiredUsername}-${emailLocalPart}-${index}`;
    const existingUser = await prisma.user.findUnique({
      where: { username: candidate },
      select: { email: true },
    });

    if (!existingUser || existingUser.email === email) {
      return candidate;
    }
  }

  throw new Error(`Tidak bisa menemukan username unik untuk ${email}.`);
}

async function main(): Promise<void> {
  const prisma = createPrismaClient();

  try {
    await seedUsersData(prisma);
    console.log("Seed completed successfully.");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
