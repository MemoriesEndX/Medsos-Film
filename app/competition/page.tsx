import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Bell, ClipboardList, Film, Home, Search, Star, Trophy, Upload, User } from "lucide-react";

import AppMobileNav from "@/components/shared/app-mobile-nav";
import AppSidebar from "@/components/shared/app-sidebar";
import { authOptions } from "@/lib/auth";

const mobileMenuItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Upload", href: "/upload", icon: Upload },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: User },
];

const sidebarMenuItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Competition Dashboard", href: "/competition", icon: Trophy },
  { label: "Film Submissions", href: "/competition/submissions", icon: ClipboardList },
  { label: "Review Films", href: "/competition/review", icon: Film },
  { label: "Scoreboard", href: "/competition/scoreboard", icon: Star },
  { label: "Profile", href: "/profile", icon: User },
];

export default async function CompetitionPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "COMPETITION_JUDGE") {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/home");
  }

  const displayName = session.user.name ?? session.user.username ?? "Judge";

  return (
    <main className="min-h-screen bg-slate-950 pb-24 text-white lg:pl-72">
      <AppSidebar
        activePath="/competition"
        menuItems={sidebarMenuItems}
        user={{
          name: displayName,
          username: session.user.username,
          avatarUrl: session.user.image,
        }}
      />
      <AppMobileNav activePath="/home" menuItems={mobileMenuItems} />

      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Competition Dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Review film kompetisi</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {["Film Submissions", "Review Films", "Scoreboard"].map((item) => (
            <article key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20">
              <h2 className="text-lg font-semibold">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Panel kerja untuk {item.toLowerCase()}.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
