"use client";

import { useEffect, useState } from "react";
import { PageTransition, FadeIn } from "@/components/shared/PageTransition";
import { PassportCard } from "@/components/passport/PassportCard";
import { ScoreBreakdown } from "@/components/passport/ScoreBreakdown";
import { ScoreHistoryChart } from "@/components/passport/ScoreHistoryChart";
import { ImprovementSuggestions } from "@/components/passport/ImprovementSuggestions";
import { ConnectedPlatforms } from "@/components/passport/ConnectedPlatforms";
import { InformalLedger } from "@/components/passport/InformalLedger";
import { CommitmentSimulator } from "@/components/passport/CommitmentSimulator";
import { ActivityLog } from "@/components/passport/ActivityLog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { workers } from "@/lib/mockData";


export default function DashboardPage() {
  const { worker, trustScore, setCurrentWorkerId } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 space-y-8">
        {/* Demo worker switcher */}
        <FadeIn>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-500 mr-1">Demo profiles:</span>
            {workers.map((w) => (
              <button
                key={w.id}
                onClick={() => setCurrentWorkerId(w.id)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  worker.id === w.id
                    ? "bg-navy-800 text-white border-navy-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-navy-300"
                }`}
              >
                {w.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <PassportCard worker={worker} trustScore={trustScore} />
        </FadeIn>

        {/* Feature 2: Safe Borrowing Capacity & Actionable Decision Simulator */}
        <FadeIn delay={0.08}>
          <CommitmentSimulator worker={worker} />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Score Breakdown — Explainable AI</CardTitle>
              <p className="text-sm text-slate-500">
                Tap each factor to see how your score was calculated
              </p>
            </CardHeader>
            <CardContent>
              <ScoreBreakdown factors={trustScore.factors} />
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div>
            <h2 className="text-lg font-semibold text-navy-900 mb-4">
              How to improve your score
            </h2>
            <ImprovementSuggestions suggestions={trustScore.suggestions} />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Score History</CardTitle>
              <p className="text-sm text-slate-500">Last 6 months trend</p>
            </CardHeader>
            <CardContent>
              <ScoreHistoryChart
                data={worker.scoreHistory}
                currentScore={trustScore.overall}
              />
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Tabs defaultValue="platforms">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="platforms" className="flex-1 sm:flex-none">
                Connected Platforms
              </TabsTrigger>
              <TabsTrigger value="ledger" className="flex-1 sm:flex-none">
                Micro-Merchant & UPI Ledger
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 sm:flex-none">
                Activity Log
              </TabsTrigger>
            </TabsList>
            <TabsContent value="platforms" className="mt-4">
              <ConnectedPlatforms platforms={worker.platforms} editable />
            </TabsContent>
            <TabsContent value="ledger" className="mt-4">
              <InformalLedger worker={worker} />
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ActivityLog events={worker.activityLog} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeIn>

      </div>
    </PageTransition>
  );
}
