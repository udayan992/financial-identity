"use client";

import { Star, Briefcase, IndianRupee } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";
import type { PlatformData } from "@/lib/types";

interface ConnectedPlatformsProps {
  platforms: PlatformData[];
  showEarnings?: boolean;
  editable?: boolean;
}

export function ConnectedPlatforms({
  platforms,
  showEarnings = true,
  editable = false,
}: ConnectedPlatformsProps) {
  const { platformSharing, togglePlatformSharing } = useApp();
  const connected = platforms.filter((p) => p.connected);

  if (connected.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No platforms connected yet.{" "}
        <a href="/onboard" className="text-navy-600 underline">
          Connect now
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {connected.map((platform) => {
        const totalEarnings = platform.earnings.reduce(
          (sum, e) => sum + e.amount,
          0
        );
        const avgMonthly = Math.round(totalEarnings / platform.earnings.length);

        return (
          <div
            key={platform.id}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white text-sm font-bold shadow-sm"
              style={{ backgroundColor: platform.color }}
            >
              {platform.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800">
                  {platform.name}
                </span>
                <Badge variant="success" className="text-[10px]">
                  Connected
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                {showEarnings && (
                  <span className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {formatCurrency(avgMonthly)}/mo avg
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  {platform.rating}★
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {platform.tenureMonths}mo · {platform.completedJobs.toLocaleString("en-IN")} jobs
                </span>
              </div>
            </div>
            {editable && (
              <div className="flex flex-col items-end gap-1">
                <Switch
                  checked={platformSharing[platform.id] ?? true}
                  onCheckedChange={(checked) =>
                    togglePlatformSharing(platform.id, checked)
                  }
                />
                <span className="text-[10px] text-slate-400">Share data</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
