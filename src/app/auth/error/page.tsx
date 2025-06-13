import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Authentication Error | Resetrix",
  description: "An error occurred during authentication",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error as string;

  if (!error) {
    notFound();
  }

  let errorMessage = "An unknown error occurred during authentication.";
  let errorDescription =
    "Please try again or contact support if the problem persists.";

  // Handle different error types
  switch (error) {
    case "AccessDenied":
      errorMessage = "Access Denied";
      errorDescription = "You do not have permission to access this resource.";
      break;
    case "Verification":
      errorMessage = "Verification Error";
      errorDescription = "The verification link is invalid or has expired.";
      break;
    case "OAuthSignin":
      errorMessage = "OAuth Sign In Error";
      errorDescription = "Error in the OAuth sign-in process.";
      break;
    case "OAuthCallback":
      errorMessage = "OAuth Callback Error";
      errorDescription = "Error in the OAuth callback process.";
      break;
    case "OAuthCreateAccount":
      errorMessage = "OAuth Account Creation Error";
      errorDescription =
        "Error creating a user account with the OAuth provider.";
      break;
    case "EmailCreateAccount":
      errorMessage = "Email Account Creation Error";
      errorDescription = "Error creating a user account with email.";
      break;
    case "Callback":
      errorMessage = "Callback Error";
      errorDescription = "Error in the authentication callback process.";
      break;
    case "OAuthAccountNotLinked":
      errorMessage = "OAuth Account Not Linked";
      errorDescription =
        "This email is already associated with another account.";
      break;
    case "EmailSignin":
      errorMessage = "Email Sign In Error";
      errorDescription = "Error sending the email for sign in.";
      break;
    case "CredentialsSignin":
      errorMessage = "Invalid Credentials";
      errorDescription = "The email or password you entered is incorrect.";
      break;
    case "SessionRequired":
      errorMessage = "Session Required";
      errorDescription = "You must be signed in to access this page.";
      break;
    default:
      // Use default error message
      break;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {errorMessage}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{errorDescription}</p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/auth/signin"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to Sign In
          </Link>
          <Link
            href="/"
            className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
