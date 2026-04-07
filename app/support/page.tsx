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

      <section className="space-y-4 rounded-xl border border-gray-200/90 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/50">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Cómo eliminar tu cuenta
        </h2>
        <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
          Si deseas eliminar tu cuenta de usuario de Cellarium, sigue estos pasos desde la
          aplicación:
        </p>
        <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            Entra al <strong className="text-gray-900 dark:text-white">panel administrativo</strong>{" "}
            de Cellarium.
          </li>
          <li>
            Abre el apartado de{" "}
            <strong className="text-gray-900 dark:text-white">gestión de cuenta</strong>.
          </li>
          <li>
            Pulsa en <strong className="text-gray-900 dark:text-white">Eliminar cuenta</strong>{" "}
            (o la opción equivalente que muestre la app).
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Confirma</strong> la acción cuando
            el sistema te lo solicite para completar el proceso.
          </li>
        </ol>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Si no encuentras la opción o necesitas ayuda, escríbenos a{" "}
          <a
            href="mailto:noirsongstudios@gmail.com"
            className="font-medium text-wine-800 underline dark:text-wine-400"
          >
            noirsongstudios@gmail.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
