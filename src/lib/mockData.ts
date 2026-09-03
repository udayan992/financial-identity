import type {
  Institution,
  PlatformData,
  ShareRecord,
  WorkerProfile,
} from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function earnings(
  amounts: number[]
): { month: string; amount: number }[] {
  return MONTHS.map((month, i) => ({ month, amount: amounts[i] }));
}

const ALL_PLATFORMS: Omit<PlatformData, "connected" | "earnings" | "rating" | "tenureMonths" | "completedJobs">[] = [
  { id: "swiggy", name: "Swiggy", color: "#FC8019", initials: "SW" },
  { id: "zomato", name: "Zomato", color: "#E23744", initials: "ZO" },
  { id: "uber", name: "Uber", color: "#000000", initials: "UB" },
  { id: "ola", name: "Ola", color: "#2D9E4D", initials: "OL" },
  { id: "urbancompany", name: "Urban Company", color: "#6C3FC5", initials: "UC" },
];

export const PLATFORM_TEMPLATES = ALL_PLATFORMS;

export const institutions: Institution[] = [
  { id: "inst-hdfc", name: "HDFC Bank", type: "bank" },
  { id: "inst-bajaj", name: "Bajaj Finserv NBFC", type: "nbfc" },
  { id: "inst-tata", name: "Tata AIG Insurance", type: "insurance" },
  { id: "inst-abc", name: "ABC Corp (Employer)", type: "employer" },
  { id: "inst-nest", name: "Nest Properties", type: "landlord" },
  { id: "inst-icici", name: "ICICI Lombard", type: "insurance" },
];

export const workers: WorkerProfile[] = [
  {
    id: "worker-rajesh",
    passportId: "BHR-2024-RK7842",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    avatarInitials: "RK",
    platforms: [
      {
        ...ALL_PLATFORMS[0],
        connected: true,
        earnings: earnings([28500, 29200, 27800, 30100, 28900, 29500]),
        rating: 4.8,
        tenureMonths: 42,
        completedJobs: 3840,
      },
      {
        ...ALL_PLATFORMS[1],
        connected: true,
        earnings: earnings([15200, 14800, 16100, 15500, 15900, 15300]),
        rating: 4.7,
        tenureMonths: 28,
        completedJobs: 1920,
      },
      {
        ...ALL_PLATFORMS[2],
        connected: true,
        earnings: earnings([22000, 21500, 22800, 22100, 21900, 22400]),
        rating: 4.9,
        tenureMonths: 36,
        completedJobs: 2100,
      },
      {
        ...ALL_PLATFORMS[3],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
      {
        ...ALL_PLATFORMS[4],
        connected: true,
        earnings: earnings([8500, 9200, 8800, 9100, 8700, 9000]),
        rating: 4.6,
        tenureMonths: 18,
        completedJobs: 340,
      },
    ],
    billPayments: [
      { month: "Jan", type: "electricity", onTime: true },
      { month: "Feb", type: "electricity", onTime: true },
      { month: "Mar", type: "electricity", onTime: true },
      { month: "Apr", type: "electricity", onTime: true },
      { month: "May", type: "electricity", onTime: true },
      { month: "Jun", type: "electricity", onTime: true },
      { month: "Jan", type: "mobile", onTime: true },
      { month: "Feb", type: "mobile", onTime: true },
      { month: "Mar", type: "mobile", onTime: true },
      { month: "Apr", type: "mobile", onTime: true },
      { month: "May", type: "mobile", onTime: true },
      { month: "Jun", type: "mobile", onTime: true },
    ],
    scoreHistory: [
      { month: "Jan", score: 78 },
      { month: "Feb", score: 80 },
      { month: "Mar", score: 81 },
      { month: "Apr", score: 83 },
      { month: "May", score: 84 },
      { month: "Jun", score: 86 },
    ],
    activityLog: [
      { id: "a1", date: "2024-07-18", message: "Swiggy: 4.8★ rating maintained", platform: "swiggy", type: "rating" },
      { id: "a2", date: "2024-07-15", message: "Electricity bill paid on time", type: "payment" },
      { id: "a3", date: "2024-07-10", message: "Uber: ₹22,400 earned this month", platform: "uber", type: "earnings" },
      { id: "a4", date: "2024-07-05", message: "3+ years work history milestone reached", type: "milestone" },
      { id: "a5", date: "2024-07-01", message: "Zomato: 4.7★ rating maintained", platform: "zomato", type: "rating" },
    ],
    merchantCashflow: {
      provider: "PhonePe QR",
      upiVpa: "rajesh.fastdelivery@ybl",
      avgDailyTransactions: 24,
      monthlyVolume: 42000,
      activeSettlementDays: 28,
      qrTenureMonths: 18,
    },
    supplierKhatas: [
      {
        id: "sup-1",
        supplierName: "Sri Balaji Auto Spares & Servicing",
        category: "Fuel & Maintenance",
        monthlyVolume: 4500,
        settlementRate: 100,
        activeMonths: 24,
      },
      {
        id: "sup-2",
        supplierName: "Apex Mobile Recharge & Telecom",
        category: "Wholesale Spares",
        monthlyVolume: 1200,
        settlementRate: 100,
        activeMonths: 16,
      },
    ],
  },

  {
    id: "worker-priya",
    passportId: "BHR-2024-PS3291",
    name: "Priya Sharma",
    phone: "+91 91234 56789",
    city: "Mumbai",
    avatarInitials: "PS",
    platforms: [
      {
        ...ALL_PLATFORMS[0],
        connected: true,
        earnings: earnings([22000, 18500, 24000, 19800, 21500, 20200]),
        rating: 4.4,
        tenureMonths: 24,
        completedJobs: 2100,
      },
      {
        ...ALL_PLATFORMS[1],
        connected: true,
        earnings: earnings([12000, 14500, 11000, 13200, 12800, 13500]),
        rating: 4.3,
        tenureMonths: 20,
        completedJobs: 1580,
      },
      {
        ...ALL_PLATFORMS[2],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
      {
        ...ALL_PLATFORMS[3],
        connected: true,
        earnings: earnings([18000, 16200, 19500, 17000, 18800, 17500]),
        rating: 4.5,
        tenureMonths: 15,
        completedJobs: 980,
      },
      {
        ...ALL_PLATFORMS[4],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
    ],
    billPayments: [
      { month: "Jan", type: "electricity", onTime: true },
      { month: "Feb", type: "electricity", onTime: true },
      { month: "Mar", type: "electricity", onTime: false },
      { month: "Apr", type: "electricity", onTime: true },
      { month: "May", type: "electricity", onTime: true },
      { month: "Jun", type: "electricity", onTime: true },
      { month: "Jan", type: "mobile", onTime: true },
      { month: "Feb", type: "mobile", onTime: true },
      { month: "Mar", type: "mobile", onTime: true },
      { month: "Apr", type: "mobile", onTime: false },
      { month: "May", type: "mobile", onTime: true },
      { month: "Jun", type: "mobile", onTime: true },
    ],
    scoreHistory: [
      { month: "Jan", score: 58 },
      { month: "Feb", score: 60 },
      { month: "Mar", score: 59 },
      { month: "Apr", score: 62 },
      { month: "May", score: 64 },
      { month: "Jun", score: 66 },
    ],
    activityLog: [
      { id: "b1", date: "2024-07-17", message: "Ola: 4.5★ rating improved", platform: "ola", type: "rating" },
      { id: "b2", date: "2024-07-12", message: "Mobile bill paid 3 days late", type: "payment" },
      { id: "b3", date: "2024-07-08", message: "Swiggy: ₹20,200 earned this month", platform: "swiggy", type: "earnings" },
      { id: "b4", date: "2024-07-02", message: "Zomato: 4.3★ — below target", platform: "zomato", type: "rating" },
    ],
    merchantCashflow: {
      provider: "Google Pay Business",
      upiVpa: "priyasharma.orders@okhdfcbank",
      avgDailyTransactions: 14,
      monthlyVolume: 26000,
      activeSettlementDays: 24,
      qrTenureMonths: 12,
    },
    supplierKhatas: [
      {
        id: "sup-p1",
        supplierName: "Metro Bike Care & Lubricants",
        category: "Fuel & Maintenance",
        monthlyVolume: 3200,
        settlementRate: 92,
        activeMonths: 14,
      },
    ],
  },

  {
    id: "worker-amit",
    passportId: "BHR-2024-AP5510",
    name: "Amit Patel",
    phone: "+91 99887 76655",
    city: "Delhi",
    avatarInitials: "AP",
    platforms: [
      {
        ...ALL_PLATFORMS[0],
        connected: true,
        earnings: earnings([12000, 8500, 15000, 9200, 11000, 7800]),
        rating: 3.8,
        tenureMonths: 8,
        completedJobs: 420,
      },
      {
        ...ALL_PLATFORMS[1],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
      {
        ...ALL_PLATFORMS[2],
        connected: true,
        earnings: earnings([14000, 10500, 16000, 11800, 9500, 13200]),
        rating: 4.0,
        tenureMonths: 10,
        completedJobs: 580,
      },
      {
        ...ALL_PLATFORMS[3],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
      {
        ...ALL_PLATFORMS[4],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
    ],
    billPayments: [
      { month: "Jan", type: "electricity", onTime: false },
      { month: "Feb", type: "electricity", onTime: true },
      { month: "Mar", type: "electricity", onTime: false },
      { month: "Apr", type: "electricity", onTime: true },
      { month: "May", type: "electricity", onTime: false },
      { month: "Jun", type: "electricity", onTime: true },
      { month: "Jan", type: "mobile", onTime: true },
      { month: "Feb", type: "mobile", onTime: false },
      { month: "Mar", type: "mobile", onTime: true },
      { month: "Apr", type: "mobile", onTime: false },
      { month: "May", type: "mobile", onTime: true },
      { month: "Jun", type: "mobile", onTime: false },
    ],
    scoreHistory: [
      { month: "Jan", score: 35 },
      { month: "Feb", score: 37 },
      { month: "Mar", score: 36 },
      { month: "Apr", score: 38 },
      { month: "May", score: 39 },
      { month: "Jun", score: 41 },
    ],
    activityLog: [
      { id: "c1", date: "2024-07-16", message: "Electricity bill paid 5 days late", type: "payment" },
      { id: "c2", date: "2024-07-11", message: "Swiggy: 3.8★ — needs improvement", platform: "swiggy", type: "rating" },
      { id: "c3", date: "2024-07-06", message: "Uber: High earnings volatility detected", platform: "uber", type: "earnings" },
      { id: "c4", date: "2024-07-01", message: "Mobile bill paid 2 days late", type: "payment" },
    ],
    merchantCashflow: {
      provider: "Paytm All-in-One",
      upiVpa: "amit.quickservices@paytm",
      avgDailyTransactions: 8,
      monthlyVolume: 14500,
      activeSettlementDays: 16,
      qrTenureMonths: 6,
    },
    supplierKhatas: [
      {
        id: "sup-a1",
        supplierName: "Rajdhani Fuel Station",
        category: "Fuel & Maintenance",
        monthlyVolume: 2800,
        settlementRate: 75,
        activeMonths: 6,
      },
    ],
  },

  {
    id: "worker-sneha",
    passportId: "BHR-2024-SR6723",
    name: "Sneha Reddy",
    phone: "+91 97654 32109",
    city: "Hyderabad",
    avatarInitials: "SR",
    platforms: [
      {
        ...ALL_PLATFORMS[0],
        connected: true,
        earnings: earnings([19500, 20200, 19800, 20500, 20100, 19900]),
        rating: 4.6,
        tenureMonths: 30,
        completedJobs: 2650,
      },
      {
        ...ALL_PLATFORMS[1],
        connected: true,
        earnings: earnings([11000, 11500, 10800, 11200, 11400, 11100]),
        rating: 4.5,
        tenureMonths: 22,
        completedJobs: 1420,
      },
      {
        ...ALL_PLATFORMS[2],
        connected: true,
        earnings: earnings([16000, 15500, 16200, 15800, 16100, 15900]),
        rating: 4.7,
        tenureMonths: 26,
        completedJobs: 1680,
      },
      {
        ...ALL_PLATFORMS[3],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
      {
        ...ALL_PLATFORMS[4],
        connected: false,
        earnings: earnings([0, 0, 0, 0, 0, 0]),
        rating: 0,
        tenureMonths: 0,
        completedJobs: 0,
      },
    ],
    billPayments: [
      { month: "Jan", type: "electricity", onTime: true },
      { month: "Feb", type: "electricity", onTime: true },
      { month: "Mar", type: "electricity", onTime: true },
      { month: "Apr", type: "electricity", onTime: true },
      { month: "May", type: "electricity", onTime: false },
      { month: "Jun", type: "electricity", onTime: true },
      { month: "Jan", type: "mobile", onTime: true },
      { month: "Feb", type: "mobile", onTime: true },
      { month: "Mar", type: "mobile", onTime: true },
      { month: "Apr", type: "mobile", onTime: true },
      { month: "May", type: "mobile", onTime: true },
      { month: "Jun", type: "mobile", onTime: true },
    ],
    scoreHistory: [
      { month: "Jan", score: 68 },
      { month: "Feb", score: 69 },
      { month: "Mar", score: 70 },
      { month: "Apr", score: 71 },
      { month: "May", score: 72 },
      { month: "Jun", score: 73 },
    ],
    activityLog: [
      { id: "d1", date: "2024-07-18", message: "Uber: 4.7★ rating maintained", platform: "uber", type: "rating" },
      { id: "d2", date: "2024-07-14", message: "Swiggy: ₹19,900 earned this month", platform: "swiggy", type: "earnings" },
      { id: "d3", date: "2024-07-09", message: "Electricity bill paid on time", type: "payment" },
      { id: "d4", date: "2024-07-03", message: "Zomato: 4.5★ rating maintained", platform: "zomato", type: "rating" },
    ],
    merchantCashflow: {
      provider: "PhonePe QR",
      upiVpa: "sneha.bakesandcrafts@ybl",
      avgDailyTransactions: 19,
      monthlyVolume: 34500,
      activeSettlementDays: 26,
      qrTenureMonths: 20,
    },
    supplierKhatas: [
      {
        id: "sup-s1",
        supplierName: "Deccan Packaging Solutions",
        category: "Packaging",
        monthlyVolume: 5100,
        settlementRate: 98,
        activeMonths: 18,
      },
    ],
  },

  {
    id: "worker-vikram",
    passportId: "BHR-2024-VS9104",
    name: "Vikram Singh",
    phone: "+91 96543 21098",
    city: "Pune",
    avatarInitials: "VS",
    platforms: [
      {
        ...ALL_PLATFORMS[0],
        connected: true,
        earnings: earnings([32000, 31500, 32800, 32200, 31900, 32500]),
        rating: 4.9,
        tenureMonths: 48,
        completedJobs: 4200,
      },
      {
        ...ALL_PLATFORMS[1],
        connected: true,
        earnings: earnings([18000, 17500, 18200, 17800, 18100, 17900]),
        rating: 4.8,
        tenureMonths: 40,
        completedJobs: 2800,
      },
      {
        ...ALL_PLATFORMS[2],
        connected: true,
        earnings: earnings([25000, 24800, 25200, 24900, 25100, 25000]),
        rating: 4.9,
        tenureMonths: 44,
        completedJobs: 3200,
      },
      {
        ...ALL_PLATFORMS[3],
        connected: true,
        earnings: earnings([12000, 11800, 12200, 11900, 12100, 12000]),
        rating: 4.7,
        tenureMonths: 24,
        completedJobs: 1100,
      },
      {
        ...ALL_PLATFORMS[4],
        connected: true,
        earnings: earnings([10000, 10500, 10200, 10800, 10400, 10600]),
        rating: 4.8,
        tenureMonths: 20,
        completedJobs: 480,
      },
    ],
    billPayments: [
      { month: "Jan", type: "electricity", onTime: true },
      { month: "Feb", type: "electricity", onTime: true },
      { month: "Mar", type: "electricity", onTime: true },
      { month: "Apr", type: "electricity", onTime: true },
      { month: "May", type: "electricity", onTime: true },
      { month: "Jun", type: "electricity", onTime: true },
      { month: "Jan", type: "mobile", onTime: true },
      { month: "Feb", type: "mobile", onTime: true },
      { month: "Mar", type: "mobile", onTime: true },
      { month: "Apr", type: "mobile", onTime: true },
      { month: "May", type: "mobile", onTime: true },
      { month: "Jun", type: "mobile", onTime: true },
    ],
    scoreHistory: [
      { month: "Jan", score: 84 },
      { month: "Feb", score: 85 },
      { month: "Mar", score: 86 },
      { month: "Apr", score: 87 },
      { month: "May", score: 88 },
      { month: "Jun", score: 89 },
    ],
    activityLog: [
      { id: "e1", date: "2024-07-19", message: "5 platforms verified — top diversity", type: "milestone" },
      { id: "e2", date: "2024-07-16", message: "Swiggy: 4.9★ rating maintained", platform: "swiggy", type: "rating" },
      { id: "e3", date: "2024-07-12", message: "4+ years work history milestone", type: "milestone" },
      { id: "e4", date: "2024-07-08", message: "All bills paid on time this month", type: "payment" },
      { id: "e5", date: "2024-07-04", message: "Uber: ₹25,000 earned this month", platform: "uber", type: "earnings" },
    ],
    merchantCashflow: {
      provider: "Google Pay Business",
      upiVpa: "vikram.fleet.express@okicici",
      avgDailyTransactions: 36,
      monthlyVolume: 68000,
      activeSettlementDays: 29,
      qrTenureMonths: 32,
    },
    supplierKhatas: [
      {
        id: "sup-v1",
        supplierName: "Sahyadri Tyres & Wheels",
        category: "Fuel & Maintenance",
        monthlyVolume: 7800,
        settlementRate: 100,
        activeMonths: 30,
      },
    ],
  },

];

export const initialShareRecords: ShareRecord[] = [
  {
    id: "share-1",
    workerId: "worker-rajesh",
    institutionId: "inst-hdfc",
    institutionName: "HDFC Bank",
    sharedAt: "2024-07-16",
    expiresAt: "2024-08-16",
    viewedAt: "2024-07-18",
    settings: { showFullBreakdown: true, showEarnings: false, expiryDays: 30 },
    revoked: false,
    shareToken: "rajesh-hdfc-2024",
  },
  {
    id: "share-2",
    workerId: "worker-rajesh",
    institutionId: "inst-bajaj",
    institutionName: "Bajaj Finserv NBFC",
    sharedAt: "2024-07-10",
    expiresAt: "2024-07-25",
    settings: { showFullBreakdown: false, showEarnings: true, expiryDays: 15 },
    revoked: false,
    shareToken: "rajesh-bajaj-2024",
  },
  {
    id: "share-3",
    workerId: "worker-priya",
    institutionId: "inst-hdfc",
    institutionName: "HDFC Bank",
    sharedAt: "2024-07-14",
    expiresAt: "2024-08-14",
    viewedAt: "2024-07-15",
    settings: { showFullBreakdown: true, showEarnings: true, expiryDays: 30 },
    revoked: false,
    shareToken: "priya-hdfc-2024",
  },
  {
    id: "share-4",
    workerId: "worker-sneha",
    institutionId: "inst-tata",
    institutionName: "Tata AIG Insurance",
    sharedAt: "2024-07-12",
    expiresAt: "2024-08-12",
    settings: { showFullBreakdown: true, showEarnings: false, expiryDays: 30 },
    revoked: false,
    shareToken: "sneha-tata-2024",
  },
  {
    id: "share-5",
    workerId: "worker-vikram",
    institutionId: "inst-icici",
    institutionName: "ICICI Lombard",
    sharedAt: "2024-07-08",
    expiresAt: "2024-08-08",
    viewedAt: "2024-07-10",
    settings: { showFullBreakdown: true, showEarnings: true, expiryDays: 30 },
    revoked: false,
    shareToken: "vikram-icici-2024",
  },
  {
    id: "share-6",
    workerId: "worker-amit",
    institutionId: "inst-nest",
    institutionName: "Nest Properties",
    sharedAt: "2024-07-05",
    expiresAt: "2024-07-20",
    settings: { showFullBreakdown: false, showEarnings: false, expiryDays: 15 },
    revoked: false,
    shareToken: "amit-nest-2024",
  },
];

export function getWorkerById(id: string): WorkerProfile | undefined {
  return workers.find((w) => w.id === id);
}

export function getWorkerByPassportId(passportId: string): WorkerProfile | undefined {
  return workers.find((w) => w.passportId === passportId);
}

export function getWorkerByShareToken(
  token: string,
  extraRecords: ShareRecord[] = []
): {
  worker: WorkerProfile;
  share: ShareRecord;
} | undefined {
  const allRecords = [...extraRecords, ...initialShareRecords];
  const share = allRecords.find((s) => s.shareToken === token && !s.revoked);
  if (!share) return undefined;
  const worker = getWorkerById(share.workerId);
  if (!worker) return undefined;
  return { worker, share };
}

export function createEmptyWorker(
  name: string,
  phone: string,
  city: string,
  connectedPlatformIds: string[]
): WorkerProfile {
  const id = `worker-custom-${Date.now()}`;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return {
    id,
    passportId: `BHR-2024-${initials}${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    phone,
    city,
    avatarInitials: initials,
    platforms: ALL_PLATFORMS.map((p) => ({
      ...p,
      connected: connectedPlatformIds.includes(p.id),
      earnings: connectedPlatformIds.includes(p.id)
        ? earnings([18000, 19500, 17200, 18800, 19000, 18500])
        : earnings([0, 0, 0, 0, 0, 0]),
      rating: connectedPlatformIds.includes(p.id) ? 4.4 : 0,
      tenureMonths: connectedPlatformIds.includes(p.id) ? 14 : 0,
      completedJobs: connectedPlatformIds.includes(p.id) ? 850 : 0,
    })),
    billPayments: [
      { month: "Jan", type: "electricity", onTime: true },
      { month: "Feb", type: "electricity", onTime: true },
      { month: "Mar", type: "electricity", onTime: true },
      { month: "Apr", type: "electricity", onTime: false },
      { month: "May", type: "electricity", onTime: true },
      { month: "Jun", type: "electricity", onTime: true },
      { month: "Jan", type: "mobile", onTime: true },
      { month: "Feb", type: "mobile", onTime: true },
      { month: "Mar", type: "mobile", onTime: true },
      { month: "Apr", type: "mobile", onTime: true },
      { month: "May", type: "mobile", onTime: true },
      { month: "Jun", type: "mobile", onTime: true },
    ],
    scoreHistory: [
      { month: "Jan", score: 55 },
      { month: "Feb", score: 57 },
      { month: "Mar", score: 58 },
      { month: "Apr", score: 60 },
      { month: "May", score: 61 },
      { month: "Jun", score: 63 },
    ],
    activityLog: [
      {
        id: "new-1",
        date: new Date().toISOString().split("T")[0],
        message: "Passport created — platforms connected",
        type: "milestone",
      },
    ],
  };
}
