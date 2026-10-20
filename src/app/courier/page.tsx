"use client";

import React, { useState } from "react";
import { DeliveryMap } from "@/components/map/DeliveryMap";
import { formatCurrency } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import Link from "next/link";
import {
  Bike,
  DollarSign,
  Zap,
  ShieldCheck,
  Power,
  Navigation,
  Clock,
  Star,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  ArrowUpRight,
  BatteryCharging,
  Thermometer,
  Bell,
  AlertCircle,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function CourierPanelPage() {
  const { user, switchRole } = useUserStore();
  const [courierKey, setCourierKey] = useState("");
  const [keyError, setKeyError] = useState(false);

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<"RADAR" | "EARNINGS" | "VEHICLE" | "DOCS">("RADAR");
  const [walletBalance, setWalletBalance] = useState(1420.5);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("500");

  const handleElevateCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (courierKey === "AETHER-FLEET-2026" || courierKey.toLowerCase() === "courier") {
      switchRole("COURIER");
      setKeyError(false);
    } else {
      setKeyError(true);
    }
  };

  // Role Access Guard for Courier Console
  if (user.role !== "COURIER" && user.role !== "ADMIN") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#09090B] relative overflow-hidden">
        <div className="ambient-glow top-1/3 right-1/3 w-[500px] h-[350px] bg-purple-600/10" />

        <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-white/10 shadow-2xl text-center space-y-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto shadow-lg">
            <Truck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">
              Fleet Operator Terminal
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Courier License Required
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your account is registered as a <span className="text-white font-bold">{user.role}</span>. Accessing live dispatch corridors, turn-by-turn navigation, and vehicle battery telemetry requires an active Courier Fleet ID.
            </p>
          </div>

          <form onSubmit={handleElevateCourier} className="space-y-3 pt-2">
            <div>
              <input
                type="password"
                value={courierKey}
                onChange={(e) => {
                  setCourierKey(e.target.value);
                  setKeyError(false);
                }}
                placeholder="Enter Fleet Access Token (e.g. courier)"
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white text-center font-mono focus:border-purple-500"
              />
              {keyError && (
                <p className="text-[11px] text-red-400 mt-1.5 font-mono">
                  Unrecognized fleet badge token.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full gradient-btn py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" /> Connect To Fleet Console
            </button>
          </form>

          <div className="pt-2 border-t border-white/5">
            <Link
              href="/dashboard"
              className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1"
            >
              Return to Client Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [availableJobs, setAvailableJobs] = useState([
    {
      id: "job_991",
      orderNum: "AETH-412KK",
      cargo: "High-Value Electronics",
      pickup: "Apple 5th Ave",
      dropoff: "15 Central Park West",
      distance: "2.4 km",
      payout: 34.5,
      surge: "+$8.00 Peak",
      expiresIn: 18,
    },
    {
      id: "job_992",
      orderNum: "AETH-551XQ",
      cargo: "Legal Deeds Sealed",
      pickup: "Wall Street Chambers",
      dropoff: "Midtown Legal Towers",
      distance: "6.8 km",
      payout: 48.0,
      surge: "+$12.00 Express",
      expiresIn: 27,
    },
  ]);

  const handleAcceptJob = (jobId: string) => {
    alert("Corridor locked! Telemetry navigation engaged.");
    setAvailableJobs((jobs) => jobs.filter((j) => j.id !== jobId));
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (amt > 0 && amt <= walletBalance) {
      setWalletBalance((b) => b - amt);
      setIsWithdrawOpen(false);
      alert(`Instant withdrawal of $${amt.toFixed(2)} dispatched to your linked Apple Cash debit card.`);
    }
  };

  return (
    <div className="py-8 bg-[#09090B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Fleet Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14151D] via-[#101116] to-[#171822] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-purple-600/30">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Marcus Sterling</h1>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  VIP Fleet Courier #09
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Rating 4.99 ★ • 1,840 completed corridor trips
              </p>
            </div>
          </div>

          {/* Availability Toggle Switch */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-zinc-400 font-mono uppercase block">Fleet Status</span>
              <span
                className={`text-xs font-bold font-mono ${
                  isOnline ? "text-emerald-400" : "text-zinc-500"
                }`}
              >
                {isOnline ? "ONLINE • RECEIVING JOBS" : "OFFLINE"}
              </span>
            </div>

            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`p-3 rounded-2xl flex items-center gap-2.5 font-bold text-xs transition-all shadow-lg ${
                isOnline
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-emerald-500/20"
                  : "bg-white/5 text-zinc-400 border border-white/10"
              }`}
            >
              <Power className={`w-4 h-4 ${isOnline ? "text-emerald-400" : "text-zinc-500"}`} />
              <span>{isOnline ? "Go Offline" : "Go Online"}</span>
            </button>
          </div>
        </div>

        {/* Quick Earnings & Telemetry KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Today&apos;s Revenue
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              $348.50
            </div>
            <span className="text-[11px] text-emerald-400 font-mono block">9 trips completed (avg $38.7/hr)</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Withdrawable Balance
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {formatCurrency(walletBalance)}
            </div>
            <button
              onClick={() => setIsWithdrawOpen(true)}
              className="text-[11px] text-indigo-400 hover:text-white font-mono underline block"
            >
              Instant 60-Sec Payout
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Vehicle Battery
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono flex items-center gap-2">
              88% <BatteryCharging className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[11px] text-zinc-500 block">Est Range: 46 km</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Pod Climate Guard
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono flex items-center gap-2">
              4.2°C <Thermometer className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[11px] text-zinc-500 block">Pharma & Thermal Sealed</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          {[
            { id: "RADAR", label: "Active Dispatch Radar", icon: Zap },
            { id: "EARNINGS", label: "Income & Analytics", icon: TrendingUp },
            { id: "VEHICLE", label: "Vehicle Telemetry", icon: Bike },
            { id: "DOCS", label: "KYC & Credentials", icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-purple-600/30 border border-purple-500/40 text-white shadow-md shadow-purple-600/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RADAR */}
        {activeTab === "RADAR" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Live Navigation Map */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-400" /> Urban Navigation Telemetry
              </h2>
              <DeliveryMap
                pickup={{ lat: 40.7638, lng: -73.973 }}
                dropoff={{ lat: 40.7711, lng: -73.9634 }}
                courierPos={{ lat: 40.7674, lng: -73.9682 }}
                courierName="Marcus Sterling"
                vehiclePlate="NY-AE901"
                eta="5 mins"
                distanceKm={2.1}
                className="h-[480px] w-full"
              />
            </div>

            {/* Available Priority Dispatches */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Incoming Dispatches ({availableJobs.length})
                </h2>
                <span className="text-[10px] font-mono text-zinc-500">Auto-refresh: 5s</span>
              </div>

              {availableJobs.length > 0 ? (
                <div className="space-y-3">
                  {availableJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-6 rounded-3xl bg-[#111217] border border-white/10 hover:border-purple-500/40 transition-all space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">{job.orderNum}</span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          Expires in {job.expiresIn}s
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="font-semibold text-white">{job.cargo}</div>
                        <div className="text-zinc-400">
                          {job.pickup} ➔ {job.dropoff}
                        </div>
                        <div className="text-zinc-500 font-mono text-[11px]">
                          Corridor Distance: {job.distance}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-black text-emerald-400 font-mono">
                            ${job.payout.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-zinc-500 block font-mono">{job.surge}</span>
                        </div>

                        <button
                          onClick={() => handleAcceptJob(job.id)}
                          className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg"
                        >
                          Accept Corridor
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-[#111217] border border-white/5 text-center text-xs text-zinc-400 space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p>All high-priority corridors in your sector are covered.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: EARNINGS */}
        {activeTab === "EARNINGS" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Earnings Analytics & Payout History</h2>
            <div className="p-8 rounded-3xl bg-[#111217] border border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-500 uppercase">This Week&apos;s Total</span>
                  <div className="text-4xl font-extrabold text-white font-mono mt-1">$2,180.00</div>
                </div>
                <button
                  onClick={() => setIsWithdrawOpen(true)}
                  className="gradient-btn px-6 py-3 rounded-2xl text-xs font-bold text-white shadow-lg"
                >
                  Withdraw to Apple Cash
                </button>
              </div>

              {/* Weekly bar simulation */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Daily Trip Volume & Payout
                </span>
                <div className="grid grid-cols-7 gap-2 h-44 items-end pt-4">
                  {[
                    { day: "Mon", amt: 290, pct: "60%" },
                    { day: "Tue", amt: 340, pct: "72%" },
                    { day: "Wed", amt: 310, pct: "66%" },
                    { day: "Thu", amt: 410, pct: "88%" },
                    { day: "Fri", amt: 480, pct: "100%" },
                    { day: "Sat", amt: 350, pct: "75%" },
                    { day: "Sun (Today)", amt: 348, pct: "74%" },
                  ].map((d) => (
                    <div key={d.day} className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] font-mono text-zinc-400">${d.amt}</span>
                      <div
                        style={{ height: d.pct }}
                        className="w-full rounded-xl bg-gradient-to-t from-purple-600 to-indigo-500 shadow-lg shadow-purple-600/20 hover:brightness-125 transition-all cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-500">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VEHICLE */}
        {activeTab === "VEHICLE" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Assigned Fleet Hardware Telemetry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Aether Cyber-Rider X</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Active & Calibrated
                  </span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">License Plate</span>
                    <span className="font-mono text-white">NY-AE901</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Firmware</span>
                    <span className="font-mono text-white">v4.8.2 Quantum-OS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Battery Health</span>
                    <span className="font-mono text-emerald-400">99.4% (Tier 1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Odometer</span>
                    <span className="font-mono text-white">8,412 km</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-4">
                <span className="text-sm font-bold text-white">Smart Cargo Pod</span>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Internal Climate</span>
                    <span className="font-mono text-cyan-400">4.2°C (Cold-Chain)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Electronic Tamper Lock</span>
                    <span className="font-mono text-emerald-400">Engaged (PIN-Gated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Gyroscope Vibration Sensor</span>
                    <span className="font-mono text-white">0.02 G (Ultra Stable)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DOCS */}
        {activeTab === "DOCS" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Courier Certifications & Background Check</h2>
            <div className="space-y-3">
              {[
                { title: "Biometric Identity & Facial Match", status: "VERIFIED", date: "Jan 2026" },
                { title: "Federal Criminal Background Screening", status: "CLEARED", date: "Jan 2026" },
                { title: "High-Value Cargo Security Certification", status: "PASSED", date: "Feb 2026" },
                { title: "Electric Fleet Vehicle Commercial Insurance", status: "ACTIVE", date: "Dec 2026" },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#111217] border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">{doc.title}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">Valid until {doc.date}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleWithdraw}
            className="w-full max-w-md p-6 rounded-3xl bg-[#111217] border border-white/10 text-white space-y-4"
          >
            <h3 className="text-base font-bold">Instant Payout Withdrawal</h3>
            <p className="text-xs text-zinc-400">
              Funds will be deposited to your linked debit card or bank account via Stripe Instant Payouts in under 60 seconds.
            </p>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Amount to Withdraw (Available: {formatCurrency(walletBalance)})
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-xs text-zinc-500 font-mono">$</span>
                <input
                  type="number"
                  min="10"
                  max={walletBalance}
                  step="1"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full glass-input rounded-xl pl-8 pr-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsWithdrawOpen(false)}
                className="px-4 py-2 rounded-xl text-xs bg-white/5 text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white"
              >
                Execute Payout
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
