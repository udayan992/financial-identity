"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Trash2, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, FadeIn } from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { institutions } from "@/lib/mockData";
import { daysUntil, formatDate } from "@/lib/utils";

export default function SharePage() {
  const { worker, shareRecords, createShare, revokeShare } = useApp();
  const [showFullBreakdown, setShowFullBreakdown] = useState(true);
  const [showEarnings, setShowEarnings] = useState(false);
  const [expiryDays, setExpiryDays] = useState(30);
  const [institutionName, setInstitutionName] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  const handleGenerate = () => {
    const name =
      institutionName.trim() || "Shared Link";
    const record = createShare(name, {
      showFullBreakdown,
      showEarnings,
      expiryDays,
    });
    const link = `${baseUrl}/passport/${record.shareToken}`;
    setGeneratedLink(link);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allShares = shareRecords;

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8 space-y-8">
        <FadeIn>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              Share Your Passport
            </h1>
            <p className="mt-1 text-slate-600 text-sm">
              Generate a secure, time-limited link for lenders and employers
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <Card>
            <CardHeader>
              <CardTitle>Share Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="institution">
                  Institution Name (optional)
                </Label>
                <Input
                  id="institution"
                  placeholder="e.g. HDFC Bank"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  list="institutions-list"
                />
                <datalist id="institutions-list">
                  {institutions.map((i) => (
                    <option key={i.id} value={i.name} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show full score breakdown</Label>
                    <p className="text-xs text-slate-500">
                      Include explainable AI factor details
                    </p>
                  </div>
                  <Switch
                    checked={showFullBreakdown}
                    onCheckedChange={setShowFullBreakdown}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show earnings figures</Label>
                    <p className="text-xs text-slate-500">
                      Display exact monthly earnings amounts
                    </p>
                  </div>
                  <Switch
                    checked={showEarnings}
                    onCheckedChange={setShowEarnings}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Link expiry</Label>
                    <p className="text-xs text-slate-500">
                      Auto-expire after set duration
                    </p>
                  </div>
                  <select
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                  >
                    <option value={7}>7 days</option>
                    <option value={15}>15 days</option>
                    <option value={30}>30 days</option>
                    <option value={60}>60 days</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full">
                Generate Shareable Link
              </Button>

              {generatedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={generatedLink}
                      className="flex-1 text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 font-mono"
                    />
                    <Button size="icon" variant="outline" onClick={handleCopy}>
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <div className="rounded-xl bg-white p-4 border border-slate-100">
                      <QRCodeSVG
                        value={generatedLink}
                        size={140}
                        level="M"
                        fgColor="#1a3150"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-center text-slate-500">
                    Expires in {expiryDays} days · Passport ID: {worker.passportId}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Shared With</CardTitle>
              <p className="text-sm text-slate-500">
                Institutions that have access to your passport
              </p>
            </CardHeader>
            <CardContent>
              {allShares.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">
                  No shares yet. Generate a link above to get started.
                </p>
              ) : (
                <div className="space-y-3">
                  {allShares.map((share) => {
                    const days = daysUntil(share.expiresAt);
                    return (
                      <div
                        key={share.id}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-slate-800">
                              {share.institutionName}
                            </span>
                            {share.viewedAt && (
                              <Badge variant="secondary" className="text-[10px]">
                                <Eye className="h-3 w-3 mr-1" />
                                Viewed {formatDate(share.viewedAt)}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {days > 0
                                ? `Expires in ${days} days`
                                : "Expired"}
                            </span>
                            <span>·</span>
                            <span>Shared {formatDate(share.sharedAt)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => revokeShare(share.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Revoke
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
