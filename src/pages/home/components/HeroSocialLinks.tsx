import { heroSocialLinks } from "../home.data";

export function HeroSocialLinks() {
  return (
    <div className="relative z-10 flex justify-center gap-4 pb-12">
      {heroSocialLinks.map(({ label, Icon }) => (
        <button
          key={label}
          aria-label={label}
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          type="button"
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
