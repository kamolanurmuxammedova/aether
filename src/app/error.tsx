"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("AETHER Runtime Exception:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 bg-[#09090B] text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-xl">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400">
            Error 500 • Telemetry Exception
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Routing Interrupted
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            An unexpected signal variance occurred in the neural dispatch engine. Our autonomous fault-tolerance systems have logged the incident.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="gradient-btn px-6 py-3 rounded-2xl text-xs font-bold text-white flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Recalibrate & Retry
          </button>
          <Link
            href="/"
            className="px-5 py-3 rounded-2xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 border border-white/10"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
