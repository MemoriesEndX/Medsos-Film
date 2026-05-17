export type AppRole = "USER" | "ADMIN" | "COMPETITION_JUDGE" | "CREATOR";

export { getDashboardUrlByRole, getDashboardUrlByRole as getRedirectPathByRole } from "@/lib/auth/get-dashboard-url";
