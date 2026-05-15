import Link from "next/link";
import { Film } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CreatorNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(95%_60%_at_50%_0%,rgba(71,85,105,0.4),rgba(2,6,23,1))] px-4 text-white">
      <section className="max-w-xl rounded-3xl border border-white/10 bg-black/45 p-8 text-center shadow-[0_32px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-amber-200/30 bg-amber-300/10 text-amber-100">
          <Film className="h-6 w-6" />
        </span>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">Creator Tidak Ditemukan</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Username yang kamu tuju tidak ada atau belum memiliki profil publik.
        </p>
        <Button asChild className="mt-6 rounded-full bg-white px-6 text-slate-950 hover:bg-slate-100">
          <Link href="/">Kembali ke Home</Link>
        </Button>
      </section>
    </main>
  );
}
