"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { CATEGORIES } from "@/lib/constants";
import { Search, X, ArrowRight, PackageCheck } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/hooks/use-i18n";

export function SearchModal() {
  const { t } = useI18n();
  const { isSearchOpen, setIsSearchOpen } = useUserStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70">
      <div className="w-full max-w-2xl bg-[#1E1B17] border border-white/10 rounded-xl overflow-hidden">
        <div className="relative flex items-center px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="w-full bg-transparent text-white placeholder-zinc-500 text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-zinc-400">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-3 text-xs border border-white/10 px-2.5 py-1 rounded-md text-zinc-400"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-6">
          {query.startsWith("AETH-") || query.length >= 6 ? (
            <div className="p-4 rounded-lg border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PackageCheck className="w-6 h-6 text-[#E08A5A]" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {t("search.track", { q: query.toUpperCase() })}
                  </h4>
                  <p className="text-xs text-zinc-400">{t("search.trackHint")}</p>
                </div>
              </div>
              <Link
                href={`/track?order=${encodeURIComponent(query)}`}
                onClick={() => setIsSearchOpen(false)}
                className="gradient-btn px-4 py-1.5 rounded-md text-xs font-semibold"
              >
                {t("nav.track")}
              </Link>
            </div>
          ) : null}

          <div>
            <h3 className="text-xs font-semibold text-zinc-500 mb-3">{t("search.cats")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredCategories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/book?category=${cat.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-white/[0.04]"
                >
                  <div>
                    <div className="text-sm text-white">{cat.name}</div>
                    <div className="text-xs text-zinc-400">$ {cat.basePrice.toFixed(2)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
