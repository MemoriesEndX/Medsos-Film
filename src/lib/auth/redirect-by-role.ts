export type AppRole = "USER" | "ADMIN" | "COMPETITION_JUDGE" | "CREATOR";

export function getRedirectPathByRole(role: AppRole | string | null | undefined): string {
  if (role === "ADMIN") {
    return "/admin";
  }

  if (role === "COMPETITION_JUDGE") {
    return "/competition";
  }

  return "/home";
}
