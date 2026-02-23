"use client";

import { useLocale } from "@/src/i18n/LocaleContext";
import { LocaleToggle } from "@/src/components/LocaleToggle";
import { supabase } from "@/src/lib/supabaseClient";
import type { TranslationKeys } from "@/src/i18n/translations";
import { useCallback, useState } from "react";

const DEFAULT_IOS = "https://apps.apple.com/";
const DEFAULT_ANDROID = "https://play.google.com/store";

const RPC_ERROR_KEYS: Record<string, string> = {
  invalid_token: "adminInvite.errors.invalid_token",
  token_expired: "adminInvite.errors.token_expired",
  token_used: "adminInvite.errors.token_used",
  token_max_uses_reached: "adminInvite.errors.token_max_uses_reached",
  branch_not_found: "adminInvite.errors.branch_not_found",
  not_authenticated: "adminInvite.errors.not_authenticated",
  too_many_pending: "adminInvite.errors.too_many_pending",
};

function isAlreadyRegisteredError(err: { message?: string; status?: number }): boolean {
  const msg = (err.message ?? "").toLowerCase();
  if (msg.includes("user already registered") || msg.includes("already registered")) return true;
  if (err.status === 400 && msg.includes("already")) return true;
  return false;
}

interface AdminInviteViewProps {
  branchName?: string;
  token: string;
  encodedData: string;
  rawDataParam?: string;
}

export function AdminInviteView({
  branchName,
  token,
  encodedData,
  rawDataParam,
}: AdminInviteViewProps) {
  const { t } = useLocale();
  const scheme = process.env.NEXT_PUBLIC_APP_DEEPLINK_SCHEME || "cellarium";
  const iosUrl = process.env.NEXT_PUBLIC_IOS_STORE_URL || DEFAULT_IOS;
  const androidUrl = process.env.NEXT_PUBLIC_ANDROID_STORE_URL || DEFAULT_ANDROID;
  const deepLink = `${scheme}://qr/${rawDataParam ?? encodedData}`;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);
  const [showConfirmEmailScreen, setShowConfirmEmailScreen] = useState(false);

  const mapRpcError = useCallback(
    (errorCode: string): string => {
      const key = RPC_ERROR_KEYS[errorCode];
      return key ? t(key as keyof TranslationKeys) : t("adminInvite.errors.generic");
    },
    [t]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);

      const nameTrim = name.trim();
      const emailTrim = email.trim();
      const emailConfirmTrim = emailConfirm.trim();
      if (!nameTrim) {
        setErrorMessage(t("adminInvite.errors.generic"));
        return;
      }
      if (!emailTrim) {
        setErrorMessage(t("adminInvite.errors.generic"));
        return;
      }
      if (emailTrim !== emailConfirmTrim) {
        setErrorMessage(t("adminInvite.errors.email_mismatch"));
        return;
      }
      if (password.length < 6) {
        setErrorMessage(t("adminInvite.errors.generic"));
        return;
      }

      setLoading(true);
      try {
        const { error: signUpError } = await supabase.auth.signUp({
          email: emailTrim,
          password,
          options: {
            data: {
              name: nameTrim,
              ...(username.trim() ? { username: username.trim() } : {}),
            },
          },
        });

        if (signUpError) {
          if (isAlreadyRegisteredError(signUpError)) {
            setErrorMessage(t("adminInvite.errors.already_registered"));
            setLoading(false);
            return;
          }
          setErrorMessage(t("adminInvite.errors.generic"));
          if (process.env.NODE_ENV === "development" && signUpError.message) {
            setErrorMessage((prev) => `${prev} (${signUpError.message})`);
          }
          setLoading(false);
          return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          setShowConfirmEmailScreen(true);
          setLoading(false);
          return;
        }

        const { data: rpcData, error: rpcError } = await supabase.rpc("request_staff_access", {
          p_qr_token: token,
          p_name: nameTrim,
          p_username: username.trim() || null,
        });

        if (rpcError) {
          const payload = rpcData as { error?: string } | null;
          const msg =
            payload?.error != null
              ? mapRpcError(payload.error)
              : t("adminInvite.errors.generic");
          setErrorMessage(msg);
          setLoading(false);
          return;
        }

        const payload = rpcData as { ok?: boolean; error?: string };
        const ok = payload?.ok === true;
        const existingError = payload?.error;
        if (ok || existingError === "already_pending") {
          setRequestSent(true);
        } else if (existingError) {
          setErrorMessage(mapRpcError(existingError));
        } else {
          setErrorMessage(t("adminInvite.errors.generic"));
        }
      } catch {
        setErrorMessage(t("adminInvite.errors.generic"));
      } finally {
        setLoading(false);
      }
    },
    [token, name, username, email, emailConfirm, password, t, mapRpcError]
  );

  const openInApp = () => {
    if (typeof window !== "undefined") {
      window.location.href = deepLink;
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-wine-500 focus:outline-none focus:ring-1 focus:ring-wine-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white disabled:opacity-60";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

  if (requestSent) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <header className="sticky top-0 z-10 flex justify-end border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
          <LocaleToggle />
        </header>
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("adminInvite.requestSentTitle")}
            </h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
              {t("adminInvite.requestSentBody")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirmEmailScreen) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <header className="sticky top-0 z-10 flex justify-end border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
          <LocaleToggle />
        </header>
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("adminInvite.confirmEmailTitle")}
            </h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
              {t("adminInvite.confirmEmailBody")}
            </p>
            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
              {t("admin.storeHint")}
            </p>
            <div className="mt-2 flex justify-center gap-4">
              <button
                type="button"
                onClick={openInApp}
                className="text-sm font-medium text-wine-600 hover:underline dark:text-wine-400"
              >
                {t("admin.openInApp")}
              </button>
              <a href={iosUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-wine-600 hover:underline dark:text-wine-400">
                {t("admin.appStore")}
              </a>
              <a href={androidUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-wine-600 hover:underline dark:text-wine-400">
                {t("admin.playStore")}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 flex justify-end border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
        <LocaleToggle />
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wine-100 text-wine-600 dark:bg-wine-900/40 dark:text-wine-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("adminInvite.registerTitle")}
          </h1>
          {branchName ? (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t("admin.branchLabel")}: {branchName}
            </p>
          ) : null}
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
            {t("adminInvite.subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className={labelClass}>{t("adminInvite.nameLabel")}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className={inputClass}
                placeholder={t("adminInvite.nameLabel")}
              />
            </div>
            <div>
              <label className={labelClass}>{t("adminInvite.usernameLabel")}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className={inputClass}
                placeholder={t("adminInvite.usernameLabel")}
              />
            </div>
            <div>
              <label className={labelClass}>{t("adminInvite.emailLabel")}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className={inputClass}
                placeholder={t("adminInvite.emailLabel")}
              />
            </div>
            <div>
              <label className={labelClass}>{t("adminInvite.confirmEmailLabel")}</label>
              <input
                type="email"
                required
                value={emailConfirm}
                onChange={(e) => setEmailConfirm(e.target.value)}
                disabled={loading}
                className={inputClass}
                placeholder={t("adminInvite.confirmEmailLabel")}
              />
            </div>
            <div>
              <label className={labelClass}>{t("adminInvite.passwordLabel")}</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className={inputClass}
                placeholder={t("adminInvite.passwordLabel")}
              />
            </div>
            {errorMessage ? (
              <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-wine-600 px-4 py-3 text-sm font-medium text-white hover:bg-wine-700 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:ring-offset-2 disabled:opacity-70 dark:bg-wine-500 dark:hover:bg-wine-600"
            >
              {loading ? t("adminInvite.sending") : t("adminInvite.submit")}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
            {t("admin.storeHint")}
          </p>
          <div className="flex justify-center gap-4">
            <a href={iosUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-wine-600 hover:underline dark:text-wine-400">
              {t("admin.appStore")}
            </a>
            <a href={androidUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-wine-600 hover:underline dark:text-wine-400">
              {t("admin.playStore")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
