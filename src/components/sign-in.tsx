"use client";
import { signIn } from "next-auth/react";

export function SignInForm() {
  const credentialsAction = async (formData: FormData) => {
    signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <form action={credentialsAction} className="flex flex-col gap-y-4 mb-12 ">
      <label
        htmlFor="email"
        className="block  text-sm font-medium text-gray-900 dark:text-white"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="bg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        name="password"
        type="password"
        id="password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      <input
        type="submit"
        value="Sign In"
        className="text-sm rounded-lg border-gray-600 border p-2.5 inline-block self-center mt-4"
      />
    </form>
  );
}
