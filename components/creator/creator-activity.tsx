import { Clock3, Film, Heart, ListPlus, Star } from "lucide-react";

import type { CreatorActivityItem } from "@/types/creator";

type CreatorActivityProps = {
  activities: CreatorActivityItem[];
};

function getActivityIcon(kind: CreatorActivityItem["kind"]) {
  if (kind === "LIKED") {
    return Heart;
  }

  if (kind === "WATCHLIST") {
    return ListPlus;
  }

  if (kind === "RATED") {
    return Star;
  }

  return Film;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function CreatorActivity({ activities }: CreatorActivityProps) {
  if (activities.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-300">
          <Clock3 className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Belum ada activity</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">Aktivitas terbaru seperti watched, liked, dan rating akan tampil di sini.</p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {activities.map((activity) => {
        const ActivityIcon = getActivityIcon(activity.kind);

        return (
          <article key={activity.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/8 text-amber-100">
              <ActivityIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">{activity.label}</p>
              {activity.movieTitle ? <p className="line-clamp-1 text-sm text-slate-300">{activity.movieTitle}</p> : null}
              <p className="mt-1 text-xs text-slate-400">{formatDate(activity.createdAt)}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
