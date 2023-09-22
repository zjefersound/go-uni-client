import { Session, getServerSession } from "next-auth";
import { nextAuthOptions } from "../options";

export async function getSessionUser() {
  const session: Session | null = await getServerSession(nextAuthOptions);
  return session?.user || null;
}
