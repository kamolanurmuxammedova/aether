"use client";

import React from "react";
import { Package, ShieldCheck, Users, Clock } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export function StatsSection() {
  const { t } = useI18n();

  const stats = [
    { value: "128k+", label: t("stats.1.label"), subtext: t("stats.1.sub"), icon: Package },
    { value: "48 мин", label: t("stats.2.label"), subtext: t("stats.2.sub"), icon: Clock },
    { value: "96%", label: t("stats.3.label"), subtext: t("stats.3.sub"), icon: ShieldCheck },
    { value: "340", label: t("stats.4.label"), subtext: t("stats.4.sub"), icon: Users },
  ];

  return (
    <section className="py-16 bg-[#161411] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center space-y-2 p-6 rounded-xl border border-white/10 bg-[#1E1B17]">
                <div className="w-9 h-9 rounded-md border border-white/10 text-[#E08A5A] mx-auto flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-white">{s.value}</div>
                <div className="text-sm text-zinc-200">{s.label}</div>
                <div className="text-[11px] text-zinc-500">{s.subtext}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
