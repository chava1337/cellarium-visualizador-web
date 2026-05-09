"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/landing/screenshots/menu-muestra.png", alt: "Cellarium: menú digital de muestra" },
  { src: "/landing/screenshots/inventario.png", alt: "Cellarium: inventario" },
  { src: "/landing/screenshots/generacion-qr.png", alt: "Cellarium: generación de código QR" },
] as const;

const ROTATE_MS = 4800;

/**
 * Carrusel solo de screenshots: marco fijo de altura, object-contain para no deformar.
 */
export function LandingHeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full min-w-0 max-w-5xl select-none"
      aria-roledescription="carrusel"
      aria-label="Capturas de la aplicación Cellarium"
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-b from-[#c9a962]/14 via-wine-900/15 to-transparent blur-3xl sm:-inset-10"
        aria-hidden
      />
      <div className="relative mx-auto w-full rounded-[1.35rem] border border-[#c9a962]/22 bg-gradient-to-b from-[#1c1418] to-[#0c080a] p-[2px] shadow-[0_28px_60px_-18px_rgba(0,0,0,0.75),0_0_0_1px_rgba(201,169,98,0.08)] sm:rounded-[1.6rem] sm:p-[3px]">
        <div className="overflow-hidden rounded-[1.25rem] bg-[#050304] ring-1 ring-white/[0.05] sm:rounded-[1.45rem]">
          <div className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5 md:px-7 md:pb-6 md:pt-6">
            {/* Misma caja para todas las slides: altura fija por breakpoint, ancho 100% */}
            <div className="relative h-[300px] w-full sm:h-[360px] md:h-[420px] lg:h-[480px]">
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
                    i === active
                      ? "z-[1] opacity-100"
                      : "pointer-events-none z-0 opacity-0"
                  }`}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) min(100vw - 2.5rem, 1024px), (max-width: 1024px) min(90vw, 1024px), 1024px"
                    className="object-contain object-center"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
