import { useRef, useState } from "react";
import { HOME_HERO_IMAGE } from "@/shared/constants/media";
import { HeroSocialLinks } from "./HeroSocialLinks";

function LearnMoreButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="liquid-glass relative overflow-hidden rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
      type="button"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.25), transparent 50%)`,
        }}
      />
      <span className="relative z-10">Learn More</span>
    </button>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <img
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        src={HOME_HERO_IMAGE}
        alt="Hero Background"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center translate-y-8 md:translate-y-12 lg:translate-y-16">
        <div className="flex w-full max-w-4xl flex-col items-center gap-8">
          <h1 className="whitespace-nowrap text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Born to <em className="italic">Explore</em>.
          </h1>

          <LearnMoreButton />
        </div>
      </div>

      <HeroSocialLinks />
    </section>
  );
}
