import { Calendar, Star } from "lucide-react";

import type { CreatorFavoriteMovie } from "@/types/creator";

type MovieRatingCardProps = {
  movie: CreatorFavoriteMovie;
};

function formatRating(rating: number | null): string {
  if (rating === null) {
    return "-";
  }

  return `${rating.toFixed(1)}/10`;
}

function formatStars(rating: number | null): string {
  if (rating === null) {
    return "0.0/5";
  }

  return `${(rating / 2).toFixed(1)}/5`;
}

export default function MovieRatingCard({ movie }: MovieRatingCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/3 shadow-[0_24px_48px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-amber-200/35">
      <div className="relative h-56 bg-slate-800">
        {movie.posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-slate-300">
            No Poster
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">{movie.title}</h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          {movie.year ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2 py-1">
              <Calendar className="h-3.5 w-3.5" />
              {movie.year}
            </span>
          ) : null}
          {movie.genre ? <span className="rounded-full border border-white/20 bg-white/5 px-2 py-1">{movie.genre}</span> : null}
        </div>

        <div className="rounded-xl border border-amber-100/15 bg-amber-100/5 p-3">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-100">
            <Star className="h-4 w-4 fill-amber-200 text-amber-200" />
            {formatStars(movie.rating)}
          </p>
          <p className="mt-1 text-xs text-amber-200/85">TMDB style: {formatRating(movie.rating)}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-300"
              style={{ width: `${Math.max(4, Math.min(100, ((movie.rating ?? 0) / 10) * 100))}%` }}
            />
          </div>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-slate-300">
          {movie.review ?? "Belum ada review singkat untuk film ini."}
        </p>
      </div>
    </article>
  );
}
