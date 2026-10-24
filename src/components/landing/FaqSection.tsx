"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export function FaqSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: t(`faq.${n}.q`),
    a: t(`faq.${n}.a`),
  }));

  return (
    <section id="faq" className="py-20 bg-[#161411]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex px-3 py-1 rounded-full border border-white/10 text-xs text-zinc-300">
            {t("faq.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl text-white">{t("faq.title")}</h2>
          <p className="text-sm text-zinc-400">{t("faq.subtitle")}</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-lg border bg-[#1E1B17] ${
                  isOpen ? "border-[#C45C26]/40" : "border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
