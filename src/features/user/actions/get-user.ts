import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { User } from "@/types";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string): Promise<User | null> {
  const [data] = await db.select().from(users).where(eq(users.email, email));
  return data;
}
