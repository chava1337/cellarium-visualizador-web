import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/src/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Términos del servicio | Cellarium",
  description:
    "Términos y condiciones de uso del servicio Cellarium para establecimientos y usuarios.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Términos del servicio">
      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          1. Aceptación
        </h2>
        <p>
          El acceso y uso de Cellarium implica la aceptación de estos términos. Si no está de
          acuerdo, debe abstenerse de utilizar el servicio.
        </p>
        <p className="rounded-lg border border-dashed border-amber-200/80 bg-amber-50/50 p-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-100">
          <strong>[PLACEHOLDER LEGAL]</strong> Reemplazar por los términos contractuales finales
          (objeto del servicio, licencias, limitación de responsabilidad, ley aplicable,
          jurisdicción, etc.) redactados por asesoría legal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          2. Descripción del servicio
        </h2>
        <p>
          Cellarium es una plataforma SaaS orientada a restaurantes y establecimientos,
          incluyendo funcionalidades de catálogo, inventario y experiencia para comensales,
          según el plan contratado.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          3. Uso permitido
        </h2>
        <p>
          El usuario se compromete a utilizar el servicio de conformidad con la legislación
          aplicable y las políticas publicadas por Cellarium.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          [Condiciones específicas de uso: pendiente de copy legal final.]
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          4. Contacto
        </h2>
        <p>
          Consulte la página de{" "}
          <Link href="/support" className="font-medium text-wine-800 underline dark:text-wine-400">
            Soporte
          </Link>{" "}
          para canales de contacto oficiales.
        </p>
      </section>
    </LegalPageShell>
  );
}
