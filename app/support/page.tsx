import type { Metadata } from "next";
import { LegalPageShell } from "@/src/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Soporte | Cellarium",
  description:
    "Contacto y soporte para usuarios de Cellarium — plataforma para restaurantes y comensales.",
  robots: { index: true, follow: true },
};

export default function SupportPage() {
  return (
    <LegalPageShell title="Soporte" lastUpdatedPlaceholder={false}>
      <section className="space-y-4">
        <p className="text-base text-gray-700 dark:text-gray-300">
          El equipo de Cellarium ofrece soporte a establecimientos y usuarios de la plataforma
          (cuentas, facturación, uso del catálogo, inventario y aplicación móvil). Este canal no
          sustituye a la emergencias del establecimiento; para incidencias de seguridad o salud,
          contacte a los servicios locales correspondientes.
        </p>
      </section>

      <section className="space-y-3 rounded-xl border border-gray-200/90 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/50">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Contacto
        </h2>
        <dl className="space-y-4 text-[15px]">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Correo de soporte
            </dt>
            <dd className="mt-1">
              <a
                href="mailto:noirsongstudios@gmail.com"
                className="font-medium text-wine-800 underline decoration-wine-300 underline-offset-2 hover:text-wine-700 dark:text-wine-400 dark:hover:text-wine-300"
              >
                noirsongstudios@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tiempo de respuesta
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              Objetivo de respuesta en{" "}
              <strong className="font-medium text-gray-900 dark:text-white">
                24 a 48 horas
              </strong>{" "}
              (días hábiles), según volumen y complejidad de la solicitud.
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Sobre Cellarium
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              Cellarium es una plataforma SaaS para restaurantes. Este sitio incluye el visualizador
              web del menú para comensales y la documentación pública. Para cuentas de
              establecimiento, facturación o la app móvil, use el correo de soporte indicado arriba.
            </dd>
          </div>
        </dl>
      </section>
    </LegalPageShell>
  );
}
