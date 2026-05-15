export type AppRole = "USER" | "ADMIN" | "COMPETITION_JUDGE" | "CREATOR";

export { getDashboardUrl as getRedirectPathByRole } from "@/lib/auth/get-dashboard-url";
