"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed bottom-0 right-0 top-0 z-[100] w-[3px] bg-white/10">
      <motion.div
        className="h-full w-full origin-top bg-white/80"
        style={{ scaleY }}
      />
    </div>
  );
}
