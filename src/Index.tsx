import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  Camera,
  Globe,
  MessageCircle,
  ChevronDown,
  Calendar,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Bookmark,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_VIDEO =
  "https://my-blog.cn-nb1.rains3.com/My_web/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export default function Index() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true, // Enable for mobile/touch devices
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-black">
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          src={HERO_VIDEO}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          onCanPlay={() => videoRef.current?.play().catch(() => undefined)}
        />

        <nav className="fixed top-0 z-50 w-full bg-black px-10 py-6" ref={exploreRef}>
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-xl font-bold text-white transition-opacity hover:opacity-80"
                  onClick={() => setIsExploreOpen(!isExploreOpen)}
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
                    {[
                      "Home",
                      "Missions",
                      "Humans in Space",
                      "Earth",
                      "The Solar System",
                      "The Universe",
                      "Science",
                      "Aeronautics",
                      "Technology",
                      "Learning Resources",
                      "About NASA",
                      "Español"
                    ].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                        className="text-[15px] font-medium text-white transition-colors hover:text-white/70"
                        onClick={() => setIsExploreOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </div>

                  <div className="w-3/4 pl-12">
                    <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white/50">
                      FEATURED
                    </h3>
                    <div className="grid grid-cols-3 gap-8">
                      {[
                        {
                          image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1000",
                          readTime: "4 MIN READ",
                          title: "For NASA's TESS, Stellar Eclipses Shed Light on Possible New Worlds",
                          type: "ARTICLE",
                          date: "3 DAYS AGO"
                        },
                        {
                          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
                          readTime: "6 MIN READ",
                          title: "650 NASA Volunteers Have Co-Authored Scientific Papers",
                          type: "ARTICLE",
                          date: "2 DAYS AGO"
                        },
                        {
                          image: "https://images.unsplash.com/photo-1532664189809-02133fee6988?auto=format&fit=crop&q=80&w=1000",
                          readTime: "3 MIN READ",
                          title: "What's Up: May 2026 Skywatching Tips from NASA",
                          type: "ARTICLE",
                          date: "7 DAYS AGO"
                        }
                      ].map((card, i) => (
                        <div key={i} className="group flex cursor-pointer flex-col">
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div className="relative z-10 flex flex-1 -translate-y-[20%] md:-translate-y-[10%] lg:-translate-y-[5%] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex w-full max-w-4xl flex-col items-center gap-8">
            <h1
              className="whitespace-nowrap text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
            >
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

        <div className="relative z-10 flex justify-center gap-4 pb-12">
          {[
            { label: "Instagram", Icon: Camera },
            { label: "Twitter", Icon: MessageCircle },
            { label: "Website", Icon: Globe },
          ].map(({ label, Icon }) => (
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
      </section>

    </main>
  );
}
