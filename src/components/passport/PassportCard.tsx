"use client";

import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { Share2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedScore } from "@/components/shared/AnimatedScore";
import { TamperVerificationModal } from "@/components/passport/TamperVerificationModal";
import { getTierBg, getTierColor, getVerificationAudit } from "@/lib/scoring";
import type { TrustScoreResult, WorkerProfile } from "@/lib/types";

import { cn } from "@/lib/utils";

interface PassportCardProps {
  worker: WorkerProfile;
  trustScore: TrustScoreResult;
  showShareButton?: boolean;
  compact?: boolean;
  shareUrl?: string;
}

export function PassportCard({
  worker,
  trustScore,
  showShareButton = true,
  compact = false,
  shareUrl,
}: PassportCardProps) {
  const qrValue =
    shareUrl ??
    (typeof window !== "undefined"
      ? `${window.location.origin}/passport/${worker.passportId}`
      : `/passport/${worker.passportId}`);

  const audit = getVerificationAudit(worker);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-navy-200 bg-gradient-to-br from-white via-white to-navy-50 passport-texture shadow-passport",
        compact ? "p-4" : "p-6"
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-navy-100/30 to-transparent rounded-tr-full" />

      <div className="relative flex flex-col sm:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                Financial Reputation Passport
              </p>
              <h2 className="text-2xl font-bold text-navy-900 mt-1">
                {worker.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                {worker.city}
              </div>
            </div>
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white shadow-md",
                "bg-gradient-to-br from-navy-600 to-navy-800"
              )}
            >
              {worker.avatarInitials}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="outline" className="font-mono text-xs">
              {worker.passportId}
            </Badge>
            <Badge
              className={cn("border", getTierBg(trustScore.tier))}
              variant="outline"
            >
              <span className={getTierColor(trustScore.tier)}>
                {trustScore.tier}
              </span>
            </Badge>
            <TamperVerificationModal
              audit={audit}
              passportId={worker.passportId}
              workerName={worker.name}
            />
          </div>

          <div className="flex items-end gap-3">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Trust Score
              </p>
              <div className="flex items-baseline gap-1">
                <AnimatedScore
                  value={trustScore.overall}
                  className="text-5xl font-bold text-navy-900"
                />
                <span className="text-lg text-slate-400">/100</span>
              </div>
            </div>
          </div>

          {showShareButton && (
            <Button asChild className="mt-2">
              <Link href="/dashboard/share">
                <Share2 className="h-4 w-4" />
                Share Passport
              </Link>
            </Button>
          )}
        </div>


        <div className="flex flex-col items-center gap-2">
          <div className="rounded-xl bg-white p-3 shadow-sm border border-slate-100">
            <QRCodeSVG
              value={qrValue}
              size={compact ? 80 : 100}
              level="M"
              fgColor="#1a3150"
            />
          </div>
          <p className="text-[10px] text-slate-400 text-center max-w-[100px]">
            Scan to verify passport
          </p>
        </div>
      </div>
    </motion.div>
  );
}
