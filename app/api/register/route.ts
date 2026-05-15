import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { Prisma } from "@/src/generated/prisma/client";
import prisma from "@/src/lib/prisma";

const accountTypes = ["PERSONAL", "STUDIO", "ORGANIZED"] as const;
const professionRoles = [
  "DIRECTOR",
  "PRODUCER",
  "SCREENWRITER",
  "ACTOR",
  "EDITOR",
  "DOP",
  "SOUND_DESIGNER",
  "PRODUCTION_DESIGNER",
  "OTHER",
] as const;

const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Nama wajib diisi."),
    username: z
      .string()
      .trim()
      .min(3, "Username minimal 3 karakter.")
      .regex(/^\S+$/, "Username tidak boleh mengandung spasi."),
    email: z.string().trim().email("Email tidak valid."),
    password: z.string().min(8, "Password minimal 8 karakter."),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi."),
    accountType: z.preprocess((value) => (value === "" ? undefined : value), z.enum(accountTypes).optional()),
    professionRole: z.preprocess((value) => (value === "" ? undefined : value), z.enum(professionRoles).optional()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password harus sama.",
    path: ["confirmPassword"],
  });

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsedPayload = registerSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsedPayload.error.issues[0]?.message ?? "Data register tidak valid.",
        },
        { status: 400 },
      );
    }

    const { name, username, email, password, accountType, professionRole } = parsedPayload.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar",
        },
        { status: 409 },
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama pengguna sudah ada",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        ...(accountType ? { accountType } : {}),
        ...(professionRole ? { professionRole } : {}),
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        accountType: true,
        professionRole: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Register berhasil.",
        redirectUrl: "/login",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const target = Array.isArray(error.meta?.target) ? error.meta.target : [];
      const message = target.includes("username") ? "Nama pengguna sudah ada" : "Email sudah terdaftar";

      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status: 409 },
      );
    }

    console.error("Register error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat register.",
      },
      { status: 500 },
    );
  }
}
