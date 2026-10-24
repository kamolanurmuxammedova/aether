"use client";

import React from "react";
import { MapPin, UserRound, Navigation, KeyRound, ArrowRight } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export function HowItWorksSection() {
  const { t } = useI18n();

  const steps = [
    {
      number: "01",
      title: t("how.1.title"),
      description: t("how.1.desc"),
      icon: MapPin,
      badge: t("how.1.badge"),
    },
    {
      number: "02",
      title: t("how.2.title"),
      description: t("how.2.desc"),
      icon: UserRound,
      badge: t("how.2.badge"),
    },
    {
      number: "03",
      title: t("how.3.title"),
      description: t("how.3.desc"),
      icon: Navigation,
      badge: t("how.3.badge"),
    },
    {
      number: "04",
      title: t("how.4.title"),
      description: t("how.4.desc"),
      icon: KeyRound,
      badge: t("how.4.badge"),
    },
  ];

  return (
    <section className="py-20 bg-[#161411]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex px-3 py-1 rounded-full border border-white/10 text-xs text-zinc-300">
            {t("how.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl text-white">{t("how.title")}</h2>
          <p className="text-sm text-zinc-400">{t("how.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-xl bg-[#1E1B17] border border-white/10 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#E08A5A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl text-zinc-700">{step.number}</span>
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] text-[#E08A5A]">{step.badge}</span>
                  <h3 className="text-lg text-white">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
                  <span>{t("how.step", { n: idx + 1 })}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
