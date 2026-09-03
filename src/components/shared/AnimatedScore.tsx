"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedScoreProps {
  value: number;
  className?: string;
  duration?: number;
}

export function AnimatedScore({
  value,
  className,
  duration = 1.5,
}: AnimatedScoreProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span className={cn("tabular-nums", className)}>{display}</span>;
}
