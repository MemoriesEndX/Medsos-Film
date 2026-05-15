export type CreatorFavoriteMovie = {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  genre: string | null;
  rating: number | null;
  review: string | null;
};

export type CreatorPost = {
  id: string;
  content: string;
  imageUrl: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
};

export type CreatorPosterItem = {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
};

export type CreatorActivityItem = {
  id: string;
  kind: "WATCHED" | "LIKED" | "WATCHLIST" | "RATED";
  label: string;
  movieTitle: string | null;
  createdAt: Date;
};

export type CreatorWatchlistItem = {
  id: string;
  title: string;
  posterUrl: string | null;
  year: number | null;
  genre: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
};

export type CreatorProfileUser = {
  id: string;
  username: string;
  name: string;
  bio: string;
  image: string | null;
  profilePhoto: string | null;
  coverPhoto: string | null;
  website: string | null;
  accountType: string;
  professionRole: string;
  createdAt: Date;
  followersCount: number;
  followingCount: number;
  isOwner: boolean;
};

export type CreatorProfileData = {
  user: CreatorProfileUser;
  favoriteMovies: CreatorFavoriteMovie[];
  posts: CreatorPost[];
  posterMovies: CreatorPosterItem[];
  activities: CreatorActivityItem[];
  watchlist: CreatorWatchlistItem[];
};
