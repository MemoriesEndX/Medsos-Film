import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Bell, Home, Search, Upload, User, Film, Settings } from "lucide-react";

import AppMobileNav from "@/components/shared/app-mobile-nav";
import AppSidebar, { type AppMenuItem } from "@/components/shared/app-sidebar";
import { authOptions } from "@/lib/auth";

const mobileMenuItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Upload", href: "/upload", icon: Upload },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: User },
];

function getSidebarMenuItems(role: string): AppMenuItem[] {
  if (role === "ADMIN") {
    return [
      { label: "Home", href: "/home", icon: Home },
      { label: "Admin Dashboard", href: "/admin", icon: User },
      { label: "Manage Films", href: "/admin/films", icon: Film },
      { label: "Settings", href: "/settings", icon: Settings },
    ];
  }

  if (role === "COMPETITION_JUDGE") {
    return [
      { label: "Home", href: "/home", icon: Home },
      { label: "Competition Dashboard", href: "/competition", icon: Film },
      { label: "Review Films", href: "/competition/review", icon: Search },
      { label: "Profile", href: "/profile", icon: User },
    ];
  }

  return [
    { label: "Home", href: "/home", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Upload", href: "/upload", icon: Upload },
    { label: "Profile", href: "/profile", icon: User },
  ];
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const displayName = session.user.name ?? session.user.username ?? "User";

  return (
    <main className="min-h-screen bg-slate-950 pb-24 text-white lg:pl-72">
      <AppSidebar
        activePath="/home"
        menuItems={getSidebarMenuItems(session.user.role)}
        showLogout
        user={{
          name: displayName,
          username: session.user.username,
          avatarUrl: session.user.image,
        }}
      />
      <AppMobileNav activePath="/home" menuItems={mobileMenuItems} showLogout />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-10 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Home</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Selamat datang, {displayName}</h1>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Ruang utama Cineku untuk menemukan film, memantau aktivitas, dan melanjutkan pekerjaan kreatif Anda.
          </p>
        </div>
      </section>
    </main>
  );
}
