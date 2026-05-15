import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { Bell, Clapperboard, Compass, Heart, Home, Sparkles, UserRound } from "lucide-react";

import AppMobileNav from "@/components/shared/app-mobile-nav";
import AppSidebar from "@/components/shared/app-sidebar";
import CreatorHeader from "@/components/creator/creator-header";
import CreatorTabs from "@/components/creator/creator-tabs";
import { authOptions } from "@/lib/auth";
import { getCreatorProfileData } from "@/lib/creator-profile";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

type CreatorStat = {
  label: string;
  value: string;
  description: string;
};

const buildMenuItems = (username: string) => [
  { label: "Home", href: "/", icon: Home },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "My Profile", href: `/creator/${username}`, icon: UserRound },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Activity", href: "/activity", icon: Sparkles },
];

function buildStats(data: Awaited<ReturnType<typeof getCreatorProfileData>>): CreatorStat[] {
  const favoriteMovies = data?.favoriteMovies.length ?? 0;
  const posts = data?.posts.length ?? 0;
  const followers = data?.user.followersCount ?? 0;
  const totalFilms = favoriteMovies > 0 ? favoriteMovies : 12;
  const totalViews = Math.max(1680, posts * 240 + totalFilms * 45);
  const totalLikes = Math.max(420, posts * 42 + favoriteMovies * 18);
  const totalFollowers = Math.max(1200, followers || 1200);

  return [
    {
      label: "Total Films",
      value: String(totalFilms),
      description: "Movies curated and rated",
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString("id-ID"),
      description: "Profile and content reach",
    },
    {
      label: "Total Likes",
      value: totalLikes.toLocaleString("id-ID"),
      description: "Likes across posts and ratings",
    },
    {
      label: "Total Followers",
      value: totalFollowers.toLocaleString("id-ID"),
      description: "Community following this creator",
    },
  ];
}

export default async function CreatorProfilePage({ params }: CreatorPageProps) {
  const { username } = await params;

  if (!username) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const data = await getCreatorProfileData(username, session?.user.username ?? null);

  if (!data) {
    notFound();
  }

  const activePath = `/creator/${data.user.username}`;
  const menuItems = buildMenuItems(data.user.username);
  const stats = buildStats(data);

  return (
    <main className="min-h-screen bg-[radial-gradient(95%_60%_at_50%_0%,rgba(71,85,105,0.4),rgba(2,6,23,1))] text-white">
      <AppSidebar
        menuItems={menuItems}
        activePath={activePath}
        user={{
          name: data.user.name,
          username: data.user.username,
          avatarUrl: data.user.profilePhoto ?? data.user.image,
        }}
        appName="CineKU"
        logo={<Clapperboard className="h-5 w-5 text-amber-200" />}
      />

      <div className="mx-auto max-w-370 px-3 pb-24 pt-4 sm:px-5 lg:pl-76 lg:pr-5 xl:pr-83">
        <div className="space-y-6">
          <CreatorHeader user={data.user} />

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-300">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.description}</p>
              </article>
            ))}
          </section>

          <CreatorTabs data={data} />
        </div>
      </div>

      <aside className="fixed right-5 top-5 hidden w-75 space-y-4 rounded-3xl border border-white/10 bg-black/45 p-5 backdrop-blur-2xl xl:block">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-100">Trending This Week</h2>
        <div className="space-y-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="line-clamp-1 text-sm font-medium text-white">Sinners (2025)</p>
            <p className="mt-1 text-xs text-slate-300">Most discussed in CineKU circles</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="line-clamp-1 text-sm font-medium text-white">The Godfather (1972)</p>
            <p className="mt-1 text-xs text-slate-300">Classic picks from creator watchlists</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="line-clamp-1 text-sm font-medium text-white">Interstellar (2014)</p>
            <p className="mt-1 text-xs text-slate-300">Top-rated by CineKU community</p>
          </article>
        </div>
      </aside>

      <AppMobileNav menuItems={menuItems} activePath={activePath} />
    </main>
  );
}
