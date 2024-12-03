"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  const logoutAction = () => {
    signOut();
  };

  return (
    <button
      className="text-sm rounded-lg border-gray-600 border p-2.5 inline-block self-center mt-4"
      onClick={logoutAction}
    >
      Log Out
    </button>
  );
}
