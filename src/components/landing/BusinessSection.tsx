"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Code2, Network, ShieldCheck, ArrowRight, Check, Zap } from "lucide-react";

export function BusinessSection() {
  const enterprisePerks = [
    "Sub-second REST & GraphQL Logistics API with Webhooks",
    "Dedicated fleet allocation with custom security clearance",
    "Consolidated Net-60 institutional invoicing & VAT reports",
    "Financial SLA guarantee with 100% on-time credit policy",
    "Multi-drop route optimizer (up to 250 stops per dispatch run)",
    "24/7 Priority Concierge & Dedicated Fleet Operations Lead",
  ];

  return (
    <section className="py-24 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="ambient-glow -top-32 right-1/4 w-[500px] h-[350px] bg-indigo-600/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>AETHER Enterprise & Global Commerce</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Enterprise Fleet <br />
              <span className="gradient-accent-text">Without The Overhead</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Power your luxury retail, legal practice, or medical laboratory with a dedicated fleet of trained executive couriers. Full API programmatic dispatching in less than 5 lines of code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {enterprisePerks.map((perk, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-zinc-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{perk}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="gradient-btn px-6 py-3.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-lg"
              >
                <span>Request Enterprise Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#pricing"
                className="px-5 py-3.5 rounded-2xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10 transition-colors"
              >
                View Volume SLA Tiers
              </a>
            </div>
          </motion.div>

          {/* Right Live API & Dashboard Code Card */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 ml-2">POST /v1/dispatch/quantum</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  200 OK (38ms)
                </span>
              </div>

              {/* Code Mock */}
              <div className="font-mono text-xs text-zinc-300 space-y-1 overflow-x-auto p-4 rounded-2xl bg-black/60 border border-white/5 leading-relaxed">
                <div><span className="text-purple-400">const</span> dispatch = <span className="text-purple-400">await</span> aether.<span className="text-indigo-400">orders</span>.<span className="text-blue-400">create</span>(&#123;</div>
                <div className="pl-4 text-zinc-400">tier: <span className="text-emerald-300">&quot;HYPERSPEED_DIRECT&quot;</span>,</div>
                <div className="pl-4 text-zinc-400">origin: &#123; lat: <span className="text-amber-300">40.7638</span>, lng: <span className="text-amber-300">-73.9730</span> &#125;,</div>
                <div className="pl-4 text-zinc-400">destination: &#123; lat: <span className="text-amber-300">40.7711</span>, lng: <span className="text-amber-300">-73.9634</span> &#125;,</div>
                <div className="pl-4 text-zinc-400">cargoClass: <span className="text-emerald-300">&quot;ELECTRONICS_SEALED&quot;</span>,</div>
                <div className="pl-4 text-zinc-400">biometricVerification: <span className="text-purple-400">true</span>,</div>
                <div className="pl-4 text-zinc-400">insuranceValuationUsd: <span className="text-amber-300">25000</span></div>
                <div>&#125;);</div>
                <div className="pt-2 text-zinc-500">&#47;&#47; Returned telemetry stream</div>
                <div className="text-emerald-400">&#123; id: &quot;AETH-982XF&quot;, courier: &quot;Julian V.&quot;, etaMin: 14 &#125;</div>
              </div>

              {/* Enterprise Guarantee Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-lg font-bold text-white font-mono">99.99%</div>
                  <div className="text-[10px] text-zinc-400">SLA Guarantee</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-lg font-bold text-white font-mono">&lt; 400ms</div>
                  <div className="text-[10px] text-zinc-400">Match Velocity</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-lg font-bold text-white font-mono">SOC2</div>
                  <div className="text-[10px] text-zinc-400">Certified Secure</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
