import { useRef, useState } from "react";
import { heroSocialLinks } from "../home.data";

function SocialButton({ label, Icon }: { label: string; Icon: React.ElementType }) {
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
      aria-label={label}
      className="liquid-glass relative overflow-hidden rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
      type="button"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.25), transparent 50%)`,
        }}
      />
      <span className="relative z-10 block">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    </button>
  );
}

export function HeroSocialLinks() {
  return (
    <div className="relative z-10 flex justify-center gap-4 pb-12">
      {heroSocialLinks.map(({ label, Icon }) => (
        <SocialButton key={label} label={label} Icon={Icon} />
      ))}
    </div>
  );
}
