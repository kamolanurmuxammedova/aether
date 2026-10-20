"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { formatCurrency } from "@/lib/utils";
import {
  Zap,
  Search,
  Bell,
  Wallet,
  Shield,
  Truck,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Plus,
  Compass,
  ArrowRight,
  LogOut,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const {
    user,
    walletBalance,
    notifications,
    topUpWallet,
    switchRole,
    setIsSearchOpen,
    markAllNotificationsRead,
  } = useUserStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: "Book Delivery", href: "/book" },
    { label: "Live Telemetry", href: "/track" },
    { label: "Client Portal", href: "/dashboard" },
    ...(user.role === "COURIER" || user.role === "ADMIN"
      ? [{ label: "Courier Console", href: "/courier" }]
      : []),
    ...(user.role === "ADMIN"
      ? [{ label: "Admin Hub", href: "/admin" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090B]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <div className="w-full h-full bg-[#09090B] rounded-[15px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">AETHER</span>
              <span className="text-[10px] tracking-widest uppercase bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full font-mono border border-indigo-500/30">
                Logistics
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-medium -mt-0.5 hidden sm:inline-block">
              Autonomous Hyper-Courier
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.06]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Shortcut */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-400 hover:text-zinc-200 text-xs transition-colors"
          >
            <Search className="w-4 h-4 text-zinc-400" />
            <span>Search...</span>
            <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-300 font-mono">⌘K</kbd>
          </button>

          {/* Wallet Balance Pill */}
          <Link
            href="/dashboard"
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#111217] hover:bg-white/[0.05] border border-white/10 shadow-sm transition-colors group"
          >
            <Wallet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider leading-none">Vault</span>
              <span className="text-xs font-bold text-white font-mono leading-tight">
                {formatCurrency(walletBalance)}
              </span>
            </div>
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#09090B]" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-[#111217] border border-white/10 shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-zinc-400 hover:text-indigo-400"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-2xl border text-xs transition-colors ${
                        n.read
                          ? "bg-white/[0.02] border-white/5 text-zinc-400"
                          : "bg-indigo-500/10 border-indigo-500/20 text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{n.title}</span>
                        <span className="text-[10px] text-zinc-500">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">{user.name}</span>
                <span className="text-[10px] text-indigo-400 font-mono leading-tight">{user.role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-3xl bg-[#111217] border border-white/10 shadow-2xl p-4 z-50">
                <div className="pb-3 border-b border-white/10 mb-3">
                  <div className="text-sm font-bold text-white">{user.name}</div>
                  <div className="text-xs text-zinc-400 truncate">{user.email}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/30">
                    <Sparkles className="w-3 h-3" /> {user.tier}
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4 text-zinc-400" /> Client Portal
                  </Link>

                  {user.role === "COURIER" && (
                    <Link
                      href="/courier"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Truck className="w-4 h-4 text-zinc-400" /> Courier Panel
                    </Link>
                  )}

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Shield className="w-4 h-4 text-zinc-400" /> Admin Console
                    </Link>
                  )}

                  <Link
                    href="/auth/login"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors pt-2 border-t border-white/5"
                  >
                    <LogOut className="w-4 h-4 text-red-400" /> Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <Link
            href="/book"
            className="hidden sm:flex gradient-btn px-4 py-2.5 rounded-2xl text-xs font-bold text-white items-center gap-1.5"
          >
            <span>Dispatch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#09090B] border-b border-white/10 space-y-2 animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="gradient-btn w-full py-3 rounded-2xl text-center text-sm font-bold text-white"
            >
              Instant Dispatch Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
