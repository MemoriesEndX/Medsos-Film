import "server-only";

import prisma from "@/lib/prisma";
import type {
  CreatorActivityItem,
  CreatorFavoriteMovie,
  CreatorPost,
  CreatorProfileData,
  CreatorProfileUser,
  CreatorWatchlistItem,
} from "@/types/creator";

type OptionalFavoriteMovieRow = {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  genre: string | null;
  rating: number | null;
  review: string | null;
};

type OptionalPostRow = {
  id: string;
  content: string;
  imageUrl: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
};

type OptionalWatchlistRow = {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  genre: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
};

type OptionalActivityRow = {
  id: string;
  kind: "WATCHED" | "LIKED" | "WATCHLIST" | "RATED";
  label: string;
  movieTitle: string | null;
  createdAt: Date;
};

function buildProfileUser(
  user: {
    id: string;
    username: string | null;
    name: string | null;
    email: string;
    bio: string | null;
    image: string | null;
    profilePhoto: string | null;
    coverPhoto: string | null;
    website: string | null;
    accountType: string;
    professionRole: string;
    createdAt: Date;
  },
  viewerUsername: string | null,
): CreatorProfileUser {
  const normalizedUsername = user.username ?? user.email.split("@")[0] ?? "creator";
  const isOwner = Boolean(viewerUsername && viewerUsername.toLowerCase() === normalizedUsername.toLowerCase());

  return {
    id: user.id,
    username: normalizedUsername,
    name: user.name ?? normalizedUsername,
    bio: user.bio ?? "Belum ada bio. Bagikan selera film dan cerita sinematikmu di sini.",
    image: user.image,
    profilePhoto: user.profilePhoto,
    coverPhoto: user.coverPhoto,
    website: user.website,
    accountType: user.accountType,
    professionRole: user.professionRole,
    createdAt: user.createdAt,
    followersCount: 0,
    followingCount: 0,
    isOwner,
  };
}

async function getFavoriteMovies(userId: string): Promise<CreatorFavoriteMovie[]> {
  try {
    const rows = await prisma.$queryRaw<OptionalFavoriteMovieRow[]>`
      SELECT
        id::text AS "id",
        title,
        "posterUrl",
        "releaseYear"::int AS "year",
        genre,
        rating::float8 AS "rating",
        review
      FROM "FavoriteMovie"
      WHERE "userId" = ${userId}
      ORDER BY COALESCE("updatedAt", "createdAt") DESC
      LIMIT 12
    `;

    return rows;
  } catch {
    return [];
  }
}

async function getPosts(userId: string): Promise<CreatorPost[]> {
  try {
    const rows = await prisma.$queryRaw<OptionalPostRow[]>`
      SELECT
        id::text AS "id",
        content,
        "imageUrl",
        COALESCE("likesCount", 0)::int AS "likesCount",
        COALESCE("commentsCount", 0)::int AS "commentsCount",
        "createdAt"
      FROM "CreatorPost"
      WHERE "userId" = ${userId}
      ORDER BY "createdAt" DESC
      LIMIT 20
    `;

    return rows;
  } catch {
    return [];
  }
}

async function getWatchlist(userId: string): Promise<CreatorWatchlistItem[]> {
  try {
    const rows = await prisma.$queryRaw<OptionalWatchlistRow[]>`
      SELECT
        id::text AS "id",
        title,
        "posterUrl",
        "releaseYear"::int AS "year",
        genre,
        COALESCE(priority, 'MEDIUM')::text AS priority
      FROM "WatchlistItem"
      WHERE "userId" = ${userId}
      ORDER BY COALESCE("updatedAt", "createdAt") DESC
      LIMIT 20
    `;

    return rows.map((row) => ({
      ...row,
      priority: row.priority === "HIGH" || row.priority === "LOW" ? row.priority : "MEDIUM",
    }));
  } catch {
    return [];
  }
}

async function getActivities(userId: string): Promise<CreatorActivityItem[]> {
  try {
    const rows = await prisma.$queryRaw<OptionalActivityRow[]>`
      SELECT
        id::text AS "id",
        COALESCE(kind, 'WATCHED')::text AS kind,
        label,
        "movieTitle",
        "createdAt"
      FROM "CreatorActivity"
      WHERE "userId" = ${userId}
      ORDER BY "createdAt" DESC
      LIMIT 20
    `;

    return rows.map((row) => ({
      ...row,
      kind:
        row.kind === "LIKED" || row.kind === "WATCHLIST" || row.kind === "RATED" ? row.kind : "WATCHED",
    }));
  } catch {
    return [];
  }
}

export async function getCreatorProfileData(
  username: string,
  viewerUsername: string | null,
): Promise<CreatorProfileData | null> {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      bio: true,
      image: true,
      profilePhoto: true,
      coverPhoto: true,
      website: true,
      accountType: true,
      professionRole: true,
      createdAt: true,
    },
  });

  if (!user) {
    return null;
  }

  const [favoriteMovies, posts, watchlist, activities] = await Promise.all([
    getFavoriteMovies(user.id),
    getPosts(user.id),
    getWatchlist(user.id),
    getActivities(user.id),
  ]);

  return {
    user: buildProfileUser(user, viewerUsername),
    favoriteMovies,
    posts,
    posterMovies: favoriteMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      year: movie.year,
    })),
    activities,
    watchlist,
  };
}
