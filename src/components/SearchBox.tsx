"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

type SearchBoxProps = {
  clearLabel: string;
  placeholder: string;
};

export default function SearchBox({ clearLabel, placeholder }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [keystroke, setKeystroke] = useState(0);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused || query) {
      setAnimatedPlaceholder("");
      return;
    }

    let cancelled = false;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (cancelled) return;

      if (!deleting) {
        charIdx += 1;
        setAnimatedPlaceholder(placeholder.slice(0, charIdx));

        if (charIdx === placeholder.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }

        timer = setTimeout(tick, 110);
      } else {
        charIdx -= 1;
        setAnimatedPlaceholder(placeholder.slice(0, charIdx));

        if (charIdx === 0) {
          deleting = false;
          timer = setTimeout(tick, 350);
        } else {
          timer = setTimeout(tick, 45);
        }
      }
    }

    timer = setTimeout(tick, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isFocused, placeholder, query]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;
    console.log("Search:", keyword);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setKeystroke((value) => value + 1);
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  const showTypewriter = !query && !isFocused;

  return (
    <>
      <div
        aria-hidden="true"
        onMouseDown={(e) => {
          e.preventDefault();
          inputRef.current?.blur();
        }}
        className={`fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ease-out ${
          isFocused ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <form
        onSubmit={handleSubmit}
        role="search"
        className={`relative z-10 w-56 sm:w-60 md:w-64 transition-transform duration-300 ease-out ${
          isFocused ? "scale-[1.03]" : "scale-100"
        }`}
      >
        <Search
          aria-hidden="true"
          className={`pointer-events-none absolute left-3 top-1/2 z-20 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
            isFocused || query ? "text-white" : "text-white/60"
          }`}
        />

        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={showTypewriter ? "" : placeholder}
          aria-label={placeholder}
          className={`h-9 pl-9 pr-9 bg-white/10 border-white/20 text-white placeholder:text-white/60 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0 focus-visible:bg-white/15 ${
            isFocused ? "shadow-[0_0_24px_rgba(255,255,255,0.18)]" : "shadow-none"
          }`}
        />

        {showTypewriter && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-9 top-1/2 z-10 flex -translate-y-1/2 select-none items-center text-sm text-white/60"
          >
            <span>{animatedPlaceholder}</span>
            <span className="ml-[1px] inline-block h-3.5 w-[1.5px] bg-white/70 animate-caret-blink" />
          </div>
        )}

        {query && (
          <span
            key={keystroke}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-white/50 animate-keystroke-pulse"
          />
        )}

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label={clearLabel}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full p-1 text-white/70 transition-colors duration-150 hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>
    </>
  );
}
