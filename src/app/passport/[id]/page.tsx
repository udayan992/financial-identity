"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Shield,
  CheckCircle2,
  BadgeCheck,
  Clock,
  MapPin,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { PageTransition, FadeIn } from "@/components/shared/PageTransition";
import { AnimatedScore } from "@/components/shared/AnimatedScore";
import { ScoreBreakdown } from "@/components/passport/ScoreBreakdown";
import { ConnectedPlatforms } from "@/components/passport/ConnectedPlatforms";
import { TamperVerificationModal } from "@/components/passport/TamperVerificationModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getWorkerByPassportId,
  getWorkerByShareToken,
  getWorkerById,
  workers,
} from "@/lib/mockData";
import type { ShareRecord, WorkerProfile } from "@/lib/types";
import {
  computeTrustScore,
  computeSafeCommitmentCapacity,
  getTierBg,
  getTierColor,
  getVerificationAudit,
} from "@/lib/scoring";
import { formatDate, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


export default function PassportViewPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  const [storedShares, setStoredShares] = useState<ShareRecord[]>([]);
  const [customWorkers, setCustomWorkers] = useState<WorkerProfile[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("credence-app-state") || localStorage.getItem("bharosa-app-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.shareRecords) setStoredShares(parsed.shareRecords);
        if (parsed.customWorkers) setCustomWorkers(parsed.customWorkers);
      }
    } catch {

      // ignore
    }
  }, [id]);

  const viewData = useMemo(() => {
    const resolve = (workerId: string): WorkerProfile | undefined => {
      return (
        getWorkerById(workerId) ??
        customWorkers.find((w) => w.id === workerId) ??
        workers.find((w) => w.id === workerId)
      );
    };

    const allRecords = [...storedShares];
    const share = allRecords.find((s) => s.shareToken === id && !s.revoked);
    if (share) {
      const worker = resolve(share.workerId);
      if (worker) return { worker, share };
    }

    const byToken = getWorkerByShareToken(id, storedShares);
    if (byToken) return byToken;

    const worker = getWorkerByPassportId(id);
    if (worker) {
      return {
        worker,
        share: {
          settings: {
            showFullBreakdown: true,
            showEarnings: true,
            expiryDays: 30,
          },
        },
      };
    }
    return null;
  }, [id, storedShares, customWorkers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!viewData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-navy-900">Passport Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            This link may have expired or been revoked.
          </p>
        </Card>
      </div>
    );
  }

  const { worker, share } = viewData;
  const trustScore = computeTrustScore(worker);
  const audit = getVerificationAudit(worker);
  const capacity = computeSafeCommitmentCapacity(worker);
  const connectedCount = worker.platforms.filter((p) => p.connected).length;
  const maxTenure = Math.max(
    ...worker.platforms.filter((p) => p.connected).map((p) => p.tenureMonths),
    0
  );

  const badges = [
    { label: "Identity Verified", show: true },
    {
      label: `${Math.floor(maxTenure / 12)}+ years work history`,
      show: maxTenure >= 36,
    },
    {
      label: "Multi-platform Verified",
      show: connectedCount >= 3,
    },
    {
      label: "Payment Discipline",
      show: worker.billPayments.filter((b) => b.onTime).length / worker.billPayments.length >= 0.9,
    },
  ].filter((b) => b.show);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header bar */}
        <div className="bg-navy-900 text-white py-3 px-4">
          <div className="mx-auto max-w-3xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-400" />
              <span className="font-bold">CredEnce</span>
              <span className="text-xs text-slate-400 hidden sm:inline">

                Verified Passport View · MIC VIT Chennai Track
              </span>
            </div>
            <Badge className="bg-white/10 text-amber-300 border-amber-500/30 text-[10px]">
              Cryptographically Sealed
            </Badge>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl border-2 border-navy-200 bg-white passport-texture shadow-passport p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-full" />

              <div className="relative flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                    Financial Reputation Passport
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">
                    {worker.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {worker.city}
                  </div>
                  <p className="font-mono text-xs text-slate-400 mt-2">
                    {worker.passportId}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Trust Score
                    </p>
                    <div className="flex items-baseline gap-2">
                      <AnimatedScore
                        value={trustScore.overall}
                        className="text-5xl sm:text-6xl font-bold text-navy-900"
                      />
                      <span className="text-xl text-slate-400">/100</span>
                    </div>
                    <Badge
                      className={cn("mt-2 border", getTierBg(trustScore.tier))}
                      variant="outline"
                    >
                      <span className={getTierColor(trustScore.tier)}>
                        {trustScore.tier}
                      </span>
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-800 text-white text-xl font-bold shadow-md">
                    {worker.avatarInitials}
                  </div>
                  <div className="rounded-xl bg-white p-2 border border-slate-100 shadow-sm">
                    <QRCodeSVG
                      value={`passport:${worker.passportId}`}
                      size={80}
                      fgColor="#1a3150"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="flex flex-wrap items-center gap-2">
              <TamperVerificationModal
                audit={audit}
                passportId={worker.passportId}
                workerName={worker.name}
              />
              {badges.map((b) => (
                <Badge key={b.label} variant="verified" className="gap-1">
                  <BadgeCheck className="h-3 w-3" />
                  {b.label}
                </Badge>
              ))}
            </div>
          </FadeIn>

          {/* Institutional Underwriting Summary */}
          <FadeIn delay={0.08}>
            <Card className="border-navy-200/80 bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-navy-900">
                  Institutional Capacity & Stress-Tested Headroom
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Real earning capacity based on worst-case monthly floor earnings
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="rounded-lg bg-white border border-slate-200 p-2.5">
                    <span className="text-[10px] text-slate-400 uppercase block">
                      Safe Monthly EMI
                    </span>
                    <p className="text-base font-bold text-emerald-700 mt-0.5">
                      {formatCurrency(capacity.safeMonthlyEmiAbsorption)}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      {capacity.capacityGrade}
                    </span>
                  </div>
                  <div className="rounded-lg bg-white border border-slate-200 p-2.5">
                    <span className="text-[10px] text-slate-400 uppercase block">
                      Floor Inflow (Worst Mo)
                    </span>
                    <p className="text-base font-bold text-navy-900 mt-0.5">
                      {formatCurrency(capacity.baselineFloorIncome)}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Stress baseline
                    </span>
                  </div>
                  <div className="rounded-lg bg-white border border-slate-200 p-2.5">
                    <span className="text-[10px] text-slate-400 uppercase block">
                      Pre-Qual Ceiling
                    </span>
                    <p className="text-base font-bold text-navy-900 mt-0.5">
                      {formatCurrency(capacity.maxRecommendedLoan)}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Zero-collateral
                    </span>
                  </div>
                  <div className="rounded-lg bg-white border border-slate-200 p-2.5">
                    <span className="text-[10px] text-slate-400 uppercase block">
                      Anti-Fraud Audit
                    </span>
                    <p className="text-xs font-bold text-emerald-700 mt-1">
                      {audit.fraudRiskLevel}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      API Hash Verified
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>


          {share.settings.showFullBreakdown && (
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Score Breakdown
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Explainable AI analysis — derived from verified platform data
                  </p>
                </CardHeader>
                <CardContent>
                  <ScoreBreakdown factors={trustScore.factors} />
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {!share.settings.showFullBreakdown && (
            <FadeIn delay={0.1}>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {trustScore.factors.map((f) => (
                      <div key={f.id} className="text-center p-3 rounded-lg bg-slate-50">
                        <p className="text-2xl font-bold text-navy-800">
                          {f.score}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{f.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          <FadeIn delay={0.15}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Verified Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <ConnectedPlatforms
                  platforms={worker.platforms}
                  showEarnings={share.settings.showEarnings}
                />
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-center gap-2 text-xs text-slate-400 justify-center py-4 border-t border-slate-100">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <Clock className="h-3.5 w-3.5" />
              <span>
                Verified on {formatDate(new Date().toISOString())} · Consent-based data sharing
              </span>
            </div>
          </FadeIn>
        </div>

        <footer className="bg-navy-900 text-slate-400 text-center py-4 text-xs">
          Powered by <span className="text-white font-semibold">CredEnce</span> —
          Explainable, consent-based reputation data
        </footer>

      </div>
    </PageTransition>
  );
}
