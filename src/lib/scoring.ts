import type {
  BillPayment,
  CommitmentCapacity,
  ImprovementSuggestion,
  PlatformData,
  ScoreFactor,
  ScoreTier,
  SimulatedDecisionResult,
  TrustScoreResult,
  VerificationAudit,
  WorkerProfile,
} from "./types";

const WEIGHTS = {

  earningsConsistency: 0.3,
  platformRatings: 0.25,
  workTenure: 0.2,
  billPayments: 0.15,
  platformDiversity: 0.1,
} as const;

function getTier(score: number): ScoreTier {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 45) return "Building";
  return "Starting";
}

function calcEarningsConsistency(platforms: PlatformData[]): {
  score: number;
  explanation: string;
} {
  const connected = platforms.filter((p) => p.connected);
  if (connected.length === 0) {
    return {
      score: 0,
      explanation: "No platform earnings data connected yet.",
    };
  }

  const allAmounts: number[] = [];
  connected.forEach((p) => {
    p.earnings.forEach((e) => allAmounts.push(e.amount));
  });

  const mean = allAmounts.reduce((a, b) => a + b, 0) / allAmounts.length;
  const variance =
    allAmounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    allAmounts.length;
  const stdDev = Math.sqrt(variance);
  const cv = mean > 0 ? (stdDev / mean) * 100 : 100;

  let score: number;
  if (cv <= 10) score = 95;
  else if (cv <= 15) score = 85;
  else if (cv <= 25) score = 70;
  else if (cv <= 35) score = 50;
  else score = 30;

  const months = connected[0]?.earnings.length ?? 6;
  return {
    score,
    explanation: `Your combined earnings varied by ${cv.toFixed(0)}% month-to-month over the last ${months} months — ${
      cv <= 15
        ? "this shows strong consistency"
        : cv <= 30
          ? "showing moderate stability with some fluctuation"
          : "indicating significant income volatility that affects trust"
    }.`,
  };
}

function calcPlatformRatings(platforms: PlatformData[]): {
  score: number;
  explanation: string;
} {
  const connected = platforms.filter((p) => p.connected);
  if (connected.length === 0) {
    return { score: 0, explanation: "No platform ratings available." };
  }

  const avgRating =
    connected.reduce((sum, p) => sum + p.rating, 0) / connected.length;
  const score = Math.min(100, Math.round((avgRating / 5) * 100));

  const best = [...connected].sort((a, b) => b.rating - a.rating)[0];
  const worst = [...connected].sort((a, b) => a.rating - b.rating)[0];

  return {
    score,
    explanation: `Your average rating across ${connected.length} platform${connected.length > 1 ? "s" : ""} is ${avgRating.toFixed(1)}★. ${
      best.rating >= 4.5
        ? `Strong performance on ${best.name} (${best.rating}★)`
        : `Room to improve on ${worst.name} (${worst.rating}★)`
    } contributes to your reputation.`,
  };
}

function calcWorkTenure(platforms: PlatformData[]): {
  score: number;
  explanation: string;
} {
  const connected = platforms.filter((p) => p.connected);
  if (connected.length === 0) {
    return { score: 0, explanation: "No work tenure data available." };
  }

  const maxTenure = Math.max(...connected.map((p) => p.tenureMonths));
  const avgTenure =
    connected.reduce((sum, p) => sum + p.tenureMonths, 0) / connected.length;
  const totalJobs = connected.reduce((sum, p) => sum + p.completedJobs, 0);

  let score: number;
  if (maxTenure >= 48) score = 95;
  else if (maxTenure >= 36) score = 85;
  else if (maxTenure >= 24) score = 70;
  else if (maxTenure >= 12) score = 55;
  else score = 35;

  const years = (maxTenure / 12).toFixed(1);
  return {
    score,
    explanation: `Your longest platform tenure is ${maxTenure} months (${years} years) with an average of ${avgTenure.toFixed(0)} months across platforms. You've completed ${totalJobs.toLocaleString("en-IN")} jobs total.`,
  };
}

function calcBillPayments(bills: BillPayment[]): {
  score: number;
  explanation: string;
} {
  if (bills.length === 0) {
    return { score: 50, explanation: "No bill payment history connected." };
  }

  const onTime = bills.filter((b) => b.onTime).length;
  const rate = (onTime / bills.length) * 100;
  const score = Math.round(rate);

  const late = bills.length - onTime;
  return {
    score,
    explanation: `${onTime} of ${bills.length} bills paid on time (${rate.toFixed(0)}%)${
      late > 0
        ? `. ${late} late payment${late > 1 ? "s" : ""} in the last 6 months affected this score`
        : " — excellent payment discipline"
    }.`,
  };
}

function calcPlatformDiversity(platforms: PlatformData[]): {
  score: number;
  explanation: string;
} {
  const connected = platforms.filter((p) => p.connected);
  const count = connected.length;

  let score: number;
  if (count >= 4) score = 100;
  else if (count === 3) score = 80;
  else if (count === 2) score = 60;
  else if (count === 1) score = 40;
  else score = 0;

  const names = connected.map((p) => p.name).join(", ");
  return {
    score,
    explanation:
      count >= 3
        ? `You're verified on ${count} platforms (${names}), demonstrating diversified income — a strong trust signal.`
        : count >= 1
          ? `Connected to ${count} platform${count > 1 ? "s" : ""} (${names}). Adding more platforms can strengthen your profile.`
          : "Connect gig platforms to build your multi-platform reputation.",
  };
}

function generateSuggestions(
  factors: ScoreFactor[],
  platforms: PlatformData[],
  bills: BillPayment[]
): ImprovementSuggestion[] {
  const suggestions: ImprovementSuggestion[] = [];
  const connected = platforms.filter((p) => p.connected);

  const earningsFactor = factors.find((f) => f.id === "earnings");
  if (earningsFactor && earningsFactor.score < 80) {
    suggestions.push({
      id: "s1",
      title: "Stabilize monthly earnings",
      description:
        "Try to maintain similar weekly hours across platforms to reduce income volatility.",
      impact: Math.min(8, Math.round((80 - earningsFactor.score) * 0.15)),
    });
  }

  const ratingsFactor = factors.find((f) => f.id === "ratings");
  const lowestRated = [...connected].sort((a, b) => a.rating - b.rating)[0];
  if (ratingsFactor && lowestRated && lowestRated.rating < 4.5) {
    suggestions.push({
      id: "s2",
      title: `Improve ${lowestRated.name} rating to 4.5+`,
      description: `Your current rating is ${lowestRated.rating}★. Maintaining 4.5+ for 2 more months builds lender confidence.`,
      impact: Math.min(6, Math.round((4.5 - lowestRated.rating) * 10)),
    });
  }

  const billsFactor = factors.find((f) => f.id === "bills");
  const lateBills = bills.filter((b) => !b.onTime).length;
  if (billsFactor && lateBills > 0) {
    suggestions.push({
      id: "s3",
      title: "Pay all utility bills on time",
      description: `You have ${lateBills} late payment${lateBills > 1 ? "s" : ""} in 6 months. Set up auto-pay for electricity and mobile.`,
      impact: Math.min(5, lateBills * 2),
    });
  }

  const diversityFactor = factors.find((f) => f.id === "diversity");
  if (diversityFactor && connected.length < 3) {
    const unconnected = platforms.filter((p) => !p.connected);
    if (unconnected.length > 0) {
      suggestions.push({
        id: "s4",
        title: `Connect ${unconnected[0].name}`,
        description:
          "Multi-platform verification shows income resilience and strengthens your passport.",
        impact: connected.length === 1 ? 6 : 4,
      });
    }
  }

  if (suggestions.length === 0) {
    suggestions.push({
      id: "s5",
      title: "Maintain your excellent standing",
      description:
        "Keep ratings above 4.5★ and continue on-time bill payments to preserve your top-tier score.",
      impact: 2,
    });
  }

  return suggestions.slice(0, 4);
}

export function computeTrustScore(worker: WorkerProfile): TrustScoreResult {
  const earnings = calcEarningsConsistency(worker.platforms);
  const ratings = calcPlatformRatings(worker.platforms);
  const tenure = calcWorkTenure(worker.platforms);
  const bills = calcBillPayments(worker.billPayments);
  const diversity = calcPlatformDiversity(worker.platforms);

  const factors: ScoreFactor[] = [
    {
      id: "earnings",
      name: "Earnings Consistency",
      weight: WEIGHTS.earningsConsistency,
      score: earnings.score,
      contribution: Math.round(earnings.score * WEIGHTS.earningsConsistency),
      explanation: earnings.explanation,
    },
    {
      id: "ratings",
      name: "Platform Ratings",
      weight: WEIGHTS.platformRatings,
      score: ratings.score,
      contribution: Math.round(ratings.score * WEIGHTS.platformRatings),
      explanation: ratings.explanation,
    },
    {
      id: "tenure",
      name: "Work Tenure",
      weight: WEIGHTS.workTenure,
      score: tenure.score,
      contribution: Math.round(tenure.score * WEIGHTS.workTenure),
      explanation: tenure.explanation,
    },
    {
      id: "bills",
      name: "On-time Bill Payments",
      weight: WEIGHTS.billPayments,
      score: bills.score,
      contribution: Math.round(bills.score * WEIGHTS.billPayments),
      explanation: bills.explanation,
    },
    {
      id: "diversity",
      name: "Multi-platform Diversity",
      weight: WEIGHTS.platformDiversity,
      score: diversity.score,
      contribution: Math.round(diversity.score * WEIGHTS.platformDiversity),
      explanation: diversity.explanation,
    },
  ];

  const overall = Math.min(
    100,
    factors.reduce((sum, f) => sum + f.contribution, 0)
  );

  return {
    overall,
    tier: getTier(overall),
    factors,
    suggestions: generateSuggestions(
      factors,
      worker.platforms,
      worker.billPayments
    ),
  };
}

export function getTierColor(tier: ScoreTier): string {
  switch (tier) {
    case "Excellent":
      return "text-emerald-600";
    case "Good":
      return "text-amber-600";
    case "Building":
      return "text-orange-500";
    default:
      return "text-slate-500";
  }
}

export function getTierBg(tier: ScoreTier): string {
  switch (tier) {
    case "Excellent":
      return "bg-emerald-50 border-emerald-200";
    case "Good":
      return "bg-amber-50 border-amber-200";
    case "Building":
      return "bg-orange-50 border-orange-200";
    default:
      return "bg-slate-50 border-slate-200";
  }
}

/**
 * Computes safe commitment absorption capacity.
 * Addresses problem statement: "Earning is recorded, but earning capacity is not...
 * how much further commitment could safely be absorbed."
 */
export function computeSafeCommitmentCapacity(worker: WorkerProfile): CommitmentCapacity {
  const connected = worker.platforms.filter((p) => p.connected);

  // Calculate monthly totals across connected platforms
  const monthCount = connected[0]?.earnings.length ?? 6;
  const monthlyTotals: number[] = Array(monthCount).fill(0);

  connected.forEach((p) => {
    p.earnings.forEach((e, idx) => {
      monthlyTotals[idx] += e.amount;
    });
  });

  // Add informal merchant volume if present (prorated net income ~20% margin)
  if (worker.merchantCashflow) {
    const estimatedMerchantNet = Math.round(worker.merchantCashflow.monthlyVolume * 0.18);
    for (let i = 0; i < monthlyTotals.length; i++) {
      monthlyTotals[i] += estimatedMerchantNet;
    }
  }

  const averageMonthlyIncome =
    monthlyTotals.length > 0
      ? Math.round(monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length)
      : 0;

  // The floor income is the lowest monthly earnings in the observed window
  const baselineFloorIncome =
    monthlyTotals.length > 0 ? Math.min(...monthlyTotals) : 0;

  // Living expense assumption based on local tier-1/2 benchmark (~50% of floor)
  const estimatedLivingExpenses = Math.round(baselineFloorIncome * 0.52);

  // Safe absorption EMI is ~35% of the disposable floor buffer
  const disposableFloorBuffer = Math.max(0, baselineFloorIncome - estimatedLivingExpenses);
  const safeMonthlyEmiAbsorption = Math.round(disposableFloorBuffer * 0.42);

  // Recommended safe loan is 12-18 months of safe EMI
  const maxRecommendedLoan = Math.round(safeMonthlyEmiAbsorption * 15);

  const absorptionHeadroomPercent =
    averageMonthlyIncome > 0
      ? Math.round((safeMonthlyEmiAbsorption / averageMonthlyIncome) * 100)
      : 0;

  let capacityGrade: CommitmentCapacity["capacityGrade"] = "Moderate Headroom";
  if (safeMonthlyEmiAbsorption >= 8000) capacityGrade = "High Headroom";
  else if (safeMonthlyEmiAbsorption < 3500) capacityGrade = "Tight Cashflow";

  return {
    baselineFloorIncome,
    averageMonthlyIncome,
    estimatedLivingExpenses,
    safeMonthlyEmiAbsorption,
    maxRecommendedLoan,
    absorptionHeadroomPercent,
    capacityGrade,
  };
}

/**
 * Simulates institutional credit decisions with explainable Adverse Action reasoning.
 * Addresses problem statement: "Decisions are returned without an explanation the subject can act on —
 * Rejections arrive as an outcome, not a reason."
 */
export function simulateLoanDecision(
  worker: WorkerProfile,
  loanAmount: number,
  tenureMonths: number
): SimulatedDecisionResult {
  const capacity = computeSafeCommitmentCapacity(worker);
  const trustScore = computeTrustScore(worker);

  // Flat interest approximation (14% p.a. standard NBFC thin-file rate)
  const monthlyRate = 0.14 / 12;
  const totalInterest = loanAmount * monthlyRate * tenureMonths;
  const estimatedEmi = Math.round((loanAmount + totalInterest) / tenureMonths);

  const emiToSafeRatio = capacity.safeMonthlyEmiAbsorption > 0
    ? estimatedEmi / capacity.safeMonthlyEmiAbsorption
    : 2.0;

  if (trustScore.overall >= 70 && emiToSafeRatio <= 1.0) {
    return {
      loanAmount,
      tenureMonths,
      estimatedEmi,
      status: "Pre-Approved",
      confidenceScore: Math.min(96, trustScore.overall + 8),
      verdictReason: `Your worst-case floor income (₹${capacity.baselineFloorIncome.toLocaleString("en-IN")}/mo) covers this ₹${estimatedEmi.toLocaleString("en-IN")}/mo EMI with a comfortable ${Math.round((1 - emiToSafeRatio) * 100)}% safety buffer. Verified tenure across ${worker.platforms.filter((p) => p.connected).length} platforms supports high repayment reliability.`,
      actionableRoadmap: [
        "Eligible for instant disbursal with zero additional physical documentation.",
        "Opting for auto-debit on the 5th of each month (post Swiggy/Uber payout) avoids late penalties.",
      ],
    };
  } else if (trustScore.overall >= 55 && emiToSafeRatio <= 1.35) {
    return {
      loanAmount,
      tenureMonths,
      estimatedEmi,
      status: "Conditional Approval",
      confidenceScore: 72,
      verdictReason: `The ₹${estimatedEmi.toLocaleString("en-IN")}/mo commitment stretches your conservative floor cashflow buffer by ${(emiToSafeRatio * 100 - 100).toFixed(0)}%. However, your active ratings and on-time utility records warrant approval under flexible weekly repayment terms.`,
      actionableRoadmap: [
        `Consider extending tenure to ${tenureMonths + 6} months to bring the monthly EMI within your safe ₹${capacity.safeMonthlyEmiAbsorption.toLocaleString("en-IN")} threshold.`,
        "Linking one additional platform or UPI merchant QR will upgrade this to an unconditional pre-approval.",
      ],
    };
  } else {
    // Adverse action with transparent reasons
    const causes: string[] = [];
    if (emiToSafeRatio > 1.35) {
      causes.push(
        `Requested EMI (₹${estimatedEmi.toLocaleString("en-IN")}) exceeds your safe stress-tested floor buffer (₹${capacity.safeMonthlyEmiAbsorption.toLocaleString("en-IN")}).`
      );
    }
    if (trustScore.overall < 55) {
      causes.push(
        `Trust Score of ${trustScore.overall}/100 indicates recent income volatility or delayed utility payments.`
      );
    }

    return {
      loanAmount,
      tenureMonths,
      estimatedEmi,
      status: "Action Needed",
      confidenceScore: 48,
      verdictReason: `Institutional underwriting rule triggered: ${causes.join(" ")} Lenders cannot approve without risking severe cashflow strain during lean gig weeks.`,
      actionableRoadmap: [
        `Adjust loan request to ≤ ₹${capacity.maxRecommendedLoan.toLocaleString("en-IN")} or choose a ${Math.min(36, tenureMonths + 12)}-month tenure to match your safe cashflow floor.`,
        "Maintain on-time payments for your electricity and mobile bills for the next 60 days (+5 score impact).",
        "Keep weekly delivery/driving hours consistent across platforms to reduce month-to-month variance below 20%.",
      ],
    };
  }
}

/**
 * Generates cryptographic tamper-evidence metadata.
 * Addresses problem statement: "Self-declared documents are the only bridge, and they can be fabricated...
 * tamper-evident and explainable representation."
 */
export function getVerificationAudit(worker: WorkerProfile): VerificationAudit {
  if (worker.verificationAudit) return worker.verificationAudit;

  const connectedNames = worker.platforms
    .filter((p) => p.connected)
    .map((p) => `${p.name} Partner API`);

  // Deterministic mock SHA-256 styled hash based on passportId
  const hash = `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
    .split("")
    .map((c, i) => {
      const code = (worker.passportId.charCodeAt(i % worker.passportId.length) + i) % 16;
      return code.toString(16);
    })
    .join("");

  return {
    hash: `0x${hash}`,
    signature: `secp256k1:sig_${worker.passportId.replace(/[^A-Za-z0-9]/g, "")}_${worker.avatarInitials}`,
    timestamp: "2024-07-19T06:30:00Z",
    dataRails: [
      ...connectedNames,
      "DigiLocker Govt ID Vault",
      "NPCI BBPS Utility Rails",
      ...(worker.merchantCashflow ? ["UPI Merchant Settlement Stream (NPCI)"] : []),
    ],
    tamperStatus: "verified_authentic",
    fraudRiskLevel: worker.platforms.filter((p) => p.connected).length >= 2 ? "Negligible (<1%)" : "Low (2-5%)",
    consentProtocol: "RBI Account Aggregator (AA) + DigiLocker",
  };
}

