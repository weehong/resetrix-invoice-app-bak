import { getAuthSession } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import SignInForm from "./signin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function SignInPage() {
  // Check if user is already signed in
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <SignInForm />
      </div>
    </div>
  );
}
