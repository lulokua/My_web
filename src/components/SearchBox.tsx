"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

/** 占位符打字机循环展示的候选短语 */
const PLACEHOLDERS = ["Search everything about here."];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  /** 每次按键自增，用作脉冲动画元素的 key 以强制重启动画 */
  const [keystroke, setKeystroke] = useState(0);
  /** 打字机当前显示的占位文本 */
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 占位符打字机动画：仅在空且未聚焦时滚动播放
  useEffect(() => {
    if (isFocused || query) {
      setAnimatedPlaceholder("");
      return;
    }

    let cancelled = false;
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (cancelled) return;
      const phrase = PLACEHOLDERS[phraseIdx];

      if (!deleting) {
        charIdx += 1;
        setAnimatedPlaceholder(phrase.slice(0, charIdx));
        if (charIdx === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 1600); // 写完后停顿
          return;
        }
        timer = setTimeout(tick, 110);
      } else {
        charIdx -= 1;
        setAnimatedPlaceholder(phrase.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % PLACEHOLDERS.length;
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
  }, [isFocused, query]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;
    // TODO: 这里接入实际的搜索逻辑（例如跳转到 /search?q=...）
    console.log("搜索：", keyword);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setKeystroke((k) => k + 1);
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  const showTypewriter = !query && !isFocused;

  return (
    <>
      {/* 聚焦时的全局模糊遮罩：点击空白处可关闭 */}
      <div
        aria-hidden="true"
        onMouseDown={(e) => {
          e.preventDefault();
          inputRef.current?.blur();
        }}
        className={`fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ease-out ${
          isFocused
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />
      <form
        onSubmit={handleSubmit}
        role="search"
        className={`relative z-10 w-48 sm:w-60 md:w-64 transition-transform duration-300 ease-out ${
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
          placeholder={showTypewriter ? "" : "Search everything about here."}
          aria-label="Search everything about here."
          className={`h-9 pl-9 pr-9 bg-white/10 border-white/20 text-white placeholder:text-white/60 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0 focus-visible:bg-white/15 ${
            isFocused
              ? "shadow-[0_0_24px_rgba(255,255,255,0.18)]"
              : "shadow-none"
          }`}
        />

        {/* 自定义打字机占位符（仅在空且未聚焦时出现） */}
        {showTypewriter && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-9 top-1/2 z-10 flex -translate-y-1/2 select-none items-center text-sm text-white/60"
          >
            <span>{animatedPlaceholder}</span>
            <span className="ml-[1px] inline-block h-3.5 w-[1.5px] bg-white/70 animate-caret-blink" />
          </div>
        )}

        {/* 每次按键触发的扩散光环：通过 key 变更强制重启动画 */}
        {query && (
          <span
            key={keystroke}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-white/50 animate-keystroke-pulse"
          />
        )}

        {/* 清空按钮 */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="清空搜索"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full p-1 text-white/70 transition-colors duration-150 hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>
    </>
  );
}
