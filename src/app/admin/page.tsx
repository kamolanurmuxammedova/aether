"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useUserStore, UserRole } from "@/store/use-user-store";
import { useI18n } from "@/hooks/use-i18n";
import {
  Package,
  Search,
  FileText,
  BarChart3,
  Truck,
  Users,
  Settings,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function AdminHubPage() {
  const { t } = useI18n();
  const { user, accounts, loginAs, updateAccountRole, toggleAccountStatus } = useUserStore();
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "couriers" | "users" | "settings"
  >("overview");
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  if (user.role !== "ADMIN") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-[#1E1B17] border border-white/10 p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-lg border border-white/10 text-[#E08A5A] flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl text-white">{t("admin.lockTitle")}</h1>
            <p className="text-sm text-zinc-400">{t("admin.lockHint")}</p>
          </div>
          <button
            type="button"
            onClick={() => loginAs("ADMIN")}
            className="w-full gradient-btn py-2.5 rounded-lg text-sm font-semibold"
          >
            {t("admin.demoEnter")}
          </button>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1">
            {t("admin.back")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const mockAdminOrders = [
    {
      id: "AETH-982XF",
      client: "Анна Соколова",
      courier: "Жасур Рахимов",
      status: "transit",
      amount: 12.5,
      corridor: "Мирабад → Юнусабад",
    },
    {
      id: "AETH-714ML",
      client: "Dilnoza Karimova",
      courier: "Азиз Турсунов",
      status: "done",
      amount: 8.0,
      corridor: "Чиланзар → Сергели",
    },
    {
      id: "AETH-309BC",
      client: "Cafe Siesta",
      courier: "Нигора Каримова",
      status: "pickup",
      amount: 15.0,
      corridor: "Ц-1 → Мирзо-Улугбек",
    },
    {
      id: "AETH-882ZX",
      client: "Apteka 36.6",
      courier: "Жасур Рахимов",
      status: "transit",
      amount: 9.4,
      corridor: "Юнусабад → Алмазар",
    },
  ];

  const mockCouriers = [
    { id: "CUR-01", name: "Жасур Рахимов", vehicle: "Moto Honda", rating: 4.9, jobs: 840, status: "onroute", location: "Юнусабад" },
    { id: "CUR-02", name: "Азиз Турсунов", vehicle: "Cobalt", rating: 4.8, jobs: 610, status: "available", location: "Мирабад" },
    { id: "CUR-03", name: "Malika Yusupova", vehicle: "Labo", rating: 4.9, jobs: 420, status: "pickup", location: "Чиланзар" },
    { id: "CUR-04", name: "Sardor Aliyev", vehicle: "Piyoda", rating: 5.0, jobs: 190, status: "available", location: "Ц-1" },
  ];

  const filteredOrders = mockAdminOrders.filter((o) => {
    if (orderFilter !== "ALL" && o.status !== orderFilter) return false;
    if (
      searchTerm &&
      !o.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !o.client.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const statusLabel = (s: string) => {
    if (s === "transit" || s === "onroute") return t("status.transit");
    if (s === "done") return t("status.done");
    if (s === "pickup") return t("status.pickup");
    if (s === "available") return t("status.available");
    return s;
  };

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-xl bg-[#1E1B17] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-white">{t("admin.title")}</h1>
            <p className="text-sm text-zinc-400 mt-1">{t("admin.subtitle")}</p>
          </div>
          <button
            onClick={() => alert("CSV")}
            className="gradient-btn px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {t("admin.export")}
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { k: t("admin.kpi.gmv"), v: "$84,200" },
            { k: t("admin.kpi.live"), v: "37" },
            { k: t("admin.kpi.fleet"), v: "124" },
            { k: t("admin.kpi.sla"), v: "96%" },
          ].map((item) => (
            <div key={item.k} className="p-5 rounded-xl bg-[#1E1B17] border border-white/10">
              <span className="text-[11px] text-zinc-500 block">{item.k}</span>
              <div className="text-2xl font-semibold text-white mt-1">{item.v}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto">
          {[
            { id: "overview", label: t("admin.tab.overview"), icon: BarChart3 },
            { id: "orders", label: t("admin.tab.orders"), icon: Package },
            { id: "couriers", label: t("admin.tab.couriers"), icon: Truck },
            { id: "users", label: t("admin.tab.users"), icon: Users },
            { id: "settings", label: t("admin.tab.settings"), icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  isActive
                    ? "border-[#C45C26] text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-[#1E1B17] border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-4">{t("admin.chart")}</h3>
              <svg viewBox="0 0 400 140" className="w-full h-40">
                <path
                  d="M 10 110 L 80 95 L 150 88 L 220 60 L 290 48 L 360 30"
                  fill="none"
                  stroke="#C45C26"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div className="p-6 rounded-xl bg-[#1E1B17] border border-white/10 space-y-3">
              {[
                { name: t("cat.food"), pct: "32%" },
                { name: t("cat.documents"), pct: "24%" },
                { name: t("cat.electronics"), pct: "18%" },
                { name: t("cat.medicine"), pct: "14%" },
                { name: t("cat.fragile"), pct: "12%" },
              ].map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1">
                    <span>{c.name}</span>
                    <span>{c.pct}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div style={{ width: c.pct }} className="h-full bg-[#C45C26]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("admin.search")}
                  className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-xs"
                />
              </div>
              <div className="flex items-center gap-1 self-start">
                {[
                  { id: "ALL", label: t("admin.filter.all") },
                  { id: "transit", label: t("admin.filter.transit") },
                  { id: "done", label: t("admin.filter.done") },
                  { id: "pickup", label: t("admin.filter.pickup") },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderFilter(st.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                      orderFilter === st.id ? "bg-[#C45C26] text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-[#1E1B17] border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead className="border-b border-white/10 text-zinc-500">
                  <tr>
                    <th className="p-4">{t("admin.col.id")}</th>
                    <th className="p-4">{t("admin.col.client")}</th>
                    <th className="p-4">{t("admin.col.route")}</th>
                    <th className="p-4">{t("admin.col.courier")}</th>
                    <th className="p-4">{t("admin.col.status")}</th>
                    <th className="p-4">{t("admin.col.sum")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="p-4 font-medium text-white">{ord.id}</td>
                      <td className="p-4">{ord.client}</td>
                      <td className="p-4 text-zinc-400">{ord.corridor}</td>
                      <td className="p-4">{ord.courier}</td>
                      <td className="p-4">{statusLabel(ord.status)}</td>
                      <td className="p-4 text-white">{formatCurrency(ord.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "couriers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockCouriers.map((cur) => (
              <div key={cur.id} className="p-5 rounded-xl bg-[#1E1B17] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{cur.name}</h4>
                    <p className="text-xs text-zinc-400">{cur.vehicle}</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {statusLabel(cur.status)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-white/10">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">★</span>
                    <span className="text-amber-400">{cur.rating}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">{t("admin.tab.orders")}</span>
                    <span className="text-white">{cur.jobs}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">{cur.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "users" && (
          <div className="rounded-xl bg-[#1E1B17] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[640px]">
              <thead className="border-b border-white/10 text-zinc-500">
                <tr>
                  <th className="p-4">{t("admin.users.name")}</th>
                  <th className="p-4">{t("admin.users.email")}</th>
                  <th className="p-4">{t("admin.users.role")}</th>
                  <th className="p-4">{t("admin.users.status")}</th>
                  <th className="p-4">{t("admin.users.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {accounts.map((acc) => (
                  <tr key={acc.id}>
                    <td className="p-4 text-white">{acc.name}</td>
                    <td className="p-4 text-zinc-400">{acc.email}</td>
                    <td className="p-4">
                      <select
                        value={acc.role}
                        onChange={(e) => updateAccountRole(acc.id, e.target.value as UserRole)}
                        className="bg-[#161411] border border-white/10 rounded-md px-2 py-1 text-xs text-white"
                      >
                        <option value="USER">{t("admin.role.USER")}</option>
                        <option value="COURIER">{t("admin.role.COURIER")}</option>
                        <option value="ADMIN">{t("admin.role.ADMIN")}</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <span className={acc.status === "active" ? "text-emerald-400" : "text-red-400"}>
                        {acc.status === "active" ? t("admin.users.active") : t("admin.users.blocked")}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => toggleAccountStatus(acc.id)}
                        className="text-xs border border-white/10 rounded-md px-2 py-1 hover:bg-white/5"
                      >
                        {acc.status === "active" ? t("admin.users.block") : t("admin.users.unblock")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="p-6 rounded-xl bg-[#1E1B17] border border-white/10 space-y-4 max-w-lg">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">{t("admin.settings.city")}</label>
              <input className="w-full glass-input rounded-lg px-3 py-2 text-sm" defaultValue="Toshkent" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">{t("admin.settings.hours")}</label>
              <input className="w-full glass-input rounded-lg px-3 py-2 text-sm" defaultValue="08:00–23:00" />
            </div>
            <p className="text-xs text-zinc-500">{t("admin.settings.note")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
