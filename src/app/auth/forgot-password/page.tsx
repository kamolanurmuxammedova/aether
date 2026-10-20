"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center px-4 bg-[#09090B] relative overflow-hidden">
      <div className="ambient-glow top-1/4 left-1/3 w-[500px] h-[400px] bg-purple-600/15" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">AETHER</span>
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Recover Access</h1>
            <p className="text-xs text-zinc-400">
              We will transmit an encrypted recovery token to your registered communication channel.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Recovery Token Dispatched</h3>
              <p className="text-xs text-zinc-400">
                Check your inbox at <span className="text-white font-mono">{email}</span> for instructions.
              </p>
              <Link
                href="/auth/verify-otp"
                className="gradient-btn inline-flex px-5 py-2.5 rounded-xl text-xs font-bold text-white mt-2"
              >
                Enter OTP Token
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white"
                    placeholder="executive@vance.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full gradient-btn py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Transmit Recovery Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link
              href="/auth/login"
              className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
