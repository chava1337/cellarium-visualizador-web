import type { Metadata } from "next";
import "@/app/globals.css";
import { LocaleProvider } from "@/src/i18n/LocaleContext";

export const metadata: Metadata = {
  title: "Menú de vinos | Cellarium",
  description: "Visualiza el menú de vinos del establecimiento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
