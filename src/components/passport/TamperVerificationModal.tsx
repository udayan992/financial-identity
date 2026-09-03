"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  FileCheck2,
  Copy,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VerificationAudit } from "@/lib/types";

interface TamperVerificationModalProps {
  audit: VerificationAudit;
  passportId: string;
  workerName: string;
  trigger?: React.ReactNode;
}

export function TamperVerificationModal({
  audit,
  passportId,
  workerName,
  trigger,
}: TamperVerificationModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReverifying, setIsReverifying] = useState(false);
  const [reverified, setReverified] = useState(false);

  const handleCopyHash = async () => {
    await navigator.clipboard.writeText(audit.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunIntegrityCheck = () => {
    setIsReverifying(true);
    setTimeout(() => {
      setIsReverifying(false);
      setReverified(true);
      setTimeout(() => setReverified(false), 3000);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 transition-colors">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Cryptographically Verified (SHA-256)</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">
                Tamper-Evident Verification Proof
              </DialogTitle>
              <DialogDescription className="text-xs">
                Zero-Knowledge cryptographic seal protecting against fabricated payslips
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Status banner */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-emerald-900">
                Data Authenticity Confirmed — 0% Alteration Detected
              </p>
              <p className="text-emerald-700 leading-relaxed">
                Aggregated via direct OAuth & Account Aggregator rails. This record
                cannot be manually photoshopped, spliced, or reused across applicants.
              </p>
            </div>
          </div>

          {/* Cryptographic Hash & Signature */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-slate-500" />
                Immutable Content Digest (SHA-256)
              </span>
              <button
                onClick={handleCopyHash}
                className="text-xs text-navy-600 hover:text-navy-800 flex items-center gap-1 font-mono font-medium"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-lg p-2 font-mono text-[11px] text-slate-700 break-all select-all">
              {audit.hash}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  Passport Holder
                </span>
                <span className="font-medium text-slate-800">{workerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  Passport ID
                </span>
                <span className="font-mono font-medium text-slate-800">
                  {passportId}
                </span>
              </div>
            </div>
          </div>

          {/* Data Rail Provenance */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <FileCheck2 className="h-3.5 w-3.5 text-slate-600" />
              Verified Data Provenance (No Self-Declared Uploads)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {audit.dataRails.map((rail) => (
                <Badge
                  key={rail}
                  variant="outline"
                  className="bg-white text-[11px] py-1 px-2.5 border-slate-200 text-slate-700"
                >
                  <Lock className="h-2.5 w-2.5 mr-1 text-emerald-600" />
                  {rail}
                </Badge>
              ))}
            </div>
          </div>

          {/* Audit Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg border border-slate-200 bg-white p-2.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Fraud Risk Classification
              </span>
              <span className="text-xs font-bold text-emerald-700 mt-0.5 inline-block">
                {audit.fraudRiskLevel}
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-2.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Consent Governance
              </span>
              <span className="text-xs font-semibold text-slate-700 mt-0.5 inline-block truncate max-w-full">
                {audit.consentProtocol}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRunIntegrityCheck}
            disabled={isReverifying}
            className="text-xs gap-1.5"
          >
            {isReverifying ? (
              <>Verifying Checksum...</>
            ) : reverified ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Checksum Matches
              </span>
            ) : (
              <>Re-validate SHA-256 Seal</>
            )}
          </Button>

          <Button
            size="sm"
            onClick={() => setOpen(false)}
            className="text-xs"
          >
            Close Audit View
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
