import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import AppLogo from "@/components/shared/AppLogo";
import Container from "@/components/shared/Container";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <Container className="py-4">
          <AppLogo href="/" />
        </Container>
      </header>

      <Container className="py-16">
        <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Admin Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold">Selamat datang, {session.user.username}</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Halaman ini menjadi tujuan redirect untuk admin setelah login.
          </p>
        </div>
      </Container>
    </main>
  );
}