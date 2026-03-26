import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/src/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Política de privacidad | Cellarium",
  description:
    "Política de privacidad del servicio Cellarium para establecimientos y comensales.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Política de privacidad">
      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          1. Introducción
        </h2>
        <p>
          Cellarium (&quot;nosotros&quot;, &quot;el servicio&quot;) se compromete a proteger la
          privacidad de los usuarios de nuestra plataforma. Este documento describe de forma
          general cómo tratamos la información en el contexto del visualizador web del menú y
          servicios relacionados.
        </p>
        <p className="rounded-lg border border-dashed border-amber-200/80 bg-amber-50/50 p-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-100">
          <strong>[PLACEHOLDER LEGAL]</strong> Sustituir este texto y las secciones siguientes por
          la política de privacidad definitiva revisada por asesoría legal, incluyendo bases
          legales, derechos ARCO o equivalentes, transferencias internacionales y contacto del
          responsable del tratamiento.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          2. Datos que podemos tratar
        </h2>
        <p>
          De forma orientativa, el servicio puede tratar identificadores técnicos, datos de uso
          del sitio y, cuando corresponda, información proporcionada por el establecimiento o
          el usuario al utilizar funciones concretas de la plataforma.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          [Detalle específico: pendiente de copy legal final.]
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          3. Finalidades
        </h2>
        <p>
          Las finalidades incluirán, entre otras, la prestación del servicio SaaS para
          restaurantes, la mejora de la experiencia del comensal y el cumplimiento de obligaciones
          legales aplicables.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          4. Contacto
        </h2>
        <p>
          Para ejercer derechos o resolver dudas sobre privacidad, utilice los canales indicados
          en la página de{" "}
          <Link href="/support" className="font-medium text-wine-800 underline dark:text-wine-400">
            Soporte
          </Link>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
