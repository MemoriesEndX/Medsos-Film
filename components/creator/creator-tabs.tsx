"use client";

import CreatorAbout from "@/components/creator/creator-about";
import CreatorActivity from "@/components/creator/creator-activity";
import CreatorPosterGrid from "@/components/creator/creator-poster-grid";
import CreatorPostFeed from "@/components/creator/creator-post-feed";
import CreatorWatchlist from "@/components/creator/creator-watchlist";
import FavoriteMovies from "@/components/creator/favorite-movies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CreatorProfileData } from "@/types/creator";

type CreatorTabsProps = {
  data: CreatorProfileData;
};

const tabItems = [
  { id: "favorite", label: "Favorite Movie & Rating Film" },
  { id: "postingan", label: "Postingan" },
  { id: "poster", label: "Poster Film" },
  { id: "about", label: "About" },
  { id: "activity", label: "Activity" },
  { id: "watchlist", label: "Watchlist" },
] as const;

export default function CreatorTabs({ data }: CreatorTabsProps) {
  return (
    <Tabs defaultValue="favorite" className="w-full">
      <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-1.5">
        {tabItems.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="rounded-xl px-3 py-2 text-xs font-medium text-slate-200 data-[state=active]:bg-white data-[state=active]:text-slate-950"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="favorite" className="pt-5">
        <FavoriteMovies movies={data.favoriteMovies} />
      </TabsContent>

      <TabsContent value="postingan" className="pt-5">
        <CreatorPostFeed posts={data.posts} />
      </TabsContent>

      <TabsContent value="poster" className="pt-5">
        <CreatorPosterGrid movies={data.posterMovies} />
      </TabsContent>

      <TabsContent value="about" className="pt-5">
        <CreatorAbout user={data.user} />
      </TabsContent>

      <TabsContent value="activity" className="pt-5">
        <CreatorActivity activities={data.activities} />
      </TabsContent>

      <TabsContent value="watchlist" className="pt-5">
        <CreatorWatchlist watchlist={data.watchlist} isOwner={data.user.isOwner} />
      </TabsContent>
    </Tabs>
  );
}
