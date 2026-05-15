import { Globe, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CreatorProfileUser } from "@/types/creator";

type CreatorHeaderProps = {
  user: CreatorProfileUser;
};

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "C";
}

export default function CreatorHeader({ user }: CreatorHeaderProps) {
  return (
    <header className="overflow-hidden rounded-[30px] border border-white/10 bg-black/35 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div
        className="relative h-40 w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 sm:h-56"
        style={user.coverPhoto ? { backgroundImage: `url(${user.coverPhoto})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="relative px-5 pb-6 sm:px-8">
        <Avatar className="-mt-14 h-28 w-28 border-4 border-slate-950 shadow-2xl sm:h-36 sm:w-36">
          <AvatarImage src={user.profilePhoto ?? user.image ?? undefined} alt={user.name} />
          <AvatarFallback className="bg-slate-300 text-4xl text-slate-700">{getInitial(user.name)}</AvatarFallback>
        </Avatar>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{user.name}</h1>
            <p className="mt-1 text-base text-slate-300">@{user.username}</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200/90">{user.bio}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <p className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-200" />
                <span>
                  <strong className="text-white">{user.followersCount}</strong> Followers
                </span>
              </p>
              <p>
                <strong className="text-white">{user.followingCount}</strong> Following
              </p>
              <p className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs uppercase tracking-[0.12em] text-amber-100">
                {user.professionRole.replaceAll("_", " ")}
              </p>
              {user.website ? (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-200 transition hover:text-amber-100"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              ) : null}
            </div>
          </div>

          <div className="pt-1">
            {user.isOwner ? (
              <Button className="h-11 rounded-full bg-white px-7 text-slate-950 hover:bg-slate-100">Edit Profile</Button>
            ) : (
              <Button className="h-11 rounded-full bg-amber-300 px-7 text-slate-950 hover:bg-amber-200">Follow</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
