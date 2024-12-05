import { SignInForm } from "@/components/sign-in";

export default function LoginPage() {
  return (
    <div className="flex flex-col ">
      <SignInForm />

      <pre>
        {JSON.stringify(
          { email: "felixlopzd@gmail.com", password: "1234" },
          null,
          2
        )}
      </pre>
    </div>
  );
}
