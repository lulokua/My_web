"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { Accessibility, Code, Cpu, Globe, Layers, Palette, Shield, Zap, ChevronDown } from "lucide-react";

import type { Dictionary } from "@/content/i18n";

type CoreExperienceProps = {
  dictionary: Dictionary["core"];
};

const GlowCard = ({ children, className = "", color = "blue" }: { children: React.ReactNode; className?: string; color?: string }) => {
  const glowColors: Record<string, string> = {
    blue: "from-blue-500/20 to-cyan-500/5",
    purple: "from-purple-500/20 to-fuchsia-500/5",
    pink: "from-pink-500/20 to-rose-500/5",
    emerald: "from-emerald-500/20 to-teal-500/5",
    rose: "from-rose-500/20 to-red-500/5",
    amber: "from-amber-500/20 to-orange-500/5",
    sky: "from-sky-500/20 to-blue-500/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-12 transition-transform duration-500 hover:-translate-y-2 ${className}`}
    >
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${glowColors[color]} blur-[60px] transition-opacity duration-500 group-hover:opacity-100 opacity-50`} />
      <div className={`absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr ${glowColors[color]} blur-[60px] transition-opacity duration-500 group-hover:opacity-100 opacity-20`} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default function CoreExperience({ dictionary }: CoreExperienceProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.9]);

  const perfRef = useRef<HTMLDivElement>(null);
  const isPerfInView = useInView(perfRef, { once: true, margin: "-100px" });
  const [displayNumber, setDisplayNumber] = useState(0);
  const targetNumber = parseInt(dictionary.performance.highlight.replace(/\D/g, "")) || 15;
  const suffix = dictionary.performance.highlight.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isPerfInView) {
      const controls = animate(0, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayNumber(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isPerfInView, targetNumber]);

  return (
    <div className="bg-black text-white selection:bg-white/30 font-sans">
      <section ref={heroRef} className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/30 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-purple-900/30 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-pink-900/20 blur-[120px] mix-blend-screen" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </span>
            {dictionary.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text pb-4 text-7xl font-bold tracking-tighter text-transparent sm:text-9xl lg:text-[11rem] leading-[0.9]"
          >
            {dictionary.productName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-2xl font-light tracking-tight text-white/60 sm:text-3xl"
          >
            {dictionary.heroDescription}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/40"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">{dictionary.scrollHint}</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </section>

      <section ref={perfRef} className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-24">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
         <div className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl">
            <motion.div
               initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
               whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
               viewport={{ once: true }}
               transition={{ type: "spring", stiffness: 40, damping: 20 }}
               className="bg-gradient-to-b from-white to-white/20 bg-clip-text text-[8rem] sm:text-[14rem] lg:text-[18rem] font-bold leading-none tracking-tighter text-transparent"
            >
               {displayNumber}{suffix}
            </motion.div>
            <motion.div
               initial={{ y: 30, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="mt-8 flex flex-col items-center"
            >
               <div className="mb-6 flex items-center justify-center rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-500/20">
                  <Zap className="h-8 w-8 text-blue-400" />
               </div>
               <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{dictionary.performance.title}</h2>
               <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/60 sm:text-2xl">
                  {dictionary.performance.leadBefore}
                  <span className="text-white font-medium">{dictionary.performance.highlight}</span>
                  {dictionary.performance.leadAfter}
               </p>
               <p className="mt-6 max-w-3xl text-lg text-white/40">{dictionary.performance.body}</p>
            </motion.div>
         </div>
      </section>

      <section className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GlowCard color="emerald" className="md:col-span-2 flex flex-col justify-between">
              <div>
                 <div className="mb-6 inline-flex rounded-2xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
                    <Code className="h-8 w-8 text-emerald-400" />
                 </div>
                 <h3 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{dictionary.developerExperience.title}</h3>
              </div>
              <div className="mt-12">
                 <div className="mb-4 text-5xl sm:text-7xl font-bold tracking-tighter bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {dictionary.developerExperience.highlight}
                 </div>
                 <p className="max-w-xl text-xl font-medium leading-relaxed text-white/80">
                    {dictionary.developerExperience.leadBefore}
                    <span className="text-emerald-400">{dictionary.developerExperience.highlight}</span>
                    {dictionary.developerExperience.leadAfter}
                 </p>
                 <p className="mt-4 max-w-xl text-white/50 leading-relaxed">{dictionary.developerExperience.body}</p>
              </div>
            </GlowCard>

            <GlowCard color="pink" className="col-span-1 flex flex-col">
              <div className="mb-6 inline-flex rounded-2xl bg-pink-500/10 p-3 ring-1 ring-pink-500/20">
                 <Layers className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="mb-4 text-4xl font-bold tracking-tight">
                <span className="block text-white/40">{dictionary.native.titleLine1}</span>
                {dictionary.native.titleLine2}
              </h3>
              <p className="mt-auto pt-12 text-lg text-white/50 leading-relaxed">{dictionary.native.body}</p>
            </GlowCard>

            <div className="md:col-span-2 lg:col-span-3">
              <GlowCard color="purple" className="flex flex-col xl:flex-row gap-12 items-start xl:items-center">
                <div className="xl:w-1/3">
                  <div className="mb-6 inline-flex rounded-2xl bg-purple-500/10 p-3 ring-1 ring-purple-500/20">
                     <Cpu className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-4xl font-bold tracking-tight sm:text-6xl">{dictionary.architecture.title}</h3>
                </div>
                <div className="xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  {dictionary.architecture.cards.map((card, idx) => (
                     <div key={idx} className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-colors hover:bg-white/10">
                        {idx === 0 ? <Layers className="mb-5 h-8 w-8 text-purple-400" /> : <Globe className="mb-5 h-8 w-8 text-pink-400" />}
                        <h4 className="mb-3 text-2xl font-semibold text-white">{card.title}</h4>
                        <p className="text-base leading-relaxed text-white/50">{card.body}</p>
                     </div>
                  ))}
                </div>
              </GlowCard>
            </div>

            <GlowCard color="rose" className="col-span-1">
              <div className="mb-6 inline-flex rounded-2xl bg-rose-500/10 p-3 ring-1 ring-rose-500/20">
                 <Shield className="h-8 w-8 text-rose-400" />
              </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tight">{dictionary.security.title}</h3>
              <p className="text-white/50 leading-relaxed">{dictionary.security.body}</p>
            </GlowCard>

            <GlowCard color="sky" className="col-span-1">
              <div className="mb-6 inline-flex rounded-2xl bg-sky-500/10 p-3 ring-1 ring-sky-500/20">
                 <Palette className="h-8 w-8 text-sky-400" />
              </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tight">{dictionary.design.title}</h3>
              <p className="text-white/50 leading-relaxed">{dictionary.design.body}</p>
            </GlowCard>

            <GlowCard color="amber" className="col-span-1">
              <div className="mb-6 inline-flex rounded-2xl bg-amber-500/10 p-3 ring-1 ring-amber-500/20">
                 <Accessibility className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tight">
                <span className="block text-white/40">{dictionary.accessibility.titleLine1}</span>
                {dictionary.accessibility.titleLine2}
              </h3>
              <p className="text-white/50 leading-relaxed">{dictionary.accessibility.body}</p>
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[60vh] items-center justify-center px-4 py-32 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.1),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center"
        >
          <h2 className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-6xl font-bold tracking-tighter text-transparent sm:text-8xl lg:text-9xl">
            {dictionary.finalTitle}
          </h2>
        </motion.div>
        <div className="absolute bottom-8 left-0 w-full text-center text-xs tracking-widest text-white/30">
          {dictionary.disclaimer}
        </div>
      </section>
    </div>
  );
}
