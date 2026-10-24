"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Box, CheckCircle2, Send } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export function Footer() {
  const { t } = useI18n();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#12100E] border-t border-white/10 pt-16 pb-10 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#C45C26] flex items-center justify-center text-white">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-semibold text-lg text-white">AETHER</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">{t("footer.blurb")}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {t("footer.status")}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white mb-4">{t("footer.col1")}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/book" className="hover:text-white">{t("footer.speed")}</Link></li>
              <li><Link href="/book" className="hover:text-white">{t("footer.tech")}</Link></li>
              <li><Link href="/book" className="hover:text-white">{t("footer.docs")}</Link></li>
              <li><Link href="/book" className="hover:text-white">{t("footer.fragile")}</Link></li>
              <li><Link href="/book" className="hover:text-white">{t("footer.pharma")}</Link></li>
              <li><Link href="/book" className="hover:text-white">{t("footer.cargo")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white mb-4">{t("footer.col2")}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/track" className="hover:text-white">{t("footer.track")}</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">{t("footer.cabinet")}</Link></li>
              <li><Link href="/auth/register" className="hover:text-white">{t("footer.become")}</Link></li>
              <li><Link href="/admin" className="hover:text-white">{t("footer.admin")}</Link></li>
              <li><a href="#pricing" className="hover:text-white">{t("footer.prices")}</a></li>
              <li><a href="#faq" className="hover:text-white">{t("footer.faq")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white mb-4">{t("footer.col3")}</h4>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>{t("footer.safe")}</li>
              <li>{t("footer.insurance")}</li>
              <li>{t("footer.privacy")}</li>
              <li>{t("footer.photo")}</li>
              <li>{t("footer.api")}</li>
              <li>{t("footer.green")}</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white">{t("footer.news")}</h4>
            <p className="text-sm">{t("footer.newsHint")}</p>
            {subscribed ? (
              <div className="p-3 rounded-md border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {t("footer.subscribed")}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@mail.uz"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-md px-3.5 py-2 text-xs text-white"
                />
                <button
                  type="submit"
                  aria-label="ok"
                  className="absolute right-1.5 top-1.5 w-6 h-6 rounded bg-[#C45C26] text-white flex items-center justify-center"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>{t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <span>{t("footer.privacyLink")}</span>
            <span>{t("footer.terms")}</span>
            <span>{t("footer.statusLink")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
