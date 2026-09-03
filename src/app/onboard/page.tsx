"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Shield,
  Star,
  IndianRupee,
  Clock,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageTransition } from "@/components/shared/PageTransition";
import { useApp } from "@/context/AppContext";
import { PLATFORM_TEMPLATES } from "@/lib/mockData";
import type { PlatformId } from "@/lib/types";
import { cn } from "@/lib/utils";

const CONSENT_ITEMS = [
  { icon: IndianRupee, label: "Monthly earnings (last 6 months)" },
  { icon: Star, label: "Platform ratings & reviews summary" },
  { icon: Clock, label: "Work tenure & completed jobs" },
  { icon: CreditCard, label: "Bill payment history (utilities)" },
];

export default function OnboardPage() {
  const router = useRouter();
  const { onboarding, updateOnboarding, completeOnboarding, setIsLoading } =
    useApp();
  const [step, setStep] = useState(1);
  const [consentPlatform, setConsentPlatform] = useState<PlatformId | null>(null);
  const [aggregating, setAggregating] = useState(false);

  const connected = onboarding.connectedPlatforms;

  const handleConnect = (platformId: PlatformId) => {
    if (connected.includes(platformId)) {
      updateOnboarding({
        connectedPlatforms: connected.filter((id) => id !== platformId),
      });
    } else {
      setConsentPlatform(platformId);
    }
  };

  const confirmConnect = () => {
    if (!consentPlatform) return;
    updateOnboarding({
      connectedPlatforms: [...connected, consentPlatform],
    });
    setConsentPlatform(null);
  };

  const canProceedStep1 =
    onboarding.name.trim().length >= 2 &&
    onboarding.phone.trim().length >= 10 &&
    onboarding.city.trim().length >= 2;

  const handleFinish = async () => {
    setAggregating(true);
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    completeOnboarding();
    setIsLoading(false);
    router.push("/dashboard");
  };

  const platformName =
    PLATFORM_TEMPLATES.find((p) => p.id === consentPlatform)?.name ?? "";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    step >= s
                      ? "bg-navy-800 text-white"
                      : "bg-slate-200 text-slate-500"
                  )}
                >
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "h-0.5 w-12 sm:w-20",
                      step > s ? "bg-navy-800" : "bg-slate-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
                    Create your passport
                  </h1>
                  <p className="mt-2 text-slate-600">
                    Quick sign-up — no password needed for this demo
                  </p>
                </div>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Rajesh Kumar"
                        value={onboarding.name}
                        onChange={(e) =>
                          updateOnboarding({ name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={onboarding.phone}
                        onChange={(e) =>
                          updateOnboarding({ phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Bengaluru"
                        value={onboarding.city}
                        onChange={(e) =>
                          updateOnboarding({ city: e.target.value })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-between mt-6">
                  <Button variant="ghost" asChild>
                    <a href="/">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </a>
                  </Button>
                  <Button
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
                    Connect your platforms
                  </h1>
                  <p className="mt-2 text-slate-600">
                    Link the gig apps where you work. You control what&apos;s
                    shared.
                  </p>
                </div>
                <div className="space-y-3">
                  {PLATFORM_TEMPLATES.map((platform) => {
                    const isConnected = connected.includes(platform.id);
                    return (
                      <Card
                        key={platform.id}
                        className={cn(
                          "transition-all",
                          isConnected && "border-emerald-300 bg-emerald-50/30"
                        )}
                      >
                        <CardContent className="flex items-center gap-4 py-4">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-sm"
                            style={{ backgroundColor: platform.color }}
                          >
                            {platform.initials}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">
                              {platform.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              Delivery · Rides · Services
                            </p>
                          </div>
                          <Button
                            variant={isConnected ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleConnect(platform.id)}
                          >
                            {isConnected ? (
                              <>
                                <Check className="h-4 w-4" /> Connected
                              </>
                            ) : (
                              "Connect"
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button
                    disabled={connected.length === 0}
                    onClick={() => setStep(3)}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                {!aggregating ? (
                  <>
                    <div className="mb-8">
                      <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
                        Ready to generate your passport
                      </h1>
                      <p className="mt-2 text-slate-600">
                        {connected.length} platform
                        {connected.length > 1 ? "s" : ""} connected. We&apos;ll
                        aggregate your work history and compute your Trust Score.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-card">
                      <Shield className="h-12 w-12 text-navy-700 mx-auto mb-4" />
                      <p className="text-sm text-slate-600">
                        This will analyze earnings, ratings, tenure, and payment
                        history to create your explainable Trust Score.
                      </p>
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="ghost" onClick={() => setStep(2)}>
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                      <Button onClick={handleFinish}>
                        Generate Passport <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="py-16">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="mx-auto w-fit"
                    >
                      <Loader2 className="h-12 w-12 text-navy-700" />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 text-lg font-medium text-navy-900"
                    >
                      Aggregating your work history...
                    </motion.p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.8 }}
                      className="mt-4 mx-auto max-w-xs h-1.5 bg-navy-800 rounded-full"
                    />
                    <p className="mt-4 text-sm text-slate-500">
                      Analyzing {connected.length} platforms · Computing Trust
                      Score
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Consent Modal */}
      <Dialog
        open={!!consentPlatform}
        onOpenChange={() => setConsentPlatform(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {platformName}</DialogTitle>
            <DialogDescription>
              CredEnce will request the following data with your consent. You can
              revoke access anytime.
            </DialogDescription>

          </DialogHeader>
          <div className="space-y-3 my-4">
            {CONSENT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
              >
                <item.icon className="h-4 w-4 text-navy-600 shrink-0" />
                <span className="text-sm text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setConsentPlatform(null)}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={confirmConnect}>
              Allow & Connect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
