import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, ChevronDown } from "lucide-react";
import {
  exploreLinks,
  featuredExploreCards,
} from "./exploreNavigation.data";

export function ExploreNavigation() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exploreRef.current &&
        !exploreRef.current.contains(event.target as Node)
      ) {
        setIsExploreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 z-50 w-full bg-black px-10 py-6"
      ref={exploreRef}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <button
              aria-expanded={isExploreOpen}
              className="flex items-center gap-2 text-xl font-bold text-white transition-opacity hover:opacity-80"
              onClick={() => setIsExploreOpen((current) => !current)}
              type="button"
            >
              Explore
              <motion.div
                animate={{ rotate: isExploreOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExploreOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-full w-full overflow-hidden border-t border-white/10 bg-black"
          >
            <div className="mx-auto flex max-w-7xl px-10 py-12">
              <div className="flex w-1/4 flex-col gap-5 border-r border-white/10 pr-8">
                {exploreLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[15px] font-medium text-white transition-colors hover:text-white/70"
                    onClick={() => setIsExploreOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="w-3/4 pl-12">
                <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white/50">
                  FEATURED
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  {featuredExploreCards.map((card) => (
                    <article
                      key={card.title}
                      className="group flex cursor-pointer flex-col"
                    >
                      <div className="relative mb-4 aspect-square overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="mb-3 text-xs font-bold tracking-[0.1em] text-white">
                        {card.readTime}
                      </div>
                      <h4 className="mb-4 text-xl font-bold leading-tight text-white group-hover:underline">
                        {card.title}
                      </h4>
                      <div className="mt-auto flex items-center text-xs font-bold tracking-wider text-white/70">
                        <Bookmark className="mr-2 h-4 w-4" />
                        {card.type}
                        <span className="ml-4">{card.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
