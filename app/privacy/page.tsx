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
    <LegalPageShell title="Política de privacidad" lastUpdatedPlaceholder={false}>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Última actualización: marzo de 2026
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          1. Introducción
        </h2>
        <p>
          Cellarium (&quot;nosotros&quot;, &quot;el servicio&quot;) es una plataforma de software
          para restaurantes. Esta política describe cómo tratamos la información personal cuando
          utiliza la aplicación móvil, el sitio web (incluido el visualizador de menú para
          comensales) y los servicios asociados.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          2. Datos que recopilamos
        </h2>
        <p>Según el uso que haga del servicio, podemos tratar, entre otros:</p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            <strong className="text-gray-900 dark:text-white">Correo electrónico</strong>, para
            crear y recuperar su cuenta, comunicaciones del servicio y soporte.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Datos de cuenta</strong>, como
            nombre de usuario o perfil, credenciales de acceso de forma segura y preferencias
            asociadas a su perfil.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Datos del negocio</strong>, como
            información del establecimiento, sucursales, catálogo (vinos, coctelería), inventario
            y datos operativos que usted introduce en la plataforma.
          </li>
          <li>
            Datos técnicos necesarios para el funcionamiento del servicio (por ejemplo,
            identificadores de sesión o registros técnicos acotados), según la configuración del
            producto.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          3. Finalidad del uso de los datos
        </h2>
        <p>Utilizamos la información para:</p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            <strong className="text-gray-900 dark:text-white">Operación del servicio:</strong>{" "}
            prestar las funcionalidades de Cellarium (catálogo, inventario, reportes, experiencia
            para comensales, etc.).
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Gestión de cuentas:</strong>{" "}
            autenticación, facturación cuando corresponda, soporte y mejora de la experiencia de
            uso.
          </li>
          <li>Cumplimiento de obligaciones legales aplicables.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          4. Encargados y proveedores
        </h2>
        <p>
          Para prestar el servicio confiamos en proveedores que procesan datos en nuestro nombre:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            <strong className="text-gray-900 dark:text-white">Supabase</strong> — alojamiento de
            base de datos, autenticación y funciones de backend según la arquitectura del
            producto.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Stripe</strong> — procesamiento de
            pagos y gestión de suscripciones cuando contrate planes de pago.
          </li>
        </ul>
        <p>
          Estos proveedores están sujetos a sus propias políticas de privacidad y medidas de
          seguridad. Le recomendamos revisar la documentación de Supabase y Stripe para más
          detalle.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          5. Pagos
        </h2>
        <p>
          Los pagos y datos de tarjeta se procesan a través de{" "}
          <strong className="text-gray-900 dark:text-white">Stripe</strong>. Cellarium no almacena
          el número completo de su tarjeta en sus sistemas; la captura y el almacenamiento seguro
          de datos de pago corresponden a Stripe conforme a su normativa PCI y políticas.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          6. Eliminación de cuenta
        </h2>
        <p>
          Puede solicitar la eliminación de su cuenta o gestionar opciones relacionadas desde la
          <strong className="text-gray-900 dark:text-white"> aplicación móvil Cellarium</strong>,
          según las opciones disponibles en su versión del producto. Si necesita ayuda, contacte
          con soporte en la dirección indicada al final de esta política.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          7. Seguridad
        </h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger la información
          frente a accesos no autorizados, pérdida o alteración. Ningún sistema es infalible; si
          detecta un incidente relacionado con su cuenta, notifíquenos de inmediato.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          8. Sus derechos
        </h2>
        <p>
          Según su jurisdicción, puede tener derecho a acceder, rectificar, suprimir u oponerse al
          tratamiento de sus datos personales. Para ejercerlos, escríbanos al correo indicado
          abajo. Responderemos en un plazo razonable.
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
          10. Contacto (privacidad)
        </h2>
        <p>
          Para consultas sobre esta política o el tratamiento de datos personales:
        </p>
        <p>
          <a
            href="mailto:noirsongstudios@gmail.com"
            className="font-medium text-wine-800 underline dark:text-wine-400"
          >
            noirsongstudios@gmail.com
          </a>
        </p>
        <p>
          También puede visitar la página de{" "}
          <Link href="/support" className="font-medium text-wine-800 underline dark:text-wine-400">
            Soporte
          </Link>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
