"use client";

import { QrCode, Store, Truck, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WorkerProfile } from "@/lib/types";

import { formatCurrency } from "@/lib/utils";

interface InformalLedgerProps {
  worker: WorkerProfile;
}

export function InformalLedger({ worker }: InformalLedgerProps) {
  const merchant = worker.merchantCashflow;
  const khatas = worker.supplierKhatas ?? [];

  return (
    <div className="space-y-6">
      {/* Background Banner */}
      <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <Store className="h-5 w-5" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-amber-900">
              Informal Cashflows & Small-Merchant Verification
            </p>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              Street vendors, freelance micro-enterprises, and daily-wage earners settle
              obligations via UPI QR and supplier khatas. CredEnce turns this informal
              discipline into institutional trust.

            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-white border-amber-300 text-amber-800 text-[11px] shrink-0 self-start sm:self-auto">
          RBI Account Aggregator Rail
        </Badge>
      </div>

      {/* UPI Merchant Settlement Card */}
      {merchant ? (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <QrCode className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{merchant.provider}</CardTitle>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" />
                      Live Settlement Stream
                    </Badge>
                  </div>
                  <p className="font-mono text-xs text-slate-500 mt-0.5">
                    VPA: {merchant.upiVpa}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-navy-900">
                  {formatCurrency(merchant.monthlyVolume)}
                </p>
                <p className="text-[10px] text-slate-400">Monthly Inflow Volume</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-400 uppercase">Avg Daily Trans.</span>
                <p className="text-sm font-bold text-navy-800 mt-0.5">
                  {merchant.avgDailyTransactions} transactions/day
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-400 uppercase">Active Settlement Days</span>
                <p className="text-sm font-bold text-navy-800 mt-0.5">
                  {merchant.activeSettlementDays} / 30 days active
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-400 uppercase">QR Cashflow Tenure</span>
                <p className="text-sm font-bold text-navy-800 mt-0.5">
                  {merchant.qrTenureMonths} months verified
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-slate-300 text-center py-6">
          <CardContent>
            <QrCode className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">No UPI Merchant QR Linked</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Link your GPay Business, PhonePe QR or Paytm merchant account to prove daily cashflow.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Supplier Khata & Trade Credit Settlements */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
            <Truck className="h-4 w-4 text-navy-600" />
            Supplier & Trade Khata Credit Discipline
          </h3>
          <span className="text-xs text-slate-500">
            Peer & supplier relationship settlements
          </span>
        </div>

        {khatas.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            No supplier khatas recorded for this profile.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {khatas.map((khata) => (
              <div
                key={khata.id}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">
                      {khata.supplierName}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {khata.category} · {khata.activeMonths} mo history
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"
                  >
                    {khata.settlementRate}% On-Time
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Monthly Trade Credit</span>
                  <span className="font-bold text-navy-900">
                    {formatCurrency(khata.monthlyVolume)}/mo
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
