"use client";

import { useState, useMemo } from "react";
import {
  ShieldAlert,
  CheckCircle,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WorkerProfile } from "@/lib/types";

import {
  computeSafeCommitmentCapacity,
  simulateLoanDecision,
} from "@/lib/scoring";
import { formatCurrency } from "@/lib/utils";

interface CommitmentSimulatorProps {
  worker: WorkerProfile;
}

export function CommitmentSimulator({ worker }: CommitmentSimulatorProps) {
  const capacity = useMemo(() => computeSafeCommitmentCapacity(worker), [worker]);

  // Interactive simulation state
  const [loanAmount, setLoanAmount] = useState<number>(
    Math.min(30000, Math.max(10000, capacity.maxRecommendedLoan))
  );
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  const simulation = useMemo(
    () => simulateLoanDecision(worker, loanAmount, tenureMonths),
    [worker, loanAmount, tenureMonths]
  );

  return (
    <Card className="border-navy-100 shadow-card overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-navy-900 to-navy-800 text-white pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                Institutional Underwriting Rail
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-[11px] text-slate-300">
                Explainable Decision Engine
              </span>
            </div>
            <CardTitle className="text-xl sm:text-2xl text-white">
              Safe Borrowing Capacity & Simulator
            </CardTitle>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Systems usually only see that money arrived. CredEnce measures your true
              repayment capacity by stress-testing floor earnings and commitments.
            </p>

          </div>

          <div className="sm:text-right shrink-0 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
            <span className="text-[11px] text-slate-300 uppercase tracking-wide block">
              Safe Monthly EMI Absorption
            </span>
            <span className="text-2xl font-bold text-amber-400">
              {formatCurrency(capacity.safeMonthlyEmiAbsorption)}
              <span className="text-xs text-slate-300 font-normal">/mo</span>
            </span>
            <Badge
              variant="outline"
              className="mt-1 border-white/20 text-white text-[10px]"
            >
              {capacity.capacityGrade}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Capacity Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-wide block">
              Stress-Tested Floor
            </span>
            <p className="text-base sm:text-lg font-bold text-navy-900 mt-0.5">
              {formatCurrency(capacity.baselineFloorIncome)}
              <span className="text-[10px] text-slate-400 font-normal">/mo</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">
              Lowest observed month
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-wide block">
              Average Net Inflow
            </span>
            <p className="text-base sm:text-lg font-bold text-navy-900 mt-0.5">
              {formatCurrency(capacity.averageMonthlyIncome)}
              <span className="text-[10px] text-slate-400 font-normal">/mo</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">
              All verified rails
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-wide block">
              Estimated Living Baselines
            </span>
            <p className="text-base sm:text-lg font-bold text-navy-900 mt-0.5">
              {formatCurrency(capacity.estimatedLivingExpenses)}
              <span className="text-[10px] text-slate-400 font-normal">/mo</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">
              Rent + essential utilities
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50/60 border border-emerald-200 p-3">
            <span className="text-[10px] text-emerald-700 uppercase tracking-wide block font-medium">
              Max Recommended Credit
            </span>
            <p className="text-base sm:text-lg font-bold text-emerald-800 mt-0.5">
              {formatCurrency(capacity.maxRecommendedLoan)}
            </p>
            <p className="text-[10px] text-emerald-600 mt-1 leading-tight">
              Zero debt-trap limit
            </p>
          </div>
        </div>

        {/* Interactive Simulator Slider & Decision Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              What-If Loan Pre-Qualification Simulator
            </h3>
            <span className="text-xs text-slate-500">
              Test loans against your verified passport
            </span>
          </div>

          {/* Controls */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Requested Loan Amount</span>
                <span className="font-bold text-navy-900">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-navy-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹5,000 (Micro)</span>
                <span>₹50,000</span>
                <span>₹1,00,000 (Vehicle/Biz)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Repayment Tenure</span>
                <span className="font-bold text-navy-900">
                  {tenureMonths} Months
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={24}
                step={3}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-navy-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>3 months</span>
                <span>12 months</span>
                <span>24 months</span>
              </div>
            </div>
          </div>

          {/* Simulated Decision Output (Actionable adverse action / approval) */}
          <div
            className={`rounded-xl border p-4 transition-all ${
              simulation.status === "Pre-Approved"
                ? "bg-emerald-50/70 border-emerald-300"
                : simulation.status === "Conditional Approval"
                  ? "bg-amber-50/70 border-amber-300"
                  : "bg-red-50/60 border-red-300"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                {simulation.status === "Pre-Approved" && (
                  <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                )}
                {simulation.status === "Conditional Approval" && (
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                )}
                {simulation.status === "Action Needed" && (
                  <ShieldAlert className="h-5 w-5 text-red-600 shrink-0" />
                )}
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Institutional Underwriting Verdict
                  </span>
                  <span
                    className={`text-base font-bold ${
                      simulation.status === "Pre-Approved"
                        ? "text-emerald-800"
                        : simulation.status === "Conditional Approval"
                          ? "text-amber-800"
                          : "text-red-800"
                    }`}
                  >
                    {simulation.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">
                    Estimated EMI
                  </span>
                  <span className="font-bold text-navy-900 text-sm">
                    {formatCurrency(simulation.estimatedEmi)}
                    <span className="font-normal text-xs text-slate-500">/mo</span>
                  </span>
                </div>
                <div className="border-l border-slate-300 pl-4">
                  <span className="text-slate-500 block text-[10px]">
                    Confidence Index
                  </span>
                  <span className="font-bold text-navy-900 text-sm">
                    {simulation.confidenceScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Explainable Reasoning */}
            <div className="pt-3 space-y-2">
              <p className="text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-navy-900">
                  Plain-Language Underwriting Explanation:{" "}
                </span>
                {simulation.verdictReason}
              </p>

              {/* Actionable Steps */}
              <div className="pt-1">
                <p className="text-[11px] font-semibold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3 text-navy-600" />
                  Actionable Steps to Maintain or Unlock Approval:
                </p>
                <ul className="space-y-1">
                  {simulation.actionableRoadmap.map((step, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 flex items-start gap-1.5"
                    >
                      <span className="text-navy-600 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
