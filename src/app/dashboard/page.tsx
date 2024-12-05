import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        dashboard
        <div>
          <Link href="/" className="underline">
            go to home
          </Link>
          {session?.user?.role === "admin" ? (
            <Link href="/admin" className="ml-8 underline">
              go to admin
            </Link>
          ) : null}
        </div>
      </div>
      <pre className="my-4">{JSON.stringify(session?.user, null, 2)}</pre>
      <SignOut />
    </div>
  );
}
