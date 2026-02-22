"use client";

import { useLocale } from "@/src/i18n/LocaleContext";

const DEFAULT_IOS = "https://apps.apple.com/";
const DEFAULT_ANDROID = "https://play.google.com/store";

interface AdminInviteViewProps {
  branchName?: string;
  encodedData: string;
}

export function AdminInviteView({ branchName, encodedData }: AdminInviteViewProps) {
  const { t } = useLocale();
  const scheme = process.env.NEXT_PUBLIC_APP_DEEPLINK_SCHEME || "cellarium";
  const iosUrl = process.env.NEXT_PUBLIC_IOS_STORE_URL || DEFAULT_IOS;
  const androidUrl = process.env.NEXT_PUBLIC_ANDROID_STORE_URL || DEFAULT_ANDROID;
  const deepLink = `${scheme}://qr/${encodedData}`;

  const openInApp = () => {
    if (typeof window !== "undefined") {
      window.location.href = deepLink;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wine-100 text-wine-600 dark:bg-wine-900/40 dark:text-wine-400">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("admin.title")}
        </h1>
        {branchName ? (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t("admin.branchLabel")}: {branchName}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
          {t("admin.message")}
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={openInApp}
            className="w-full rounded-lg bg-wine-600 px-4 py-3 text-sm font-medium text-white hover:bg-wine-700 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:ring-offset-2 dark:bg-wine-500 dark:hover:bg-wine-600"
          >
            {t("admin.openInApp")}
          </button>
          <p className="text-center text-xs text-gray-500 dark:text-gray-500">
            {t("admin.storeHint")}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-wine-600 hover:underline dark:text-wine-400"
            >
              App Store
            </a>
            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-wine-600 hover:underline dark:text-wine-400"
            >
              Play Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
