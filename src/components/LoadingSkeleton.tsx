export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4">
      <div className="h-10 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-3 h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
