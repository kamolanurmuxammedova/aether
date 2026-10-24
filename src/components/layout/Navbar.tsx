"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { formatCurrency } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/hooks/use-i18n";
import {
  Box,
  Search,
  Bell,
  Wallet,
  Shield,
  Truck,
  User,
  Menu,
  X,
  ArrowRight,
  LogOut,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();
  const {
    user,
    isAuthenticated,
    walletBalance,
    notifications,
    setIsSearchOpen,
    markAllNotificationsRead,
    logout,
  } = useUserStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: t("nav.book"), href: "/book" },
    { label: t("nav.track"), href: "/track" },
    ...(isAuthenticated ? [{ label: t("nav.dashboard"), href: "/dashboard" }] : []),
    ...(isAuthenticated && (user.role === "COURIER" || user.role === "ADMIN")
      ? [{ label: t("nav.courier"), href: "/courier" }]
      : []),
    ...(isAuthenticated && user.role === "ADMIN"
      ? [{ label: t("nav.admin"), href: "/admin" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#161411]/92 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-md bg-[#C45C26] flex items-center justify-center text-white">
            <Box className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-base text-white">AETHER</span>
            <span className="text-[10px] text-zinc-500 border border-white/10 px-1.5 py-0.5 rounded">
              {t("brand.tag")}
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <ThemeToggle />

          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label={t("nav.search")}
            className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          >
            <Search className="w-4 h-4" />
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                title={t("nav.balance")}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] border border-white/10"
              >
                <Wallet className="w-3.5 h-3.5 text-zinc-400" />
                <span>{formatCurrency(walletBalance)}</span>
              </Link>

              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    setIsProfileOpen(false);
                  }}
                  aria-label={t("nav.notifications")}
                  className="relative p-2 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#C45C26]" />
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-lg bg-[#1E1B17] border border-white/10 shadow-xl p-4 z-50">
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
                      <span className="text-xs font-semibold text-white">{t("nav.notifications")}</span>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[10px] text-zinc-400 hover:text-white"
                      >
                        {t("nav.readAll")}
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-md border text-xs ${
                            n.read
                              ? "border-white/5 text-zinc-400"
                              : "bg-[#C45C26]/10 border-[#C45C26]/20 text-zinc-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-white text-[11px]">{n.title}</span>
                            <span className="text-[9px] text-zinc-500">{n.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotifOpen(false);
                  }}
                  aria-label={t("nav.profile")}
                  className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-zinc-200"
                >
                  {user.name.charAt(0)}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1E1B17] border border-white/10 shadow-xl p-3 z-50">
                    <div className="pb-2.5 border-b border-white/10 mb-2">
                      <div className="text-xs font-semibold text-white">{user.name}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{user.email}</div>
                      <div className="mt-1 text-[10px] text-[#E08A5A]">{user.role}</div>
                    </div>
                    <div className="space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-zinc-300 hover:bg-white/5"
                      >
                        <User className="w-3.5 h-3.5" /> {t("nav.dashboard")}
                      </Link>
                      {user.role === "COURIER" && (
                        <Link
                          href="/courier"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-zinc-300 hover:bg-white/5"
                        >
                          <Truck className="w-3.5 h-3.5" /> {t("nav.courier")}
                        </Link>
                      )}
                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-zinc-300 hover:bg-white/5"
                        >
                          <Shield className="w-3.5 h-3.5" /> {t("nav.admin")}
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                          router.push("/auth/login");
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-red-400 hover:bg-red-500/10 border-t border-white/10 mt-1 pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5" /> {t("nav.logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <Link
                href="/auth/login"
                className="px-3 py-1.5 rounded-md text-xs font-semibold text-zinc-200 border border-white/10 hover:bg-white/5"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/auth/register"
                className="px-3 py-1.5 rounded-md text-xs font-semibold gradient-btn"
              >
                {t("nav.register")}
              </Link>
            </div>
          )}

          <Link
            href="/book"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold gradient-btn"
          >
            <span>{t("nav.call")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t("nav.menu")}
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-[#161411] border-b border-white/10 space-y-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 rounded-md text-center text-xs border border-white/10"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 rounded-md text-center text-xs gradient-btn"
              >
                {t("nav.register")}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
