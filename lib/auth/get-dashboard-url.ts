export function getDashboardUrl(user: {
  role?: string | null;
  username?: string | null;
}): string {
  if (user.role === "ADMIN") {
    return "/admin";
  }

  if (user.role === "COMPETITION_JUDGE") {
    return "/competition";
  }

  if (user.role === "CREATOR" && user.username) {
    return `/creator/${user.username}`;
  }

  return "/home";
}
