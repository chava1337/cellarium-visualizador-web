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
          Cellarium es una plataforma SaaS para restaurantes: catálogo de vinos y coctelería,
          inventario, reportes y experiencia para comensales. Si necesita ayuda con su cuenta o
          el uso del servicio, utilice los datos de contacto siguientes.
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
                href="mailto:support@cellarium.net"
                className="font-medium text-wine-800 underline decoration-wine-300 underline-offset-2 hover:text-wine-700 dark:text-wine-400 dark:hover:text-wine-300"
              >
                support@cellarium.net
              </a>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                [Confirmar dirección operativa en producción]
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tiempo de respuesta orientativo
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              Respuesta habitual en un plazo de{" "}
              <strong className="font-medium text-gray-900 dark:text-white">
                24 a 48 horas hábiles
              </strong>
              , según volumen y complejidad de la solicitud.
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Sobre Cellarium
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              Este sitio web incluye el visualizador de menú para comensales y la documentación
              pública de Cellarium. Para incidencias técnicas o comerciales, el canal preferente
              es el correo de soporte indicado arriba.
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
        <p>
          <span className="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">
            [PLACEHOLDER]
          </span>{" "}
          Añadir aquí, si aplica, horario de atención, idiomas y enlace a estado del servicio
          (status page).
        </p>
      </section>
    </LegalPageShell>
  );
}
