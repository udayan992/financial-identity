"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, Users, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/shared/PageTransition";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWorkerById, initialShareRecords } from "@/lib/mockData";
import {
  computeTrustScore,
  computeSafeCommitmentCapacity,
  getTierBg,
  getTierColor,
  getVerificationAudit,
} from "@/lib/scoring";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

import { useApp } from "@/context/AppContext";

const STATS = [
  { label: "Fabricated Document Risk (Hash Sealed)", value: "0%", icon: Shield },
  { label: "Decisions with Actionable Reasons", value: "100%", icon: TrendingUp },
  { label: "Underwriting Turnaround", value: "<30s", icon: Users },
];

export default function LenderPage() {
  const { setViewMode } = useApp();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setViewMode("lender");
  }, [setViewMode]);

  const applicants = useMemo(() => {
    return initialShareRecords
      .filter((s) => !s.revoked)
      .map((share) => {
        const worker = getWorkerById(share.workerId);
        if (!worker) return null;
        const score = computeTrustScore(worker);
        const capacity = computeSafeCommitmentCapacity(worker);
        const audit = getVerificationAudit(worker);
        return { share, worker, score, capacity, audit };
      })
      .filter((item): item is { share: typeof initialShareRecords[0]; worker: NonNullable<ReturnType<typeof getWorkerById>>; score: ReturnType<typeof computeTrustScore>; capacity: ReturnType<typeof computeSafeCommitmentCapacity>; audit: ReturnType<typeof getVerificationAudit> } => item !== null);
  }, []);


  const filtered = applicants.filter(
    (a) =>
      a.worker.name.toLowerCase().includes(search.toLowerCase()) ||
      a.worker.city.toLowerCase().includes(search.toLowerCase()) ||
      a.share.institutionName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Lender Portal
            </h1>
            <p className="mt-1 text-slate-600">
              Review shared financial reputation passports from gig workers
            </p>
          </div>
        </FadeIn>

        {/* Why this matters */}
        <FadeIn delay={0.05}>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {STATS.map((stat) => (
              <Card key={stat.label} className="border-slate-200">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                    <stat.icon className="h-5 w-5 text-navy-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, city, or institution..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {filtered.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No applicants match your search</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map(({ share, worker, score, capacity }) => (
                <Link
                  key={share.id}
                  href={`/passport/${share.shareToken}`}
                  className="block"
                >
                  <Card className="hover:shadow-md hover:border-navy-300 transition-all cursor-pointer">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-800 text-white font-bold">
                        {worker.avatarInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800">
                            {worker.name}
                          </span>
                          <Badge
                            variant="outline"
                            className={cn("text-[10px]", getTierBg(score.tier))}
                          >
                            <span className={getTierColor(score.tier)}>
                              {score.tier}
                            </span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"
                          >
                            Verified SHA-256
                          </Badge>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {worker.passportId}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                          <span>{worker.city}</span>
                          <span>·</span>
                          <span className="font-medium text-navy-800">
                            Safe EMI Absorption: {formatCurrency(capacity.safeMonthlyEmiAbsorption)}/mo
                          </span>
                          <span>·</span>
                          <span>Shared with {share.institutionName}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-navy-900">
                          {score.overall}
                        </p>
                        <p className="text-[10px] text-slate-400">Trust Score</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 hidden sm:block" />
                    </CardContent>
                  </Card>
                </Link>
              ))}

            </div>
          )}
        </FadeIn>
      </div>
    </PageTransition>
  );
}
