"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, Clapperboard, Film, Sparkles, UserRound } from "lucide-react";

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

type RegisterResponse = {
  message?: string;
  redirectUrl?: string;
};

export default function RegisterCard() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const username = String(formData.get("username") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const accountType = String(formData.get("accountType") ?? "");
    const professionRole = String(formData.get("professionRole") ?? "");

    if (!name || !username || !email || !password || !confirmPassword) {
      setErrorMessage("Semua field wajib diisi.");
      return;
    }

    if (username.length < 3) {
      setErrorMessage("Username minimal 3 karakter.");
      return;
    }

    if (/\s/.test(username)) {
      setErrorMessage("Username tidak boleh mengandung spasi.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password harus sama.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password, confirmPassword, accountType, professionRole }),
      });

      const result = (await response.json()) as RegisterResponse;

      if (!response.ok) {
        setErrorMessage(result.message ?? "Register gagal.");
        return;
      }

      router.replace(result.redirectUrl ?? "/login");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7"
    >
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block" aria-hidden="true">
        <motion.div
          className="absolute -left-12 top-10 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-4 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{ y: [0, -16, 0], x: [0, -10, 0] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative">
        <header className="text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-slate-950/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100 shadow-inner shadow-black/20">
            <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
            Cineku Register
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">Buat Akun Cineku</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            Simpan film favorit, ikuti tontonan kreator Indonesia, dan nikmati pengalaman discovery yang terasa seperti poster utama di bioskop.
          </p>
        </header>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-200">
              Nama
            </label>
            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 px-3 transition focus-within:border-amber-300/40 focus-within:ring-4 focus-within:ring-amber-400/10">
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-amber-200/70" aria-hidden="true" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Nama lengkap"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-slate-200">
              Username
            </label>
            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 px-3 transition focus-within:border-amber-300/40 focus-within:ring-4 focus-within:ring-amber-400/10">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-200/70" aria-hidden="true" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  pattern="\S+"
                  autoComplete="username"
                  placeholder="nama_pengguna"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-200">
              Email
            </label>
            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 px-3 transition focus-within:border-amber-300/40 focus-within:ring-4 focus-within:ring-amber-400/10">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-amber-200/70" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="nama@email.com"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Tipe akun" name="accountType" options={accountTypes} />
            <SelectField label="Profesi" name="professionRole" options={professionRoles} />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-200">
              Password
            </label>
            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 px-3 transition focus-within:border-amber-300/40 focus-within:ring-4 focus-within:ring-amber-400/10">
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-amber-200/70" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Minimal 8 karakter"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-200">
              Konfirmasi password
            </label>
            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 px-3 transition focus-within:border-amber-300/40 focus-within:ring-4 focus-within:ring-amber-400/10">
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-amber-200/70" aria-hidden="true" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Ulangi password"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(255,255,255,0.12)] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
            {isSubmitting ? "Memproses..." : "Daftar"}
          </motion.button>
        </form>

        {errorMessage ? <p className="mt-3 text-sm text-rose-300">{errorMessage}</p> : null}

        <footer className="mt-6 text-center text-sm text-white">
          <p>
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-white transition hover:text-gray-200 hover:underline">
              Masuk
            </Link>
          </p>
        </footer>
      </div>
    </motion.section>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-200">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition focus:border-amber-300/40 focus:ring-4 focus:ring-amber-400/10"
      >
        <option value="" className="bg-slate-950 text-white">
          Default
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
