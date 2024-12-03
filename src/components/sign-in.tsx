"use client";
import { loginWithEmail } from "@/actions/auth";
import { useState } from "react";

export function SignInForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInError, setSignInError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorMessage = await loginWithEmail(email, password);

    if (errorMessage != null) {
      setSignInError(errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4 mb-12 ">
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
      <input
        type="submit"
        value="Sign In"
        className="text-sm rounded-lg border-white-500 border p-2.5 inline-block self-center mt-4"
      />
      <span className="text-rose-500">{signInError}</span>
    </form>
  );
}
