import { getAuthSession } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default async function SignUpPage() {
  // Check if user is already signed in
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p className="mt-2 text-gray-600">
            Create a new account to get started
          </p>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
