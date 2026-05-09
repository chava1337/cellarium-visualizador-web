"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/landing/screenshots/menu-muestra.png", alt: "Cellarium: menú digital de muestra" },
  { src: "/landing/screenshots/inventario.png", alt: "Cellarium: inventario" },
  { src: "/landing/screenshots/generacion-qr.png", alt: "Cellarium: generación de código QR" },
] as const;

const ROTATE_MS = 4800;

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
      className="relative mx-auto w-full max-w-[min(100%,360px)] select-none sm:max-w-[400px] lg:max-w-[min(100%,460px)]"
      aria-roledescription="carrusel"
      aria-label="Capturas de la aplicación Cellarium"
    >
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#c9a962]/18 via-wine-900/20 to-transparent blur-2xl sm:-inset-5" />
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 mb-4 flex h-9 items-center justify-center sm:mb-5 sm:h-10">
          <Image
            src="/landing/branding/cellarium-logo.png"
            alt="Cellarium"
            width={160}
            height={40}
            className="h-7 w-auto max-h-8 object-contain opacity-95 sm:h-8 sm:max-h-9"
            priority
          />
        </div>
        <div className="relative w-full rounded-[1.35rem] border border-[#c9a962]/30 bg-gradient-to-b from-[#1a1216] to-[#0d080a] p-[3px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(201,169,98,0.12)] sm:rounded-[1.5rem] sm:p-1">
          <div className="overflow-hidden rounded-[1.2rem] bg-[#0a0608] ring-1 ring-white/[0.06] sm:rounded-[1.35rem]">
            <div className="relative aspect-[10/19] w-full sm:aspect-[10/18]">
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
                    sizes="(max-width: 640px) min(100vw - 2rem, 360px), (max-width: 1024px) 400px, 460px"
                    className="object-contain object-center p-1 sm:p-1.5"
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
