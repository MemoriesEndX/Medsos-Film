"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Camera, Clapperboard, Film, Sparkles, Ticket } from "lucide-react";

import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import { getDashboardUrlByRole } from "@/lib/auth/get-dashboard-url";

export default function LoginCard() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Email atau password salah.");
        return;
      }

      const session = await getSession();
      const role = session?.user?.role ?? "USER";

      router.replace(getDashboardUrlByRole(role));
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -right-14 top-8 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-rose-500/10 blur-3xl"
          animate={{ y: [0, -16, 0], x: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative">
        <header className="text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-slate-950/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100 shadow-inner shadow-black/20">
            <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
            Cineku Login
          </div>


          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">Masuk ke Ruang Tayang Cineku</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            Lanjutkan perjalanan menemukan film kreator Indonesia, simpan daftar tonton, dan ikuti rekomendasi yang terasa seperti layar bioskop.
          </p>
        </header>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
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
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="nama@email.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="password" className="text-sm font-medium text-slate-200">
                Kata sandi
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-amber-200 transition hover:text-amber-100 hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 px-3 transition focus-within:border-amber-300/40 focus-within:ring-4 focus-within:ring-amber-400/10">
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-amber-200/70" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Masukkan kata sandi"
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
            {isSubmitting ? "Memproses..." : "Masuk"}
          </motion.button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          <span className="h-px flex-1 bg-white/10" />
          atau
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <GoogleLoginButton />

        {errorMessage ? <p className="mt-3 text-sm text-rose-300">{errorMessage}</p> : null}

        <footer className="mt-6 text-center text-sm text-white">
          <p>
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-white transition hover:text-gray-200 hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </footer>
      </div>
      <Ticket className="pointer-events-none absolute right-5 top-5 h-5 w-5 text-amber-200/40" aria-hidden="true" />
    </motion.section>
  );
}
