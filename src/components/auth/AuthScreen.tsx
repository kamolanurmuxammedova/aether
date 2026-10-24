"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore, UserRole } from "@/store/use-user-store";
import { useI18n } from "@/hooks/use-i18n";
import { Box, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

type Mode = "login" | "register";

export function AuthScreen({ initialMode = "login" }: { initialMode?: Mode }) {
  const router = useRouter();
  const { t } = useI18n();
  const { login, register, loginAs } = useUserStore();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"USER" | "COURIER">("USER");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel = [
    t("auth.pwdWeak"),
    t("auth.pwdOk"),
    t("auth.pwdGood"),
    t("auth.pwdStrong"),
  ][Math.max(0, strength - 1)];

  const goAfterAuth = (nextRole?: UserRole) => {
    if (nextRole === "ADMIN") router.push("/admin");
    else if (nextRole === "COURIER") router.push("/courier");
    else router.push("/dashboard");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const result = login(email, password);
    setIsLoading(false);
    if (!result.ok) {
      setError(t(result.error || "auth.error"));
      return;
    }
    const current = useUserStore.getState().user;
    goAfterAuth(current.role);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = register({ name, email, phone, password, role });
    if (!result.ok) {
      setError(t(result.error || "auth.error"));
      return;
    }
    goAfterAuth(role);
  };

  const handleDemo = (demoRole: UserRole) => {
    loginAs(demoRole);
    goAfterAuth(demoRole);
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center px-4 bg-[#161411]">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-[#1E1B17] border border-white/10 p-7 space-y-5">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-[#C45C26] flex items-center justify-center text-white">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-semibold text-lg text-white">AETHER</span>
            </Link>
            <h1 className="text-2xl text-white mt-1">
              {mode === "login" ? t("auth.loginTitle") : t("auth.registerTitle")}
            </h1>
            <p className="text-sm text-zinc-400">
              {mode === "login" ? t("auth.loginHint") : t("auth.registerHint")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-black/30 border border-white/5">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`py-2 rounded-md text-xs font-semibold ${
                mode === "login" ? "bg-[#C45C26] text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("auth.enter")}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`py-2 rounded-md text-xs font-semibold ${
                mode === "register" ? "bg-[#C45C26] text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("auth.create")}
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-wide text-zinc-500">{t("auth.demo")}</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo("USER")}
                className="py-2 rounded-md border border-white/10 text-[11px] text-zinc-200 hover:bg-white/5"
              >
                {t("auth.demoUser")}
              </button>
              <button
                type="button"
                onClick={() => handleDemo("COURIER")}
                className="py-2 rounded-md border border-white/10 text-[11px] text-zinc-200 hover:bg-white/5"
              >
                {t("auth.demoCourier")}
              </button>
              <button
                type="button"
                onClick={() => handleDemo("ADMIN")}
                className="py-2 rounded-md border border-white/10 text-[11px] text-zinc-200 hover:bg-white/5"
              >
                {t("auth.demoAdmin")}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] text-zinc-500">{t("auth.orEmail")}</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <Field
                label={t("auth.email")}
                icon={<Mail className="w-4 h-4" />}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="user@aether.uz"
              />
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-zinc-300">{t("auth.password")}</label>
                  <Link href="/auth/forgot-password" className="text-[11px] text-[#E08A5A] hover:underline">
                    {t("auth.forgot")}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-sm"
                    placeholder="user / courier / admin"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded accent-[#C45C26]"
                />
                {t("auth.remember")}
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-btn py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                {isLoading ? t("auth.loading") : t("auth.submitLogin")}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-black/30 border border-white/5">
                <button
                  type="button"
                  onClick={() => setRole("USER")}
                  className={`py-2 rounded-md text-xs font-semibold ${
                    role === "USER" ? "bg-[#C45C26] text-white" : "text-zinc-400"
                  }`}
                >
                  {t("auth.client")}
                </button>
                <button
                  type="button"
                  onClick={() => setRole("COURIER")}
                  className={`py-2 rounded-md text-xs font-semibold ${
                    role === "COURIER" ? "bg-[#C45C26] text-white" : "text-zinc-400"
                  }`}
                >
                  {t("auth.courier")}
                </button>
              </div>
              <Field
                label={t("auth.name")}
                icon={<User className="w-4 h-4" />}
                value={name}
                onChange={setName}
                placeholder="Nodira Aliyeva"
              />
              <Field
                label={t("auth.email")}
                icon={<Mail className="w-4 h-4" />}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="name@mail.uz"
              />
              <Field
                label={t("auth.phone")}
                icon={<Phone className="w-4 h-4" />}
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="+998 90 123 45 67"
              />
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1.5">{t("auth.password")}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
                {password.length > 0 && (
                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500">{t("auth.password")}</span>
                      <span className="text-[#E08A5A]">{strengthLabel}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 h-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-full rounded-sm ${strength >= step ? "bg-[#C45C26]" : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <label className="flex items-start gap-2 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded accent-[#C45C26] mt-0.5"
                />
                {t("auth.terms")}
              </label>
              <button
                type="submit"
                className="w-full gradient-btn py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                {t("auth.submitRegister")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-zinc-300 block mb-1.5">{label}</label>
      <div className="relative">
        <span className="text-zinc-400 absolute left-3.5 top-3">{icon}</span>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
