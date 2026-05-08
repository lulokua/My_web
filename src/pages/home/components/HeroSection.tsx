import { useRef } from "react";
import { HOME_HERO_VIDEO } from "@/shared/constants/media";
import { HeroSocialLinks } from "./HeroSocialLinks";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        src={HOME_HERO_VIDEO}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        onCanPlay={() => videoRef.current?.play().catch(() => undefined)}
      />

      <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center md:-translate-y-[10%] lg:-translate-y-[5%]">
        <div className="flex w-full max-w-4xl flex-col items-center gap-8">
          <h1 className="whitespace-nowrap text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Born to <em className="italic">Explore</em>.
          </h1>

          <button
            className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            type="button"
          >
            了解更多
          </button>
        </div>
      </div>

      <HeroSocialLinks />
    </section>
  );
}
