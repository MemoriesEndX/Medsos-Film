import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getDashboardUrlByRole } from "@/lib/auth/get-dashboard-url";

export default async function RoleRedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const redirectPath = getDashboardUrlByRole(session.user.role);
  console.log(`[ROLE REDIRECT PAGE] Session User:`, { email: session.user.email, role: session.user.role, username: session.user.username });
  console.log(`[ROLE REDIRECT PAGE] Role: ${session.user.role}, Type: ${typeof session.user.role}, Redirecting to: ${redirectPath}`);

  redirect(redirectPath);
}
