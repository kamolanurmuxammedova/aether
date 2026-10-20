"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { useUserStore } from "@/store/use-user-store";
import { CATEGORIES, SPEED_TIERS, VEHICLE_OPTIONS, PRESET_ADDRESSES } from "@/lib/constants";
import { PackageCategory, SpeedTier, CourierVehicle, Coordinates } from "@/types";
import { DeliveryMap } from "@/components/map/DeliveryMap";
import { formatCurrency } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Package,
  MapPin,
  Zap,
  Shield,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  Clock,
  Camera,
  Car,
  Bike,
  Truck,
  Compass,
  User,
  Wallet,
  Lock,
} from "lucide-react";

function BookDeliveryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("category") as PackageCategory) || "ELECTRONICS";

  const {
    category,
    speedTier,
    vehicle,
    pickupAddress,
    pickupCoords,
    pickupContactName,
    pickupContactPhone,
    dropoffAddress,
    dropoffCoords,
    dropoffContactName,
    dropoffContactPhone,
    notes,
    weightKg,
    declaredValue,
    insuranceTier,
    packagePhotoUrl,
    setCategory,
    setSpeedTier,
    setVehicle,
    setPickup,
    setDropoff,
    setNotes,
    setWeight,
    setDeclaredValue,
    setInsurance,
    setPackagePhoto,
    calculatePricing,
    createOrder,
  } = useOrderStore();

  const { walletBalance, deductWallet } = useUserStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [docName, setDocName] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState("Today, 18:30");
  const [paymentMethod, setPaymentMethod] = useState<"STRIPE" | "VAULT" | "APPLE_PAY">("STRIPE");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("981");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address local form state
  const [pAddr, setPAddr] = useState(pickupAddress);
  const [pName, setPName] = useState(pickupContactName);
  const [pPhone, setPPhone] = useState(pickupContactPhone);

  const [dAddr, setDAddr] = useState(dropoffAddress);
  const [dName, setDName] = useState(dropoffContactName);
  const [dPhone, setDPhone] = useState(dropoffContactPhone);

  const pricing = calculatePricing();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fakeUrl = URL.createObjectURL(file);
      setPhotoPreview(fakeUrl);
      setPackagePhoto(fakeUrl);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocName(e.target.files[0].name);
    }
  };

  const handlePresetPickup = (presetId: string) => {
    const found = PRESET_ADDRESSES.find((a) => a.id === presetId);
    if (found) {
      setPAddr(found.fullAddress);
      setPickup(found.fullAddress, found.coords);
    }
  };

  const handlePresetDropoff = (presetId: string) => {
    const found = PRESET_ADDRESSES.find((a) => a.id === presetId);
    if (found) {
      setDAddr(found.fullAddress);
      setDropoff(found.fullAddress, found.coords);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 2) {
      setPickup(pAddr, pickupCoords, pName, pPhone);
      setDropoff(dAddr, dropoffCoords, dName, dPhone);
    }
    setCurrentStep((s) => Math.min(5, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalDispatch = async () => {
    setIsSubmitting(true);

    if (paymentMethod === "VAULT") {
      deductWallet(pricing.total, `Hyperspeed Dispatch Order`);
    }

    // Trigger luxury celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#7C3AED", "#6366F1", "#10B981", "#FFFFFF"],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      const newOrder = createOrder();
      setIsSubmitting(false);
      router.push(`/track?order=${newOrder.orderNumber}`);
    }, 1200);
  };

  const stepsList = [
    { num: 1, label: "Cargo Details" },
    { num: 2, label: "Waypoints & Map" },
    { num: 3, label: "Speed & Fleet" },
    { num: 4, label: "Security & Notes" },
    { num: 5, label: "Payment & Launch" },
  ];

  return (
    <div className="py-12 bg-[#09090B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {stepsList.map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all shadow-md ${
                        isCurrent
                          ? "gradient-btn text-white scale-110 shadow-purple-500/30 ring-2 ring-purple-500/40"
                          : isPast
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-white/[0.04] text-zinc-500 border border-white/5"
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                    </div>
                    {step.num < 5 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 rounded-full transition-colors ${
                          isPast ? "bg-emerald-500/40" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[11px] mt-2 font-medium hidden sm:block ${
                      isCurrent ? "text-white font-bold" : "text-zinc-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Step Area */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
            {/* STEP 1: CARGO DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    Step 1 of 5
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Select Cargo Class & Characteristics
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Choose what you are dispatching to ensure the optimal certified courier and vehicle container.
                  </p>
                </div>

                {/* Categories Grid */}
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
                    Cargo Classification (12 Options)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex flex-col justify-between h-24 ${
                          category === cat.id
                            ? "bg-purple-600/30 border-purple-500 text-white shadow-md shadow-purple-600/30"
                            : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <span className="font-bold text-sm block leading-tight">{cat.name.split(" ")[0]}</span>
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                          <span>${cat.basePrice.toFixed(2)} base</span>
                          {cat.popular && <Sparkles className="w-3 h-3 text-amber-400" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight & Declared Value */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-white/5">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                      Approximate Weight (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        max="1500"
                        step="0.5"
                        value={weightKg}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full glass-input rounded-2xl px-4 py-3 text-sm font-mono text-white"
                      />
                      <span className="absolute right-4 top-3 text-xs text-zinc-500 font-mono">KG</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                      Declared Asset Valuation (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-xs text-zinc-500 font-mono">$</span>
                      <input
                        type="number"
                        min="50"
                        max="250000"
                        step="100"
                        value={declaredValue}
                        onChange={(e) => setDeclaredValue(Number(e.target.value))}
                        className="w-full glass-input rounded-2xl pl-8 pr-4 py-3 text-sm font-mono text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo & Document Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="border border-dashed border-white/10 rounded-2xl p-4 text-center hover:border-purple-500/40 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      id="package-photo"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label htmlFor="package-photo" className="cursor-pointer space-y-2 block">
                      {photoPreview ? (
                        <div className="space-y-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photoPreview}
                            alt="Package"
                            className="w-20 h-20 object-cover mx-auto rounded-xl border border-white/20"
                          />
                          <span className="text-[11px] text-emerald-400 font-semibold block">Photo Uploaded</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-6 h-6 text-indigo-400 mx-auto" />
                          <div className="text-xs font-semibold text-white">Upload Package Photo</div>
                          <div className="text-[10px] text-zinc-500">Seal check & proof</div>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="border border-dashed border-white/10 rounded-2xl p-4 text-center hover:border-purple-500/40 transition-colors">
                    <input
                      type="file"
                      id="package-doc"
                      onChange={handleDocUpload}
                      className="hidden"
                    />
                    <label htmlFor="package-doc" className="cursor-pointer space-y-2 block">
                      {docName ? (
                        <div className="space-y-1">
                          <FileText className="w-6 h-6 text-emerald-400 mx-auto" />
                          <div className="text-xs font-semibold text-white truncate max-w-[200px] mx-auto">
                            {docName}
                          </div>
                          <span className="text-[10px] text-emerald-400">Attached to Order</span>
                        </div>
                      ) : (
                        <>
                          <FileText className="w-6 h-6 text-purple-400 mx-auto" />
                          <div className="text-xs font-semibold text-white">Upload Document / Waybill</div>
                          <div className="text-[10px] text-zinc-500">PDF, scanned deed, invoice</div>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: WAYPOINTS & INTERACTIVE MAP */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    Step 2 of 5
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Route Waypoints & Geospatial Pinning
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Pin accurate building entrances, lobby access codes, and recipient contact details.
                  </p>
                </div>

                {/* Interactive Map */}
                <DeliveryMap
                  pickup={pickupCoords}
                  dropoff={dropoffCoords}
                  eta="14 mins"
                  distanceKm={4.8}
                  className="h-64 w-full"
                />

                {/* Origin Details */}
                <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" /> 1. Origin (Pickup Address)
                    </div>
                    {/* Presets */}
                    <div className="flex gap-1.5">
                      {PRESET_ADDRESSES.slice(0, 2).map((addr) => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => handlePresetPickup(addr.id)}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                        >
                          {addr.title.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={pAddr}
                    onChange={(e) => setPAddr(e.target.value)}
                    placeholder="Enter pickup street address..."
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <input
                      type="text"
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      placeholder="Contact Name at Pickup"
                      className="glass-input rounded-xl px-4 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={pPhone}
                      onChange={(e) => setPPhone(e.target.value)}
                      placeholder="Contact Phone (+1 ...)"
                      className="glass-input rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Destination Details */}
                <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" /> 2. Destination (Dropoff Address)
                    </div>
                    <div className="flex gap-1.5">
                      {PRESET_ADDRESSES.slice(2, 4).map((addr) => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => handlePresetDropoff(addr.id)}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                        >
                          {addr.title.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={dAddr}
                    onChange={(e) => setDAddr(e.target.value)}
                    placeholder="Enter dropoff street address..."
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <input
                      type="text"
                      value={dName}
                      onChange={(e) => setDName(e.target.value)}
                      placeholder="Recipient Full Name"
                      className="glass-input rounded-xl px-4 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={dPhone}
                      onChange={(e) => setDPhone(e.target.value)}
                      placeholder="Recipient Phone (+1 ...)"
                      className="glass-input rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: SPEED & FLEET VEHICLE */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    Step 3 of 5
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Velocity Tier & Courier Fleet Class
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Select how urgently your package must arrive and the vehicle configuration.
                  </p>
                </div>

                {/* Speed Tiers */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Choose Delivery Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SPEED_TIERS.map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => setSpeedTier(tier.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          speedTier === tier.id
                            ? "bg-purple-600/20 border-purple-500 shadow-md shadow-purple-600/20"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white">{tier.title}</span>
                          <span className="text-xs font-mono text-emerald-400">{tier.eta}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                          {tier.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/5 font-mono">
                          <span>{tier.priceMultiplier}x Base Rate</span>
                          {tier.badge && (
                            <span className="text-purple-400 font-semibold">{tier.badge}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scheduled Slot Input if SCHEDULED is selected */}
                {speedTier === "SCHEDULED" && (
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                    <label className="text-xs font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" /> Specify Exact 15-Minute Window
                    </label>
                    <input
                      type="text"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                      placeholder="e.g. Today at 19:45 EST"
                    />
                  </div>
                )}

                {/* Vehicle Selection */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Assigned Fleet Vehicle Model
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {VEHICLE_OPTIONS.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicle(v.id)}
                        className={`p-3.5 rounded-2xl text-left border text-xs transition-all ${
                          vehicle === v.id
                            ? "bg-indigo-600/30 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                            : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="font-bold text-white text-xs mb-1">{v.name}</div>
                        <div className="text-[10px] text-indigo-400 font-mono">{v.speed}</div>
                        <div className="text-[10px] text-zinc-500 mt-1">{v.capacity}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: SECURITY & NOTES */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    Step 4 of 5
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Security Protocols & Insurance Tier
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Specify security clearance, tamper-evident seals, and courier dropoff instructions.
                  </p>
                </div>

                {/* Insurance Tier */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Cargo Protection Underwriting
                  </label>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: "NONE",
                        title: "Standard Baseline Protection",
                        price: "Included ($0)",
                        desc: "Basic carrier liability up to $500 with digital photo confirmation.",
                      },
                      {
                        id: "STANDARD",
                        title: "Lloyd's Shield Cover",
                        price: "+$6.00",
                        desc: "Underwritten asset protection up to $25,000 USD with vibration telemetry logs.",
                      },
                      {
                        id: "CONCIERGE_TOTAL",
                        title: "Concierge Total Replacement Guarantee",
                        price: "+$18.00",
                        desc: "Complete zero-deductible replacement up to $250,000 USD with tamper seal biometric locks.",
                      },
                    ].map((ins) => (
                      <div
                        key={ins.id}
                        onClick={() =>
                          setInsurance(ins.id as "NONE" | "STANDARD" | "CONCIERGE_TOTAL")
                        }
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          insuranceTier === ins.id
                            ? "bg-purple-600/20 border-purple-500 shadow-md"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{ins.title}</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">{ins.desc}</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-indigo-400 whitespace-nowrap ml-4">
                          {ins.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes for Courier */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Courier Access Notes & Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Ring concierge desk, request elevator keycard for 14th floor, do not leave unattended."
                    className="w-full glass-input rounded-2xl p-4 text-xs text-white placeholder-zinc-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: PAYMENT & LAUNCH */}
            {currentStep === 5 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    Step 5 of 5
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Confirm Dispatch & Settlement
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Select payment method. All transactions are cryptographically signed and secured via Stripe Vault.
                  </p>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("STRIPE")}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      paymentMethod === "STRIPE"
                        ? "bg-purple-600/30 border-purple-500 text-white"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-indigo-400" />
                    <span className="text-xs font-bold block">Credit Card</span>
                    <span className="text-[10px] text-zinc-500">Stripe Vault</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("VAULT")}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      paymentMethod === "VAULT"
                        ? "bg-purple-600/30 border-purple-500 text-white"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Wallet className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                    <span className="text-xs font-bold block">Aether Vault</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {formatCurrency(walletBalance)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("APPLE_PAY")}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      paymentMethod === "APPLE_PAY"
                        ? "bg-purple-600/30 border-purple-500 text-white"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Zap className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                    <span className="text-xs font-bold block">Apple Pay</span>
                    <span className="text-[10px] text-zinc-500">Instant Touch</span>
                  </button>
                </div>

                {/* Simulated Stripe Card Fields */}
                {paymentMethod === "STRIPE" && (
                  <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full glass-input rounded-xl px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">CVC Code</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full glass-input rounded-xl px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Dispatch Security Notice */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-start gap-3">
                  <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Immediate Corridor Clearance</span>
                    <span className="text-zinc-400 text-[11px]">
                      Upon clicking &apos;Execute Dispatch&apos;, your priority green corridor will be locked with nearest vehicle arrival in ~90 seconds.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-zinc-300 flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="gradient-btn px-7 py-3 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-lg"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalDispatch}
                  className="gradient-btn px-8 py-3.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-spin text-amber-400" />
                      Locking Green Corridor...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Execute Quantum Dispatch ({formatCurrency(pricing.total)})
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Live Order Receipt Summary */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Corridor Manifest
              </span>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Live Dynamic
              </span>
            </div>

            {/* Quick Manifest Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Class</span>
                <span className="text-white font-semibold">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Velocity</span>
                <span className="text-emerald-400 font-mono font-semibold">{speedTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vehicle</span>
                <span className="text-white">{vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Estimated Distance</span>
                <span className="text-white font-mono">{pricing.distanceKm} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">ETA</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  ~{pricing.estimatedMin} mins
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Weight</span>
                <span className="text-white font-mono">{weightKg} kg</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Base Corridors</span>
                <span className="font-mono text-white">${pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Underwriting Protection</span>
                <span className="font-mono text-indigo-400">+${pricing.insurance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Surge Factor</span>
                <span className="font-mono text-zinc-500">$0.00 (Locked)</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">Total Net Rate</span>
                <span className="text-2xl font-black text-white font-mono">
                  {formatCurrency(pricing.total)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 font-mono block">Zero Hidden Fees</span>
                <span className="text-[11px] text-zinc-400">VAT & Taxes Incl.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 justify-center">
              <Lock className="w-3.5 h-3.5 text-indigo-400" /> End-to-end 256-bit encrypted telemetry
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookDeliveryPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-zinc-400">
          Loading Dispatch Wizard...
        </div>
      }
    >
      <BookDeliveryContent />
    </React.Suspense>
  );
}
