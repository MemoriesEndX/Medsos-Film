import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getRedirectPathByRole } from "@/src/lib/auth/redirect-by-role";

export default async function RoleRedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  redirect(getRedirectPathByRole(session.user.role));
}
