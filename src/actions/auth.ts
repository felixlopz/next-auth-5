"use server";

import { signIn } from "@/lib/auth/auth";
import * as authErrors from "@/lib/auth/errors";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function loginWithEmail(
  email: string,
  password: string
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    // see https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof authErrors.InvalidLoginError) {
      return error.message;
    }

    if (error instanceof authErrors.MemberNotFoundError) {
      return error.message;
    }

    return "Something went wrong while checking your credentials. Please try again later.";
  }
}
