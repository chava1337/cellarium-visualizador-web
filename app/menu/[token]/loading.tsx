import { LoadingSkeleton } from "@/src/components/LoadingSkeleton";

export default function MenuTokenLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LoadingSkeleton />
    </div>
  );
}
