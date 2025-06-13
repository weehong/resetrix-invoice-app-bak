export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
          <h2 className="mt-6 text-2xl font-medium text-gray-900">
            Loading...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we load the content.
          </p>
        </div>
      </div>
    </div>
  );
}
