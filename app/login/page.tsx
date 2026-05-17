import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getDashboardUrlByRole } from "@/lib/auth/get-dashboard-url";
import LoginCard from "../../components/login/LoginCard";
import LoginDecorations from "../../components/login/LoginDecorations";
import LoginHeroText from "../../components/login/LoginHeroText";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect(getDashboardUrlByRole(session.user.role));
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-[#12121b] to-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 -top-112 h-168 w-2xl -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-24 h-104 w-104 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[72px_72px] opacity-20" />
      </div>

      <LoginDecorations />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.08fr_minmax(0,480px)] lg:gap-12">
          <LoginHeroText />
          <div className="flex justify-center lg:justify-end">
            <LoginCard />
          </div>
        </div>
      </div>
    </main>
  );
}
