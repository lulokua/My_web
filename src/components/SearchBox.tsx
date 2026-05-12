"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;
    // TODO: 这里接入实际的搜索逻辑（例如跳转到 /search?q=...）
    console.log("搜索：", keyword);
  }

  return (
    <>
      {/* 聚焦时的全局模糊遮罩：点击空白处可关闭 */}
      <div
        aria-hidden="true"
        onMouseDown={(e) => {
          // 阻止抢占焦点，再主动让输入框失焦，触发关闭动画
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
        className="relative z-10 w-48 sm:w-60 md:w-64"
      >
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
        />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="搜索文章..."
          aria-label="搜索文章"
          className="h-9 pl-9 pr-3 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 focus-visible:ring-offset-0"
        />
      </form>
    </>
  );
}
