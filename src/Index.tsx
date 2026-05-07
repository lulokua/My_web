import { useCallback, useEffect, useRef } from "react";
import Lenis from "lenis";
import { ArrowRight, Camera, Globe, MessageCircle } from "lucide-react";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export default function Index() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const fadeOutStartedRef = useRef(false);

  const fadeVideo = useCallback((targetOpacity: number, duration = 500) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
    }

    const start = performance.now();
    const startOpacity = Number.parseFloat(video.style.opacity || "0");

    const step = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const opacity = startOpacity + (targetOpacity - startOpacity) * progress;

      video.style.opacity = opacity.toString();

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
      } else {
        fadeFrameRef.current = null;
      }
    };

    fadeFrameRef.current = requestAnimationFrame(step);
  }, []);

  const handleCanPlay = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.play().catch(() => undefined);
    fadeVideo(1);
  }, [fadeVideo]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    const remaining = video.duration - video.currentTime;

    if (!fadeOutStartedRef.current && remaining <= 0.55) {
      fadeOutStartedRef.current = true;
      fadeVideo(0);
    }
  }, [fadeVideo]);

  const handleEnded = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    fadeOutStartedRef.current = false;
    video.style.opacity = "0";

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      video.currentTime = 0;
      video.play().catch(() => undefined);
      fadeVideo(1);
    }, 100);
  }, [fadeVideo]);

  useEffect(() => {
    return () => {
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current);
      }

      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
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
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        <nav className="fixed top-0 z-50 w-full px-6 py-6">
          <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-white" aria-hidden="true" />
              <span className="ml-3 text-lg font-semibold text-white">
                Asme
              </span>
              <div className="ml-8 hidden items-center gap-8 md:flex">
                {["Features", "Pricing", "About"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-sm font-medium text-white" type="button">
                Sign Up
              </button>
              <button
                className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white"
                type="button"
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex flex-1 -translate-y-[20%] md:-translate-y-[10%] lg:-translate-y-[5%] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex w-full max-w-4xl flex-col items-center gap-8">
            <h1
              className="whitespace-nowrap text-6xl tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Born to <em className="italic">Explore</em>.
            </h1>

            <button
              className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              type="button"
            >
              Manifesto
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
