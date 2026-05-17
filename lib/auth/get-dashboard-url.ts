export function getDashboardUrlByRole(role?: string | null) {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "CREATOR":
    case "COMPETITION_JUDGE":
      return "/competition";
    case "USER":
    default:
      return "/home";
  }
}

export function getDashboardUrl(user: { role?: string | null; username?: string | null }): string {
  return getDashboardUrlByRole(user.role);
}
