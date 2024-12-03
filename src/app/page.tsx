import { SignOut } from "@/components/sign-out";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        home
        <Link href="/dashboard" className="underline">
          go to dashboard
        </Link>
      </div>
      <h1 className="text-lg font-bold my-24">Programming is fun xd</h1>
      <SignOut />
    </div>
  );
}
