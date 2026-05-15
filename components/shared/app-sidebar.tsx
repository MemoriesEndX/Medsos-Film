import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import AuthLogoutButton from "@/components/shared/auth-logout-button";
import { cn } from "@/lib/utils";

export type AppMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
};

export type AppSidebarUser = {
  name: string;
  username: string;
  avatarUrl?: string | null;
};

type AppSidebarProps = {
  menuItems: AppMenuItem[];
  activePath?: string;
  user?: AppSidebarUser;
  showLogout?: boolean;
  appName?: string;
  logo?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function AppSidebar({
  menuItems,
  activePath,
  user,
  showLogout = false,
  appName = "CineKU",
  logo,
  footer,
  className,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 hidden h-screen w-72 flex-col border-r border-white/10 bg-black/60 px-5 py-6 text-white backdrop-blur-2xl lg:flex",
        className,
      )}
    >
      <Link href="/" className="inline-flex items-center gap-3 px-2 text-white">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200/30 bg-amber-300/10">
          {logo ?? <span className="text-sm font-semibold text-amber-100">{appName.slice(0, 1)}</span>}
        </span>
        <span className="text-xl font-semibold tracking-tight">{appName}</span>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = item.isActive ?? activePath === item.href;

          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={cn(
                "group inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-white text-slate-950 shadow-[0_16px_40px_rgba(255,255,255,0.16)]"
                  : "text-slate-200 hover:bg-white/10 hover:text-white",
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {user ? (
        <div className="space-y-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-300">@{user.username}</p>
              </div>
            </div>
          </div>
          {showLogout ? <AuthLogoutButton /> : null}
        </div>
      ) : null}

      {footer ? <div className="mt-3">{footer}</div> : null}
    </aside>
  );
}
