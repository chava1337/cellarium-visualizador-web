import type { Metadata } from "next";
import "@/app/globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
