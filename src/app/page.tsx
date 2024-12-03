import { SignOut } from "@/components/sign-out";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home
      <div className="bg-pink-100 text-black ">
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <SignOut />
    </div>
  );
}
