"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, ArrowRight, RotateCcw } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export default function VerifyOtpPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(48);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[index] = val.slice(-1);
    setOtp(next);
    if (val && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-[#1E1B17] border border-white/10 p-8 space-y-6 text-center">
        <div className="w-10 h-10 rounded-md bg-[#C45C26] flex items-center justify-center text-white mx-auto">
          <Box className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-2xl text-white">{t("auth.otpTitle")}</h1>
          <p className="text-sm text-zinc-400 mt-1">{t("auth.otpHint")}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
          className="space-y-5"
        >
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-10 h-12 rounded-md glass-input text-center text-lg font-semibold"
              />
            ))}
          </div>
          <button type="submit" className="w-full gradient-btn py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2">
            {t("auth.confirm")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <div className="text-xs text-zinc-500">
          {countdown > 0 ? (
            t("auth.resendIn", { n: countdown })
          ) : (
            <button onClick={() => setCountdown(60)} className="text-[#E08A5A] inline-flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {t("auth.resend")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
