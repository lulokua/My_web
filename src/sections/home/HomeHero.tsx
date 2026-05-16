import type { Dictionary } from "@/content/i18n";

type HomeHeroProps = {
  dictionary: Dictionary["home"];
};

export default function HomeHero({ dictionary }: HomeHeroProps) {
  return (
    <div className="relative w-full bg-black">
      <div className="flex h-[calc(100dvh-64px)] w-full items-center justify-center bg-[url('https://my-blog.cn-nb1.rains3.com/My_web/index_phone.png')] bg-cover bg-center bg-no-repeat px-6 sm:h-[calc(100dvh-84px)] sm:bg-[url('https://my-blog.cn-nb1.rains3.com/My_web/index.png')]">
        <h1 className="font-anthropic flex flex-col items-center gap-2 text-center text-4xl tracking-widest text-white drop-shadow-2xl sm:flex-row sm:gap-1 sm:text-6xl md:gap-8 md:text-8xl">
          <span>{dictionary.heroLine1}</span>
          <span>{dictionary.heroLine2}</span>
        </h1>
      </div>
    </div>
  );
}
