import type { Metadata } from "next";
import { LandingClientExperience } from "@/src/components/landing/LandingClientExperience";
import { LandingFinalCta } from "@/src/components/landing/LandingFinalCta";
import { LandingHero } from "@/src/components/landing/LandingHero";
import { LandingManagementSection } from "@/src/components/landing/LandingManagementSection";
import { LandingPersonalizationSection } from "@/src/components/landing/LandingPersonalizationSection";
import { LandingSiteFooter } from "@/src/components/landing/LandingSiteFooter";
import { LandingValueSection } from "@/src/components/landing/LandingValueSection";
import { getLandingStoreUrls } from "@/src/components/landing/storeUrls";

const ogTitle = "Cellarium | Catálogo digital premium para restaurantes";
const ogDescription =
  "Crea catálogos digitales de vinos y cocteles, menús QR, inventario, staff y sucursales desde una app diseñada para restaurantes modernos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cellarium.net"),
  title: ogTitle,
  description: ogDescription,
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: "website",
    siteName: "Cellarium",
    locale: "es",
  },
  twitter: {
    card: "summary",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function HomePage() {
  const { androidUrl, iosUrl } = getLandingStoreUrls();

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 antialiased dark:bg-[#0e080b] dark:text-stone-100">
      <LandingHero androidUrl={androidUrl} iosUrl={iosUrl} />
      <LandingValueSection />
      <LandingClientExperience />
      <LandingManagementSection />
      <LandingPersonalizationSection />
      <LandingFinalCta androidUrl={androidUrl} iosUrl={iosUrl} />
      <LandingSiteFooter />
    </div>
  );
}
