"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Zap, Layers, Cpu, Globe, Code, Shield } from "lucide-react";
import Link from "next/link";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

interface CoreClientProps {
  locale: Locale;
  dictionary: {
    backHome: string;
    title: string;
    subtitle: string;
  };
}

export default function CoreClient({ locale, dictionary }: CoreClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero Section Animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const heroVisibility = useTransform(scrollYProgress, (pos) => pos > 0.1 ? "hidden" : "visible");

  // Section 1: Performance
  const perfOpacity = useTransform(scrollYProgress, [0.1, 0.175, 0.25], [0, 1, 0]);
  const perfY = useTransform(scrollYProgress, [0.1, 0.175, 0.25], [50, 0, -50]);
  const perfScale = useTransform(scrollYProgress, [0.1, 0.175, 0.25], [0.8, 1, 1.1]);
  const perfVisibility = useTransform(scrollYProgress, (pos) => pos < 0.1 || pos > 0.25 ? "hidden" : "visible");

  // Section 2: Architecture
  const archOpacity = useTransform(scrollYProgress, [0.25, 0.325, 0.4], [0, 1, 0]);
  const archY = useTransform(scrollYProgress, [0.25, 0.325, 0.4], [50, 0, -50]);
  const archVisibility = useTransform(scrollYProgress, (pos) => pos < 0.25 || pos > 0.4 ? "hidden" : "visible");
  
  // Section 3: Native Feel
  const nativeOpacity = useTransform(scrollYProgress, [0.4, 0.475, 0.55], [0, 1, 0]);
  const nativeY = useTransform(scrollYProgress, [0.4, 0.475, 0.55], [50, 0, -50]);
  const nativeVisibility = useTransform(scrollYProgress, (pos) => pos < 0.4 || pos > 0.55 ? "hidden" : "visible");

  // Section 4: Developer Experience
  const dxOpacity = useTransform(scrollYProgress, [0.55, 0.625, 0.7], [0, 1, 0]);
  const dxY = useTransform(scrollYProgress, [0.55, 0.625, 0.7], [50, 0, -50]);
  const dxVisibility = useTransform(scrollYProgress, (pos) => pos < 0.55 || pos > 0.7 ? "hidden" : "visible");

  // Section 5: Security
  const securityOpacity = useTransform(scrollYProgress, [0.7, 0.775, 0.85], [0, 1, 0]);
  const securityY = useTransform(scrollYProgress, [0.7, 0.775, 0.85], [50, 0, -50]);
  const securityVisibility = useTransform(scrollYProgress, (pos) => pos < 0.7 || pos > 0.85 ? "hidden" : "visible");

  // Final CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.925], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.85, 0.925], [0.9, 1]);
  const ctaVisibility = useTransform(scrollYProgress, (pos) => pos < 0.85 ? "hidden" : "visible");

  const isZh = locale === "zh";

  return (
    <div ref={containerRef} className="relative h-[700vh] bg-black text-white selection:bg-white/30">
      {/* Sticky Container */}
      <div className="sticky top-[64px] sm:top-[84px] h-[calc(100dvh-64px)] sm:h-[calc(100dvh-84px)] w-full overflow-hidden flex flex-col items-center justify-center">
        


        {/* Hero Section */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY, visibility: heroVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white/80"
          >
            {isZh ? "全新发布" : "Newly Released"}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent"
          >
            Hyper Core
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-xl sm:text-3xl text-white/60 font-light max-w-2xl"
          >
            {isZh ? "自研 Next.js 底层架构。重塑想象。" : "Self-developed Next.js Architecture. Reimagine Everything."}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          >
            <span className="text-xs uppercase tracking-widest">{isZh ? "向下滚动探索" : "Scroll to explore"}</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </motion.div>

        {/* Performance Section */}
        <motion.div
          style={{ opacity: perfOpacity, y: perfY, scale: perfScale, visibility: perfVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="mb-8 p-4 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Zap className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            {isZh ? "快如闪电。" : "Lightning Fast."}
          </h2>
          <p className="text-2xl sm:text-4xl text-white/80 font-medium mb-4 max-w-4xl leading-tight">
            {isZh ? "对比传统的 Next.js，渲染性能提升高达 " : "Compared to traditional Next.js, rendering performance increased by "}
            <span className="text-blue-400 font-bold">300%</span>
            {isZh ? "。" : "."}
          </p>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mt-6">
            {isZh 
              ? "得益于完全自研的内核调度机制与优化的流式渲染，每一次页面加载都如同原生应用般丝滑流畅。" 
              : "Thanks to our completely self-developed kernel scheduling mechanism and optimized streaming rendering, every page load is as smooth as a native app."}
          </p>
        </motion.div>

        {/* Architecture Section */}
        <motion.div
          style={{ opacity: archOpacity, y: archY, visibility: archVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="mb-8 p-4 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Layers className="w-12 h-12 text-purple-400" />
          </div>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {isZh ? "Pro 级架构" : "Pro Architecture"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mt-12 text-left">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Cpu className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">{isZh ? "智能预加载" : "Smart Preloading"}</h3>
              <p className="text-white/60 leading-relaxed">
                {isZh ? "通过机器学习预测用户行为，在点击之前毫秒级完成资源预取。让你感觉不到网络延迟的存在。" : "Predicting user behavior through machine learning to complete resource prefetching in milliseconds before clicking. You won't feel network latency."}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Globe className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">{isZh ? "边缘计算增强" : "Edge Computing"}</h3>
              <p className="text-white/60 leading-relaxed">
                {isZh ? "核心逻辑下发至全球边缘节点，让每一个请求都在距离用户最近的地方被处理，全球响应时间低于 50ms。" : "Core logic is pushed to global edge nodes, ensuring every request is processed closest to the user, with global response times under 50ms."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Native Feel Section */}
        <motion.div
          style={{ opacity: nativeOpacity, y: nativeY, visibility: nativeVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
           <h2 className="text-6xl sm:text-8xl font-bold tracking-tighter mb-8 leading-tight">
            {isZh ? (
              <>
                <span className="block text-white/40">无限接近</span>
                <span className="block">原生手感</span>
              </>
            ) : (
              <>
                <span className="block text-white/40">Infinitely close to</span>
                <span className="block">Native Feel.</span>
              </>
            )}
          </h2>
          <p className="text-xl sm:text-2xl text-white/60 max-w-3xl">
            {isZh 
              ? "我们重写了滚动引擎与手势系统，结合 Framer Motion 带来的物理级动画阻尼。每一次滑动，每一次点击，都充满生命力。" 
              : "We rewrote the scrolling engine and gesture system, combined with physical animation damping from Framer Motion. Every swipe, every click is full of life."}
          </p>
        </motion.div>

        {/* Developer Experience Section */}
        <motion.div
          style={{ opacity: dxOpacity, y: dxY, visibility: dxVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="mb-8 p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Code className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            {isZh ? "极致的开发体验" : "Ultimate DX."}
          </h2>
          <p className="text-2xl sm:text-4xl text-white/80 font-medium mb-4 max-w-4xl leading-tight">
            {isZh ? "写得更少，" : "Write less, "}
            <span className="text-emerald-400 font-bold">{isZh ? "做得更多" : "do more"}</span>
            {isZh ? "。" : "."}
          </p>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mt-6">
            {isZh 
              ? "热更新快如闪电，错误提示精准直观。内置强大的开发者工具，让编写复杂应用变得前所未有的简单和快乐。" 
              : "Lightning-fast hot reloading, precise and intuitive error messages. Built-in with a powerful set of developer tools, making writing complex applications easier and more enjoyable than ever."}
          </p>
        </motion.div>

        {/* Security Section */}
        <motion.div
          style={{ opacity: securityOpacity, y: securityY, visibility: securityVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="mb-8 p-4 rounded-full bg-rose-500/10 border border-rose-500/20">
            <Shield className="w-12 h-12 text-rose-400" />
          </div>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-rose-400 to-orange-500 bg-clip-text text-transparent">
            {isZh ? "军工级安全" : "Military-grade Security"}
          </h2>
          <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mt-6">
            {isZh 
              ? "从底层重新设计的数据流架构，默认防御 XSS 和 CSRF 攻击。全链路加密，确保每一比特的数据都坚不可摧。" 
              : "Redesigned data flow architecture from the ground up, with default defense against XSS and CSRF attacks. Full-chain encryption ensures every bit of data is indestructible."}
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale, visibility: ctaVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-t from-zinc-900/50 to-transparent"
        >
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
            {isZh ? "这就是 Hyper Core。" : "This is Hyper Core."}
          </h2>

        </motion.div>

      </div>
    </div>
  );
}
