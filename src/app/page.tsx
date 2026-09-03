"use client";

import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Link2,
  BarChart3,
  Share2,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/PageTransition";
import { PLATFORM_TEMPLATES } from "@/lib/mockData";

const steps = [
  {
    icon: Link2,
    title: "Connect",
    description:
      "Link your gig platforms with consent. You choose exactly what data CredEnce can access.",
  },
  {
    icon: BarChart3,
    title: "Aggregate & Score",
    description:
      "Our explainable AI analyzes earnings, ratings, tenure, and payments to generate your Trust Score.",
  },
  {
    icon: Share2,
    title: "Share",
    description:
      "Share your passport with banks, landlords, or employers via secure link or QR — you stay in control.",
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="absolute inset-0 passport-texture opacity-30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-amber-300 mb-6 backdrop-blur-sm border border-white/10">
                <Shield className="h-4 w-4" />
                Verifiable Financial Identity for Informal & Thin-File Earners
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance">
                Real work history deserves a{" "}
                <span className="text-amber-400">verifiable passport</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                A consent-governed, tamper-evident reputation passport for delivery partners,
                drivers, small vendors, and informal earners — with explainable underwriting
                reasons and zero fabricated paperwork.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="accent" asChild>
                  <Link href="/onboard">
                    I&apos;m a Worker / Vendor
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  asChild
                >
                  <Link href="/lender">I&apos;m a Lender / Institution</Link>
                </Button>
              </div>

            </div>
          </FadeIn>

          {/* Platform aggregation visual */}
          <FadeIn delay={0.2} className="mt-16 lg:mt-20">
            <div className="relative mx-auto max-w-4xl">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {PLATFORM_TEMPLATES.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2.5"
                  >
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.initials}
                    </div>
                    <span className="text-sm font-medium">{p.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-amber-400"
                >
                  <ArrowRight className="h-6 w-6 rotate-90" />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mx-auto mt-4 max-w-md rounded-2xl bg-white p-6 shadow-passport text-slate-900 passport-texture"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-navy-500 font-semibold">
                      CredEnce Passport
                    </p>
                    <p className="text-lg font-bold text-navy-900 mt-1">
                      Unified Trust Score
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-navy-900">86</p>
                    <p className="text-xs text-emerald-600 font-medium">
                      Excellent
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-navy-900">
                Your reputation is locked inside platforms
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Gig workers build years of trust on Swiggy, Uber, and Zomato —
                but banks and landlords can&apos;t see it. When you need a loan,
                rental, or insurance, you start from zero every time.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-2xl bg-navy-50 border border-navy-100 p-8">
                <h3 className="text-xl font-bold text-navy-900">
                  CredEnce sets it free
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  One portable passport that aggregates your work history,
                  earnings consistency, ratings, and payment behavior — with
                  explainable AI scoring you can understand and improve.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "You own and control your data",
                    "Consent-based sharing with any institution",
                    "Transparent, explainable Trust Score",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-900">How it Works</h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              Three simple steps to build and share your financial reputation
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="relative rounded-2xl bg-white border border-slate-200 p-8 shadow-card hover:shadow-md transition-shadow h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white mb-5">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                    Step {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-navy-900 mt-2">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Privacy */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 text-white p-8 sm:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <Lock className="h-8 w-8 text-amber-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Your data. Your consent. Your control.
                </h2>
                <p className="mt-3 text-slate-300 leading-relaxed max-w-2xl">
                  CredEnce never shares data without your explicit permission.
                  Choose what&apos;s visible, set expiry dates, and revoke access
                  anytime. Every shared passport is time-limited and auditable.
                </p>
              </div>
              <Button size="lg" variant="accent" asChild>
                <Link href="/onboard">
                  Build Your Passport
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-navy-700" />
            <span className="font-bold text-navy-900">CredEnce</span>
            <span className="text-xs text-slate-400">· MIC VIT Chennai Submission</span>
          </div>
          <p className="text-sm text-slate-500">
            Explainable, consent-based reputation & cashflow verification for thin-file earners
          </p>
        </div>
      </footer>

    </div>
  );
}

