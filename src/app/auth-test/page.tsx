import { auth } from "@/lib/auth/auth";

export default async function AuthTestPage() {
  const session = await auth();

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">Authentication Test</h1>

      <div className="rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-semibold">Session Status:</h2>
        {session ? (
          <div>
            <p className="font-medium text-green-600">✅ Authenticated</p>
            <div className="mt-2">
              <p>
                <strong>User ID:</strong> {session.user?.id}
              </p>
              <p>
                <strong>Name:</strong> {session.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {session.user?.email}
              </p>
            </div>
          </div>
        ) : (
          <p className="font-medium text-red-600">❌ Not authenticated</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Test Credentials:</h2>
        <div className="bg-primary-100 rounded p-4">
          <p>
            <strong>Email:</strong> john@example.com
          </p>
          <p>
            <strong>Username:</strong> john
          </p>
          <p>
            <strong>Password:</strong> password
          </p>
        </div>
      </div>

      <div className="mt-6">
        <a
          href="/signin"
          className="bg-primary-700 mr-4 rounded px-4 py-2 text-white"
        >
          Go to Sign In
        </a>
        <a
          href="/dashboard"
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
