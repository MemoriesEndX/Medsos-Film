import { randomBytes } from "node:crypto";

import type { PrismaClient } from "@/src/generated/prisma/client";

const fallbackUsernameBase = "user";

export function generateUsernameBase(input: string): string {
  const normalized = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
    .replace(/-+/g, "-")
    .replace(/_+/g, "_")
    .replace(/^[-_]+|[-_]+$/g, "");

  return normalized || fallbackUsernameBase;
}

export function generateRandomSuffix(): string {
  return randomBytes(4).toString("hex").slice(0, 6);
}

export async function generateUniqueUsername(prisma: PrismaClient, input: string): Promise<string> {
  const base = generateUsernameBase(input);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const username = `${base}-${generateRandomSuffix()}`;
    const existingUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!existingUser) {
      return username;
    }
  }

  return `${base}-${Date.now().toString(36)}-${generateRandomSuffix()}`;
}
