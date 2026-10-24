"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Box, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-[#1E1B17] border border-white/10 p-8 space-y-5">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-[#C45C26] flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-semibold text-lg text-white">AETHER</span>
          </Link>
          <h1 className="text-2xl text-white mt-2">{t("auth.forgotTitle")}</h1>
          <p className="text-sm text-zinc-400">{t("auth.forgotHint")}</p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-lg border border-emerald-500/20 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-semibold text-white">{t("auth.sentTitle")}</h3>
            <p className="text-xs text-zinc-400">{t("auth.sentHint", { email })}</p>
            <Link href="/auth/verify-otp" className="gradient-btn inline-flex px-5 py-2.5 rounded-lg text-xs font-semibold">
              {t("auth.enterCode")}
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-1.5">{t("auth.email")}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
            </div>
            <button type="submit" className="w-full gradient-btn py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2">
              {t("auth.sendLink")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <Link href="/auth/login" className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> {t("auth.back")}
        </Link>
      </div>
    </div>
  );
}
