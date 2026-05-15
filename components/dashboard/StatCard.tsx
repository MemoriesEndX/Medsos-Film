"use client";

import { motion } from "framer-motion";

import type { DashboardStatItem } from "@/types";

interface StatCardProps {
  readonly item: DashboardStatItem;
  readonly index: number;
}

const toneClassMap: Record<DashboardStatItem["tone"], string> = {
  emerald: "bg-amber-50 text-amber-700",
  sky: "bg-rose-50 text-amber-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-amber-100/70 text-amber-700",
};

export default function StatCard({ item, index }: StatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
      className="rounded-2xl border border-amber-100 bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,185,129,0.6)] transition hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <p className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl ${toneClassMap[item.tone]}`} aria-hidden>
          {item.icon}
        </p>
        <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" aria-hidden="true" />
      </div>

      <p className="mt-3 text-xs font-medium tracking-wide text-slate-500">{item.label}</p>
      <p className="mt-1 text-xl font-bold text-amber-700">{item.value}</p>
      <p className="mt-1 text-xs text-slate-500">{item.caption}</p>

      <p className="mt-3 h-1.5 w-14 rounded-full bg-linear-to-r from-amber-500 to-amber-400" aria-hidden="true" />
    </motion.article>
  );
}
