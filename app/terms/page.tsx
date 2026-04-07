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
    <LegalPageShell title="Términos del servicio" lastUpdatedPlaceholder={false}>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Última actualización: marzo de 2026
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          1. Aceptación
        </h2>
        <p>
          Al registrarse, acceder o utilizar Cellarium, usted acepta estos Términos del servicio.
          Si no está de acuerdo, no debe utilizar la plataforma. El uso continuado tras cambios
          publicados implica la aceptación de las versiones actualizadas, salvo disposición en
          contrario.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          2. Descripción del servicio
        </h2>
        <p>
          Cellarium es un <strong className="text-gray-900 dark:text-white">software como
          servicio (SaaS)</strong> orientado a restaurantes y establecimientos, que incluye, según
          el plan contratado, funcionalidades como catálogo de vinos y coctelería, inventario,
          reportes, gestión multi-sucursal y experiencia para comensales (por ejemplo, visualización
          de menú mediante QR o enlaces web). Las funciones exactas dependen de su suscripción y de
          la versión del producto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          3. Cuentas de usuario
        </h2>
        <p>
          Usted es responsable de la exactitud de la información que proporciona, de mantener la
          confidencialidad de sus credenciales y de toda actividad realizada bajo su cuenta. Debe
          notificarnos de inmediato cualquier uso no autorizado.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          4. Suscripciones y pagos
        </h2>
        <p>
          Cellarium puede ofrecer planes de suscripción, incluyendo niveles como{" "}
          <strong className="text-gray-900 dark:text-white">Pro</strong> y{" "}
          <strong className="text-gray-900 dark:text-white">Business</strong>, con características
          y precios descritos en el momento de la contratación. Los pagos recurrentes se procesan
          a través de nuestro proveedor de pagos (Stripe), según el ciclo de facturación elegido.
        </p>
        <p>
          Los importes, impuestos aplicables y condiciones de facturación se le comunicarán antes
          de confirmar la compra o renovación.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          5. Cancelación
        </h2>
        <p>
          Puede <strong className="text-gray-900 dark:text-white">cancelar su suscripción en
          cualquier momento</strong> según las opciones disponibles en la aplicación o en el portal
          de facturación gestionado por Stripe, según corresponda a su contratación.
        </p>
        <p>
          Tras la cancelación, conservará el acceso a las funciones pagadas{" "}
          <strong className="text-gray-900 dark:text-white">hasta el final del periodo de
          facturación ya abonado</strong>, salvo que la ley o las condiciones particulares del plan
          establezcan otra cosa.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          6. Limitación de responsabilidad
        </h2>
        <p>
          En la medida permitida por la ley aplicable, Cellarium no será responsable de daños
          indirectos, lucro cesante, pérdida de datos o perjuicios derivados del uso o la
          imposibilidad de uso del servicio. El servicio se ofrece &quot;tal cual&quot; y según
          disponibilidad; no garantizamos un funcionamiento ininterrumpido o libre de errores.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          7. Uso indebido
        </h2>
        <p>
          Queda prohibido utilizar Cellarium de forma que vulnere la ley, los derechos de terceros
          o la seguridad de la plataforma; incluye, entre otros, accesos no autorizados,
          ingeniería inversa indebida, distribución de malware o uso del servicio para actividades
          fraudulentas. Podemos suspender o terminar cuentas que incumplan estos términos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          8. Cambios en los términos
        </h2>
        <p>
          Podemos modificar estos términos publicando una versión actualizada en este sitio. Le
          recomendamos revisarlos periódicamente. El uso continuado del servicio tras la entrada
          en vigor de los cambios constituye su aceptación, salvo que la ley exija otro procedimiento.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          9. Operador del servicio
        </h2>
        <p>
          Cellarium es operado por <strong className="text-gray-900 dark:text-white">Noirsong Studios</strong>.
        </p>
        <p>
          <strong className="text-gray-900 dark:text-white">Ubicación:</strong> México
        </p>
        <p>
          <strong className="text-gray-900 dark:text-white">Contacto:</strong>{" "}
          <a
            href="mailto:noirsongstudios@gmail.com"
            className="font-medium text-wine-800 underline dark:text-wine-400"
          >
            noirsongstudios@gmail.com
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          10. Contacto
        </h2>
        <p>
          Para consultas sobre estos términos:{" "}
          <a
            href="mailto:noirsongstudios@gmail.com"
            className="font-medium text-wine-800 underline dark:text-wine-400"
          >
            noirsongstudios@gmail.com
          </a>
        </p>
        <p>
          Información general de soporte:{" "}
          <Link href="/support" className="font-medium text-wine-800 underline dark:text-wine-400">
            Soporte
          </Link>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
