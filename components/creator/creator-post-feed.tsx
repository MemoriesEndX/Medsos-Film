import { Heart, MessageCircle, MessageSquareText } from "lucide-react";

import type { CreatorPost } from "@/types/creator";

type CreatorPostFeedProps = {
  posts: CreatorPost[];
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function CreatorPostFeed({ posts }: CreatorPostFeedProps) {
  if (posts.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-300">
          <MessageSquareText className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Belum ada postingan</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">
          Mulai diskusi film, bagikan opini, atau ulas tontonan terbaru.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <p className="text-sm leading-relaxed text-slate-100">{post.content}</p>
          {post.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.imageUrl} alt="Post" className="mt-3 h-60 w-full rounded-xl object-cover" />
          ) : null}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
            <span>{formatDate(post.createdAt)}</span>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                {post.likesCount}
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {post.commentsCount}
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
