"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

type AuthLogoutButtonProps = {
  className?: string;
  compact?: boolean;
};

export default function AuthLogoutButton({ className, compact = false }: AuthLogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => void signOut({ callbackUrl: "/" })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-rose-300/40 hover:bg-rose-500/15 hover:text-white",
        compact ? "h-11 w-11 rounded-full p-0" : "w-full",
        className,
      )}
      aria-label="Logout"
      title="Logout"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      {compact ? null : <span>Logout</span>}
    </button>
  );
}
