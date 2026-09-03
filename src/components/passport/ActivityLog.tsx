"use client";

import { Star, CreditCard, TrendingUp, Award } from "lucide-react";
import type { ActivityEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const TYPE_ICONS = {
  rating: Star,
  payment: CreditCard,
  earnings: TrendingUp,
  milestone: Award,
};

const TYPE_COLORS = {
  rating: "text-amber-500 bg-amber-50",
  payment: "text-emerald-600 bg-emerald-50",
  earnings: "text-blue-600 bg-blue-50",
  milestone: "text-purple-600 bg-purple-50",
};

interface ActivityLogProps {
  events: ActivityEvent[];
}

export function ActivityLog({ events }: ActivityLogProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-slate-500 text-center py-6">
        No recent activity
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {events.map((event) => {
        const Icon = TYPE_ICONS[event.type];
        const colorClass = TYPE_COLORS[event.type];
        return (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorClass}`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700">{event.message}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {formatDate(event.date)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
