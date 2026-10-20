"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { PRESET_ADDRESSES, CATEGORIES } from "@/lib/constants";
import { PackageCategory } from "@/types";
import {
  Zap,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const router = useRouter();
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

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow top-0 left-1/4 w-[600px] h-[450px] bg-purple-600/15" />
      <div className="ambient-glow top-32 right-10 w-[500px] h-[400px] bg-indigo-600/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text / Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-300">
                Next-Gen Hyper-Logistics Infrastructure
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs font-mono text-indigo-400">v3.8 Active</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              The Invisible <br />
              <span className="gradient-accent-text">Velocity</span> of Modern <br />
              Commerce.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              Autonomous on-demand urban transport for high-value assets, confidential contracts,
              gourmet dining, and enterprise freight. Average dispatch under 90 seconds. Guaranteed zero-loss.
            </p>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">14.2m</div>
                <div className="text-xs text-zinc-400">Avg Urban Delivery</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.98%</div>
                <div className="text-xs text-zinc-400">On-Time Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">$100k</div>
                <div className="text-xs text-zinc-400">Complimentary Cargo Cover</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/book"
                className="gradient-btn px-7 py-4 rounded-2xl text-sm font-bold text-white flex items-center gap-2 group shadow-xl"
              >
                <span>Dispatch High-Speed Courier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/track"
                className="px-6 py-4 rounded-2xl text-sm font-semibold text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Live Radar Telemetry</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Dispatch Console */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-purple-500/20 via-indigo-500/10 to-transparent blur-xl" />

              <div className="relative glass-card rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      Instant Dispatch Console
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    Live Rates
                  </span>
                </div>

                <form onSubmit={handleInstantDispatch} className="space-y-4">
                  {/* Category Pills Slider */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                      Package Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {CATEGORIES.slice(0, 6).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCat(cat.id)}
                          className={`p-2.5 rounded-2xl text-left border text-xs transition-all ${
                            selectedCat === cat.id
                              ? "bg-purple-600/30 border-purple-500 text-white shadow-md shadow-purple-600/20"
                              : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="font-semibold block truncate">{cat.name.split(" ")[0]}</span>
                          <span className="text-[10px] text-zinc-500">From ${cat.basePrice}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pickup Address */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <MapPin className="w-3.5 h-3.5" /> Origin
                      </span>
                      <span className="text-[10px] text-zinc-500 font-normal">Select or type</span>
                    </label>
                    <select
                      value={pickupInput}
                      onChange={(e) => setPickupInput(e.target.value)}
                      className="w-full glass-input rounded-2xl px-3.5 py-3 text-xs bg-[#111217] text-zinc-200 border-white/10 focus:outline-none"
                    >
                      {PRESET_ADDRESSES.map((addr) => (
                        <option key={addr.id} value={addr.fullAddress} className="bg-[#111217] text-white">
                          {addr.title} — {addr.fullAddress}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Destination Address */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-indigo-400">
                        <MapPin className="w-3.5 h-3.5" /> Destination
                      </span>
                      <span className="text-[10px] text-zinc-500 font-normal">Priority route</span>
                    </label>
                    <select
                      value={dropoffInput}
                      onChange={(e) => setDropoffInput(e.target.value)}
                      className="w-full glass-input rounded-2xl px-3.5 py-3 text-xs bg-[#111217] text-zinc-200 border-white/10 focus:outline-none"
                    >
                      {PRESET_ADDRESSES.map((addr) => (
                        <option key={addr.id} value={addr.fullAddress} className="bg-[#111217] text-white">
                          {addr.title} — {addr.fullAddress}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated summary box */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Direct Corridor ETA:</span>
                      <span className="font-bold text-white">~14 Mins</span>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500 text-[10px] block">Est. Total</span>
                      <span className="font-extrabold text-sm text-indigo-400 font-mono">$24.50</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full gradient-btn py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Secure Booking</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Micro Guarantee footer */}
                <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Biometric Handover
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Lloyd&apos;s Insured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
