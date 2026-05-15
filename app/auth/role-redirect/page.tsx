import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getDashboardUrl } from "@/lib/auth/get-dashboard-url";

export default async function RoleRedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  redirect(getDashboardUrl(session.user));
}
