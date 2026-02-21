"use client";

import { useState, useEffect } from "react";

interface AppActionsProps {
  encodedData: string;
}

const DEFAULT_IOS = "https://apps.apple.com/";
const DEFAULT_ANDROID = "https://play.google.com/store";
const DEEP_LINK_TIMEOUT_MS = 1200;

function isMobileUserAgent(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
}

export function AppActions({ encodedData }: AppActionsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileUserAgent());
  }, []);

  const scheme =
    process.env.NEXT_PUBLIC_APP_DEEPLINK_SCHEME || "cellarium";
  const iosUrl =
    process.env.NEXT_PUBLIC_IOS_STORE_URL || DEFAULT_IOS;
  const androidUrl =
    process.env.NEXT_PUBLIC_ANDROID_STORE_URL || DEFAULT_ANDROID;

  const deepLink = `${scheme}://qr/${encodedData}`;

  const openInApp = () => {
    if (typeof window === "undefined" || !isMobile) return;
    window.location.href = deepLink;
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        // App no se abrió; permanecemos en la web sin redirigir
      }
    }, DEEP_LINK_TIMEOUT_MS);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {isMobile && (
        <>
          <button
            type="button"
            onClick={openInApp}
            className="rounded-lg bg-wine-700 px-4 py-2 text-sm font-medium text-white hover:bg-wine-800 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:ring-offset-2 dark:bg-wine-600 dark:hover:bg-wine-700"
          >
            Abrir en la app
          </button>
          <span className="text-gray-400 dark:text-gray-500">|</span>
        </>
      )}
      <a
        href={iosUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-wine-700 hover:underline dark:text-wine-400"
      >
        App Store
      </a>
      <span className="text-gray-400 dark:text-gray-500">·</span>
      <a
        href={androidUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-wine-700 hover:underline dark:text-wine-400"
      >
        Play Store
      </a>
    </div>
  );
}
