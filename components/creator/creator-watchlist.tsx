import { ListVideo, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CreatorWatchlistItem } from "@/types/creator";

type CreatorWatchlistProps = {
  watchlist: CreatorWatchlistItem[];
  isOwner: boolean;
};

export default function CreatorWatchlist({ watchlist, isOwner }: CreatorWatchlistProps) {
  if (watchlist.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-300">
          <ListVideo className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Watchlist masih kosong</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">Tambahkan film impian yang ingin kamu tonton selanjutnya.</p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {watchlist.map((movie) => (
        <article key={movie.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">{movie.title}</h3>
            <p className="mt-1 text-xs text-slate-300">
              {movie.year ?? "TBA"} {movie.genre ? `• ${movie.genre}` : ""}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-amber-100">Priority: {movie.priority}</p>
          </div>

          {isOwner ? (
            <div className="flex items-center gap-2">
              <Button size="sm" className="rounded-full bg-white text-slate-950 hover:bg-slate-100">
                <Plus className="h-4 w-4" />
                Add
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>
          ) : null}
        </article>
      ))}
    </section>
  );
}
