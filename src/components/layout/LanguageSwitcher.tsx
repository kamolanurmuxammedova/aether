"use client";

import React, { useState } from "react";
import { LOCALES } from "@/lib/i18n";
import { useI18n } from "@/hooks/use-i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        className="px-2 py-1.5 rounded-md text-[11px] font-semibold tracking-wide text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/10"
      >
        {locale.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-[#1E1B17] border border-white/10 shadow-lg p-1 z-50">
          {LOCALES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setLocale(item.id);
                setOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs ${
                locale === item.id
                  ? "bg-white/10 text-white"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="font-semibold mr-1.5">{item.label}</span>
              <span className="text-zinc-500">{item.native}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
