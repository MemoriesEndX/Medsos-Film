import type { ReactNode } from "react";

import DashboardDecorations from "./DashboardDecorations";

interface DashboardShellProps {
  readonly children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-16 top-1/4 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <DashboardDecorations />

      <div className="relative z-10">{children}</div>
    </main>
  );
}
