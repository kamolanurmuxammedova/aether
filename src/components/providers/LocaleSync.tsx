"use client";

import { useEffect } from "react";
import { useI18n } from "@/hooks/use-i18n";
import { localeToHtmlLang } from "@/lib/i18n";

export function LocaleSync() {
  const { locale } = useI18n();

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);

  return null;
}
