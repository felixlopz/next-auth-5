import { SignOut } from "@/components/sign-out";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/dashboard");
  }

  const data = await db.select().from(users);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        admin
        <Link href="/dashboard" className="underline">
          go to dashboard
        </Link>
      </div>
      <pre className="my-4">{JSON.stringify(data, null, 2)}</pre>
      <SignOut />
    </div>
  );
}
