import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type AppMobileMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
};

type AppMobileNavProps = {
  menuItems: AppMobileMenuItem[];
  activePath?: string;
  className?: string;
};

export default function AppMobileNav({ menuItems, activePath, className }: AppMobileNavProps) {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/65 px-3 py-2 text-white backdrop-blur-2xl lg:hidden",
        className,
      )}
    >
      <ul className="grid grid-cols-5 gap-2">
        {menuItems.map((item) => {
          const isActive = item.isActive ?? activePath === item.href;

          return (
            <li key={`${item.label}-${item.href}`}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition",
                  isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
