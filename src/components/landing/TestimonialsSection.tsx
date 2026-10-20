"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Evelyn Vance",
      role: "Managing Partner, Vance Capital",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      content:
        "We replaced our entire corporate messenger network with AETHER. Classified legal deeds and bank instruments that routinely took 2 hours across Manhattan now arrive in under 18 minutes with complete cryptographic proof.",
      rating: 5,
      cargoClass: "Classified Legal Documents",
    },
    {
      name: "David Sterling",
      role: "VP of Hardware, Quantum Lab",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content:
        "The gyro-stabilized, air-suspended cases and continuous vibration telemetry give us 100% confidence when moving unreleased Silicon prototypes worth hundreds of thousands of dollars.",
      rating: 5,
      cargoClass: "High-Value Hardware Prototypes",
    },
    {
      name: "Chef Antoine Laurent",
      role: "Executive Chef, L'Horizon NY",
      avatar: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150&auto=format&fit=crop&q=80",
      content:
        "Before AETHER, gourmet dinner transport was impossible without compromising plating architecture. Their climate-controlled thermal pods deliver 3-star culinary creations exactly as they left the pass.",
      rating: 5,
      cargoClass: "Fine Dining & Gourmet",
    },
    {
      name: "Sofia Chen",
      role: "Global Logistics VP, Lumina Tech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content:
        "The REST & GraphQL API is the cleanest implementation we have integrated. We dispatch 4,000+ monthly shipments programmatically without human intervention. Zero loss in 14 months.",
      rating: 5,
      cargoClass: "Enterprise REST API",
    },
  ];

  return (
    <section className="py-24 bg-[#070709] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reputation & Trust</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Endorsed by <br />
            <span className="gradient-accent-text">Industry Leaders</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Trusted by the world&apos;s most demanding family offices, law firms, Michelin kitchens, and venture-backed tech pioneers.
          </p>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="p-8 rounded-3xl bg-[#111217] border border-white/5 hover:border-purple-500/30 transition-colors duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {r.cargoClass}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6 italic">
                  &ldquo;{r.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {r.name}
                  </h4>
                  <p className="text-xs text-zinc-400">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
