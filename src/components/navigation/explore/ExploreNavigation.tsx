import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ExploreMenuPanel } from "./components/ExploreMenuPanel";

const menuVariants: Variants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.67, 0],
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.02,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 10 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ExploreNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={navigationRef} className="relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-6">
        <button
          type="button"
          aria-expanded={isOpen}
          className="flex items-center gap-2 text-xl font-bold text-white transition-opacity hover:opacity-80"
          onClick={() => setIsOpen((current) => !current)}
        >
          Explore
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute left-0 top-full min-h-screen w-full overflow-hidden border-t border-white/10 bg-black"
          >
            <ExploreMenuPanel
              itemVariants={itemVariants}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
