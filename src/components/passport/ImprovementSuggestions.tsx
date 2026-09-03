"use client";

import { TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ImprovementSuggestion } from "@/lib/types";

interface ImprovementSuggestionsProps {
  suggestions: ImprovementSuggestion[];
}

export function ImprovementSuggestions({
  suggestions,
}: ImprovementSuggestionsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {suggestions.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{s.title}</CardTitle>
                <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold whitespace-nowrap">
                  <TrendingUp className="h-4 w-4" />+{s.impact} pts
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed">
                {s.description}
              </p>
              <button className="mt-3 flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-800 transition-colors">
                Learn more <ArrowRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
