import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      I'm The dashboard
      <pre className="my-4">{JSON.stringify(session?.user, null, 2)}</pre>
      <SignOut />
    </div>
  );
}
