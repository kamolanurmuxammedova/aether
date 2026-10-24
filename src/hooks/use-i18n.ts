"use client";

import { useCallback } from "react";
import { useUserStore } from "@/store/use-user-store";
import { isLocale, t, type Locale } from "@/lib/i18n";

export function useI18n() {
  const raw = useUserStore((s) => s.language);
  const setLanguage = useUserStore((s) => s.setLanguage);
  const locale: Locale = isLocale(raw) ? raw : "ru";

  const translate = useCallback(
    (key: string, vars?: Record<string, string | number>) => t(locale, key, vars),
    [locale]
  );

  return { t: translate, locale, setLocale: setLanguage };
}
