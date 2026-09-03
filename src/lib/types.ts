export type PlatformId =
  | "swiggy"
  | "zomato"
  | "uber"
  | "ola"
  | "urbancompany";

export type ScoreTier = "Excellent" | "Good" | "Building" | "Starting";

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface PlatformData {
  id: PlatformId;
  name: string;
  color: string;
  initials: string;
  connected: boolean;
  earnings: MonthlyEarning[];
  rating: number;
  tenureMonths: number;
  completedJobs: number;
}

export interface BillPayment {
  month: string;
  type: "electricity" | "mobile";
  onTime: boolean;
}

export interface ScoreFactor {
  id: string;
  name: string;
  weight: number;
  score: number;
  contribution: number;
  explanation: string;
}

export interface ImprovementSuggestion {
  id: string;
  title: string;
  description: string;
  impact: number;
}

export interface ActivityEvent {
  id: string;
  date: string;
  message: string;
  platform?: PlatformId;
  type: "rating" | "payment" | "earnings" | "milestone";
}

export interface ScoreHistoryPoint {
  month: string;
  score: number;
}

export interface TrustScoreResult {
  overall: number;
  tier: ScoreTier;
  factors: ScoreFactor[];
  suggestions: ImprovementSuggestion[];
}

export interface VerificationAudit {
  hash: string;
  signature: string;
  timestamp: string;
  dataRails: string[];
  tamperStatus: "verified_authentic" | "needs_review";
  fraudRiskLevel: "Negligible (<1%)" | "Low (2-5%)" | "Moderate";
  consentProtocol: "RBI Account Aggregator (AA) + DigiLocker";
}

export interface MerchantCashflow {
  provider: "PhonePe QR" | "Google Pay Business" | "Paytm All-in-One";
  upiVpa: string;
  avgDailyTransactions: number;
  monthlyVolume: number;
  activeSettlementDays: number;
  qrTenureMonths: number;
}

export interface SupplierKhataEntry {
  id: string;
  supplierName: string;
  category: "Raw Material" | "Fuel & Maintenance" | "Wholesale Spares" | "Packaging";
  monthlyVolume: number;
  settlementRate: number; // percentage on time
  activeMonths: number;
}

export interface CommitmentCapacity {
  baselineFloorIncome: number;
  averageMonthlyIncome: number;
  estimatedLivingExpenses: number;
  safeMonthlyEmiAbsorption: number;
  maxRecommendedLoan: number;
  absorptionHeadroomPercent: number;
  capacityGrade: "High Headroom" | "Moderate Headroom" | "Tight Cashflow";
}

export interface SimulatedDecisionResult {
  loanAmount: number;
  tenureMonths: number;
  estimatedEmi: number;
  status: "Pre-Approved" | "Conditional Approval" | "Action Needed";
  confidenceScore: number;
  verdictReason: string;
  actionableRoadmap: string[];
}

export interface WorkerProfile {
  id: string;
  passportId: string;
  name: string;
  phone: string;
  city: string;
  avatarInitials: string;
  platforms: PlatformData[];
  billPayments: BillPayment[];
  scoreHistory: ScoreHistoryPoint[];
  activityLog: ActivityEvent[];
  verificationAudit?: VerificationAudit;
  merchantCashflow?: MerchantCashflow;
  supplierKhatas?: SupplierKhataEntry[];
}

export interface ShareSettings {
  showFullBreakdown: boolean;
  showEarnings: boolean;
  expiryDays: number;
}

export interface ShareRecord {
  id: string;
  workerId: string;
  institutionId: string;
  institutionName: string;
  sharedAt: string;
  expiresAt: string;
  viewedAt?: string;
  settings: ShareSettings;
  revoked: boolean;
  shareToken: string;
}

export interface Institution {
  id: string;
  name: string;
  type: "bank" | "nbfc" | "insurance" | "employer" | "landlord";
}

export interface OnboardingState {
  name: string;
  phone: string;
  city: string;
  connectedPlatforms: PlatformId[];
  completed: boolean;
}

