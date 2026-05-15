import { CalendarDays, Film, UserRound } from "lucide-react";

import type { CreatorProfileUser } from "@/types/creator";

type CreatorAboutProps = {
  user: CreatorProfileUser;
};

function formatJoinDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function CreatorAbout({ user }: CreatorAboutProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-base font-semibold text-white">Bio Lengkap</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{user.bio}</p>
      </article>

      <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-base font-semibold text-white">Detail Creator</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li className="inline-flex items-center gap-2">
            <Film className="h-4 w-4 text-amber-200" />
            Favorite Genre: Drama, Thriller, Sci-Fi
          </li>
          <li className="inline-flex items-center gap-2">
            <UserRound className="h-4 w-4 text-amber-200" />
            Favorite Director: Christopher Nolan
          </li>
          <li className="inline-flex items-center gap-2">
            <UserRound className="h-4 w-4 text-amber-200" />
            Favorite Actor: Cillian Murphy
          </li>
          <li className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-amber-200" />
            Joined: {formatJoinDate(user.createdAt)}
          </li>
        </ul>
      </article>
    </section>
  );
}
