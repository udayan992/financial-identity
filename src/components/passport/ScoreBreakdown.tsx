"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import type { ScoreFactor } from "@/lib/types";

const FACTOR_COLORS: Record<string, string> = {
  earnings: "bg-emerald-500",
  ratings: "bg-amber-500",
  tenure: "bg-blue-500",
  bills: "bg-purple-500",
  diversity: "bg-teal-500",
};

interface ScoreBreakdownProps {
  factors: ScoreFactor[];
}

export function ScoreBreakdown({ factors }: ScoreBreakdownProps) {
  const [expanded, setExpanded] = useState<string | null>(factors[0]?.id ?? null);

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {factors.map((factor) => {
          const isOpen = expanded === factor.id;
          return (
            <div
              key={factor.id}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              <button
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 transition-colors"
                onClick={() =>
                  setExpanded(isOpen ? null : factor.id)
                }
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-slate-800">
                        {factor.name}
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Weight: {(factor.weight * 100).toFixed(0)}% of total score
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-navy-800">
                        +{factor.contribution}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({(factor.weight * 100).toFixed(0)}%)
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                  <Progress
                    value={factor.score}
                    indicatorClassName={FACTOR_COLORS[factor.id]}
                  />
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-medium text-navy-700">
                          AI Explanation:{" "}
                        </span>
                        {factor.explanation}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Factor score: {factor.score}/100 → contributes{" "}
                        {factor.contribution} points to your Trust Score
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
