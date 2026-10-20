"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does AETHER achieve a 14-minute average urban delivery?",
      a: "AETHER utilizes a proprietary neural matching engine paired with dedicated municipal green corridor telemetry. Couriers operate high-torque electric cyber-scooters and e-bikes that bypass gridlocked vehicle traffic entirely. Orders are matched and dispatched under 400ms without middle-mile depot bottlenecks.",
    },
    {
      q: "What insurance and security coverage applies to my cargo?",
      a: "Every single delivery includes complimentary baseline protection up to $5,000 USD. For high-value assets, classified legal documents, and fine jewelry, our Concierge Total Cover is underwritten by Lloyd's of London for up to $250,000 USD with guaranteed zero-deductible replacement.",
    },
    {
      q: "How does the cryptographic biometric handover work?",
      a: "When your delivery arrives, the recipient is verified through a one-time dynamic encrypted PIN code generated in the app, or biometric facial verification. Once matched, the courier's electronic seal is unlocked, and an irrevocable cryptographic receipt with GPS timestamp is recorded in your Digital Vault.",
    },
    {
      q: "Can enterprise clients integrate AETHER programmatically?",
      a: "Yes. We offer fully typed REST and GraphQL APIs, comprehensive Webhooks, and direct plugins for Shopify Plus, SAP, Oracle NetSuite, and custom warehouse management systems. Your engineering team can implement automated dispatch in less than an hour.",
    },
    {
      q: "What types of vehicles make up the AETHER fleet?",
      a: "Our fleet consists entirely of zero-emission vehicles: custom high-performance Cyber Scooters, gyro-stabilized Cargo E-Bikes, executive Tesla Model S sedans, Mercedes eVito electric cargo vans, and our licensed urban air drone corridor beta.",
    },
    {
      q: "How are couriers vetted and certified?",
      a: "Only 4.8% of courier applicants are accepted into the AETHER fleet. Every candidate undergoes rigorous multi-jurisdictional criminal background screening, white-glove executive etiquette training, and hands-on certification in high-value asset handling.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#09090B] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Operational Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="gradient-accent-text">Questions</span>
          </h2>
          <p className="text-sm text-zinc-400">
            Everything you need to know about security, insurance, dispatch algorithms, and enterprise integration.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border bg-[#111217] overflow-hidden transition-colors duration-200 ${
                  isOpen ? "border-purple-500/30" : "border-white/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen
                        ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                        : "bg-white/[0.04] border-white/10 text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
