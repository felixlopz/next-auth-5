"use client";
import { loginWithEmail } from "@/actions/auth";
import { useCreateUser } from "@/features/user/api/use-create-user";
import Link from "next/link";
import { useState } from "react";

export function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInError, setSignInError] = useState("");

  const userMutation = useCreateUser();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    userMutation.mutate(
      { email, name, password },
      {
        onSuccess: () => {
          setSignInError("Usuario creado con exito, puede logearse");
        },
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4 mb-12 ">
      <label
        htmlFor="name"
        className="block  text-sm font-medium text-gray-900 dark:text-white"
      >
        Name
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="name"
        name="name"
        className="bg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-white-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="E.g John Doe"
        required
      />
      <label
        htmlFor="email"
        className="block  text-sm font-medium text-gray-900 dark:text-white"
      >
        Email
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
        name="email"
        className="bg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-white-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John@mail.com"
        required
      />
      <label
        htmlFor="password"
        className="block  text-sm font-medium text-gray-900 dark:text-white"
      >
        Password
      </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        id="password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-white-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      <span className="text-rose-500">{signInError}</span>
      <span className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          log in!
        </Link>
      </span>

      <input
        type="submit"
        value="Sign Up"
        disabled={userMutation.isPending}
        className="text-sm rounded-lg border-white-500 border p-2.5 inline-block self-center mt-4 cursor-pointer"
      />
    </form>
  );
}
