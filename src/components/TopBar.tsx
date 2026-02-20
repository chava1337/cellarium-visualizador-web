import type { Branch } from "@/src/types/menu";
import { AppActions } from "@/src/components/AppActions";

interface TopBarProps {
  branch: Branch;
  encodedData: string;
}

export function TopBar({ branch, encodedData }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
      <div className="mx-auto max-w-2xl px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {branch.name}
        </h1>
        {branch.address && (
          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
            {branch.address}
          </p>
        )}
        <div className="mt-3">
          <AppActions encodedData={encodedData} />
        </div>
      </div>
    </header>
  );
}
