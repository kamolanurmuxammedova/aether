"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { PRESET_ADDRESSES } from "@/lib/constants";
import { PackageCategory } from "@/types";
import { useI18n } from "@/hooks/use-i18n";
import { MapPin, ArrowRight, ShieldCheck, Clock, ChevronRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const { t } = useI18n();
  const { setPickup, setDropoff, setCategory } = useOrderStore();

  const [pickupInput, setPickupInput] = useState(PRESET_ADDRESSES[0].fullAddress);
  const [dropoffInput, setDropoffInput] = useState(PRESET_ADDRESSES[1].fullAddress);
  const [selectedCat, setSelectedCat] = useState<PackageCategory>("ELECTRONICS");

  const handleInstantDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const pAddr = PRESET_ADDRESSES.find((a) => a.fullAddress === pickupInput) || PRESET_ADDRESSES[0];
    const dAddr = PRESET_ADDRESSES.find((a) => a.fullAddress === dropoffInput) || PRESET_ADDRESSES[1];
    setPickup(pAddr.fullAddress, pAddr.coords);
    setDropoff(dAddr.fullAddress, dAddr.coords);
    setCategory(selectedCat);
    router.push("/book");
  };

  const quickCategories = [
    { id: "ELECTRONICS" as PackageCategory, name: t("cat.electronics"), price: "$16" },
    { id: "DOCUMENTS" as PackageCategory, name: t("cat.documents"), price: "$12" },
    { id: "FOOD" as PackageCategory, name: t("cat.food"), price: "$9.5" },
    { id: "MEDICINE" as PackageCategory, name: t("cat.medicine"), price: "$11" },
    { id: "FRAGILE" as PackageCategory, name: t("cat.fragile"), price: "$22" },
    { id: "FLOWERS" as PackageCategory, name: t("cat.flowers"), price: "$14" },
  ];

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-xs text-zinc-300">
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] text-white leading-[1.15]">
              {t("hero.title.1")}{" "}
              <span className="text-[#E08A5A]">{t("hero.title.2")}</span>{" "}
              {t("hero.title.3")}
            </h1>

            <p className="text-base text-zinc-400 max-w-xl leading-relaxed">{t("hero.subtitle")}</p>

            <div className="grid grid-cols-3 gap-6 pt-2 border-t border-white/10 max-w-md">
              <div>
                <div className="text-xl font-semibold text-zinc-100">48 мин</div>
                <div className="text-xs text-zinc-500 mt-0.5">{t("hero.metric.eta")}</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-zinc-100">96%</div>
                <div className="text-xs text-zinc-500 mt-0.5">{t("hero.metric.sla")}</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-zinc-100">$2k</div>
                <div className="text-xs text-zinc-500 mt-0.5">{t("hero.metric.cover")}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/book"
                className="gradient-btn px-6 py-3 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
              >
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/track"
                className="px-5 py-3 rounded-lg text-sm font-medium text-zinc-300 border border-white/10 hover:bg-white/[0.04] inline-flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                {t("hero.track")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl bg-[#1E1B17] border border-white/10 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-white">{t("hero.form.title")}</span>
                </div>
                <span className="text-[10px] text-zinc-400 border border-white/10 px-2 py-0.5 rounded">
                  {t("hero.form.rates")}
                </span>
              </div>

              <form onSubmit={handleInstantDispatch} className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-2">
                    {t("hero.form.category")}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {quickCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCat(cat.id)}
                        className={`p-2 rounded-md text-left border text-xs ${
                          selectedCat === cat.id
                            ? "bg-white/10 border-white/25 text-white"
                            : "border-white/10 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <span className="font-medium block truncate text-[11px]">{cat.name}</span>
                        <span className="text-[10px] text-zinc-500">{cat.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-zinc-300 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {t("hero.form.from")}
                  </label>
                  <select
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    className="w-full rounded-md px-3 py-2.5 text-xs bg-[#161411] text-zinc-200 border border-white/10"
                  >
                    {PRESET_ADDRESSES.map((addr) => (
                      <option key={addr.id} value={addr.fullAddress}>
                        {addr.title} — {addr.fullAddress}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-zinc-300 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {t("hero.form.to")}
                  </label>
                  <select
                    value={dropoffInput}
                    onChange={(e) => setDropoffInput(e.target.value)}
                    className="w-full rounded-md px-3 py-2.5 text-xs bg-[#161411] text-zinc-200 border border-white/10"
                  >
                    {PRESET_ADDRESSES.map((addr) => (
                      <option key={addr.id} value={addr.fullAddress}>
                        {addr.title} — {addr.fullAddress}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-md border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span>{t("hero.form.eta")}:</span>
                    <span className="font-semibold text-zinc-200">~42 мин</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500 text-[10px] block">{t("hero.form.est")}</span>
                    <span className="font-semibold text-sm text-white">$12.50</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full gradient-btn py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                >
                  {t("hero.form.submit")}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-1 flex items-center justify-center gap-4 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {t("hero.form.secure")}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {t("hero.form.insured")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
