"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ScoreHistoryPoint } from "@/lib/types";

interface ScoreHistoryChartProps {
  data: ScoreHistoryPoint[];
  currentScore: number;
}

export function ScoreHistoryChart({ data, currentScore }: ScoreHistoryChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    score: d.score,
  }));

  if (chartData.length > 0) {
    chartData[chartData.length - 1].score = currentScore;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a3150" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1a3150" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "13px",
            }}
            formatter={(value) => [`${value ?? 0}`, "Trust Score"]}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#1a3150"
            strokeWidth={2.5}
            fill="url(#scoreGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
