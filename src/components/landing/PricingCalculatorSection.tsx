"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { SPEED_TIERS } from "@/lib/constants";
import { SpeedTier } from "@/types";
import { motion } from "framer-motion";
import { Zap, Clock, Shield, Check, ArrowRight, Sparkles, Sliders } from "lucide-react";

export function PricingCalculatorSection() {
  const router = useRouter();
  const { setSpeedTier, setWeight, setInsurance } = useOrderStore();

  const [distanceKm, setDistanceKm] = useState(6);
  const [weightKg, setWeightKg] = useState(3);
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedTier>("HYPERSPEED");
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [whiteGlove, setWhiteGlove] = useState(false);

  const speedObj = SPEED_TIERS.find((s) => s.id === selectedSpeed) || SPEED_TIERS[0];
  const baseRate = 12.0;
  const distanceCost = distanceKm * 2.25;
  const weightCost = weightKg * 1.4;
  const insuranceCost = includeInsurance ? 12.0 : 0.0;
  const whiteGloveCost = whiteGlove ? 18.0 : 0.0;

  const rawSubtotal = (baseRate + distanceCost + weightCost) * speedObj.priceMultiplier;
  const grandTotal = Math.round((rawSubtotal + insuranceCost + whiteGloveCost) * 100) / 100;
  const calculatedEtaMin = Math.round(distanceKm * 2.8 * (selectedSpeed === "HYPERSPEED" ? 0.7 : 1));

  const handleBookConfig = () => {
    setSpeedTier(selectedSpeed);
    setWeight(weightKg);
    setInsurance(includeInsurance ? "STANDARD" : "NONE");
    router.push("/book");
  };

  return (
    <section id="pricing" className="py-24 bg-[#070709] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            Transparent Quantum Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Predictable, Algorithmic <br />
            <span className="gradient-accent-text">Zero Surge Surprises</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            No mystery surge charges. Instant real-time calculation based strictly on distance, weight, and chosen transit velocity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <motion.div
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Speed Tier Selector */}
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
                Transit Velocity Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SPEED_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedSpeed(tier.id)}
                    className={`p-3 rounded-2xl text-left border text-xs transition-all ${
                      selectedSpeed === tier.id
                        ? "bg-purple-600/30 border-purple-500 text-white shadow-md shadow-purple-600/20"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="font-bold block truncate">{tier.title.split(" ")[0]}</span>
                    <span className="text-[10px] text-zinc-500 block">{tier.eta}</span>
                    <span className="text-[10px] text-indigo-400 font-mono mt-1 block">
                      {tier.priceMultiplier}x Multiplier
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-5 pt-2 border-t border-white/5">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-zinc-300">Corridor Transit Distance</span>
                  <span className="font-mono font-bold text-white text-sm">{distanceKm} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-white/10 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                  <span>1 km (Local Block)</span>
                  <span>18 km</span>
                  <span>35 km (Outer Metro)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-zinc-300">Package Net Weight</span>
                  <span className="font-mono font-bold text-white text-sm">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="40"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-white/10 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                  <span>0.5 kg (Docs)</span>
                  <span>20 kg (Cargo)</span>
                  <span>40 kg (Heavy)</span>
                </div>
              </div>
            </div>

            {/* Addon Checkboxes */}
            <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIncludeInsurance(!includeInsurance)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-colors ${
                  includeInsurance
                    ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                    : "bg-white/[0.02] border-white/5 text-zinc-400"
                }`}
              >
                <div>
                  <div className="text-xs font-semibold">Lloyd&apos;s $100k Cargo Cover</div>
                  <div className="text-[10px] text-zinc-500">Full loss guarantee</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                    includeInsurance ? "bg-indigo-600 text-white" : "border border-white/20"
                  }`}
                >
                  {includeInsurance && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWhiteGlove(!whiteGlove)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-colors ${
                  whiteGlove
                    ? "bg-purple-500/10 border-purple-500/40 text-white"
                    : "bg-white/[0.02] border-white/5 text-zinc-400"
                }`}
              >
                <div>
                  <div className="text-xs font-semibold">White-Glove Unboxing</div>
                  <div className="text-[10px] text-zinc-500">Room placement & seal check</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                    whiteGlove ? "bg-purple-600 text-white" : "border border-white/20"
                  }`}
                >
                  {whiteGlove && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            </div>
          </motion.div>

          {/* Realtime Quote Output Card */}
          <motion.div
            className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Instant Telemetry Estimate
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Guaranteed Locked
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Selected Tier</span>
                <span className="text-white font-semibold">{speedObj.title}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Direct ETA</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  ~{calculatedEtaMin} Minutes
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Base Corridors + Distance</span>
                <span className="text-white font-mono">
                  ${(baseRate + distanceCost).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Weight Differential</span>
                <span className="text-white font-mono">${weightCost.toFixed(2)}</span>
              </div>
              {includeInsurance && (
                <div className="flex justify-between text-zinc-400">
                  <span>Full Risk Insurance</span>
                  <span className="text-indigo-400 font-mono">+$12.00</span>
                </div>
              )}
              {whiteGlove && (
                <div className="flex justify-between text-zinc-400">
                  <span>White-Glove Protocol</span>
                  <span className="text-purple-400 font-mono">+$18.00</span>
                </div>
              )}
            </div>

            {/* Total box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">Total Net Rate</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block font-mono">Tax & Tolls Included</span>
                <span className="text-xs text-emerald-400 font-semibold">No Surge Hidden</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBookConfig}
              className="w-full gradient-btn py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-transform"
            >
              <span>Lock Rate & Dispatch Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[11px] text-zinc-500">
              Dispatched within 90 seconds of order confirmation.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
