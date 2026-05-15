import { Image as ImageIcon } from "lucide-react";

import type { CreatorPosterItem } from "@/types/creator";

type CreatorPosterGridProps = {
  movies: CreatorPosterItem[];
};

export default function CreatorPosterGrid({ movies }: CreatorPosterGridProps) {
  if (movies.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-300">
          <ImageIcon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Poster gallery masih kosong</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">Tambahkan film favorit untuk membangun galeri poster sinematik.</p>
      </section>
    );
  }

  return (
    <section className="columns-2 gap-4 sm:columns-3 xl:columns-4">
      {movies.map((movie) => (
        <article key={movie.id} className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative h-64 bg-slate-800">
            {movie.posterUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300">No Poster</div>
            )}
          </div>
          <div className="p-3">
            <h3 className="line-clamp-1 text-sm font-medium text-white">{movie.title}</h3>
            <p className="mt-1 text-xs text-slate-300">{movie.year ?? "TBA"}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
