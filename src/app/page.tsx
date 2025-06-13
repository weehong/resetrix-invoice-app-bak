import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();
  const isAuthenticated = !!session;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Welcome to Resetrix</span>
          <span className="block text-indigo-600">Invoice & Receipt App</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          A simple and powerful application for managing invoices and receipts
          with user authentication and authorization.
        </p>

        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
          {isAuthenticated ? (
            <div className="rounded-md shadow">
              <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg">
                You are signed in as {session.user.name || session.user.email}
              </div>
            </div>
          ) : (
            <div className="rounded-md shadow">
              <a
                href="/auth/signin"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
              >
                Get started
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Secure Authentication
            </h3>
            <p className="mt-2 text-gray-500">
              Built with NextAuth.js for secure and reliable authentication with
              multiple providers.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Prisma ORM Integration
            </h3>
            <p className="mt-2 text-gray-500">
              Powered by Prisma ORM for type-safe database access and easy
              schema management.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Role-Based Authorization
            </h3>
            <p className="mt-2 text-gray-500">
              Implement fine-grained access control with role-based
              authorization for different user types.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
