import { Clapperboard } from "lucide-react";

import MovieRatingCard from "@/components/creator/movie-rating-card";
import type { CreatorFavoriteMovie } from "@/types/creator";

type FavoriteMoviesProps = {
  movies: CreatorFavoriteMovie[];
};

export default function FavoriteMovies({ movies }: FavoriteMoviesProps) {
  if (movies.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-300">
          <Clapperboard className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Belum ada film favorit</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">
          Tambahkan film favorit dan rating untuk membangun taste profile ala Letterboxd.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-lg font-semibold text-white">Favorite Movie & Rating Film</h2>
        <p className="mt-1 text-sm text-slate-300">Koleksi film yang paling merepresentasikan selera sinema creator.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <MovieRatingCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
