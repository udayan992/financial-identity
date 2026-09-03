# CredEnce 🛡️
### Verifiable Financial Identity & Underwriting Engine for Informal & Thin-File Earners
**Fintech & Commerce Track — Microsoft Innovation Club (MIC), VIT Chennai**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

---

## 📌 Problem Context (MIC VIT Chennai Problem Statement)

A large share of India's working population earns reliably without ever becoming legible to formal credit institutions. Delivery partners, rideshare drivers, small street vendors, daily-wage workers, and micro-enterprises receive money regularly, pay rent and utilities on time, settle obligations with peer suppliers, and raise invoices that get paid. 

Yet when they approach lenders or insurers, decisions rely on traditional credit scores (CIBIL/Experian), collateral, or audited salary slips — documents they do not possess. Conventional scoring equates an **absent record with an absent capacity to pay**, leaving thin-file earners trapped in high-cost informal debt.

### Core Gaps Identified:
1. **Earnings Recorded, But Earning Capacity is Not**: Lenders see cash arrived, but cannot deduce floor cashflow stability, existing living commitments, or safe monthly debt absorption headroom.
2. **Absence of History Read as Absence of Reliability**: Exclusion becomes self-reinforcing without historical credit products.
3. **Evidence is Fragmented Across Siloed Platforms**: Platform earnings (Swiggy, Zomato, Uber), UPI QR collections, and supplier khatas have no portable, unified representation.
4. **Self-Declared Documents Invite Fraud**: Physical screenshots and PDF payslips are easily fabricated, duplicated, or manipulated.
5. **Rejections Arrive Without Actionable Explanations**: Applicants receive binary rejections with zero guidance on what signal counted against them or how to improve.

---

## 💡 The Solution: CredEnce

**CredEnce** is a consent-governed, tamper-evident financial reputation passport and explainable underwriting protocol for informal and thin-file earners. CredEnce aggregates verified digital rails into an immutable, explainable **Trust Score (0–100)** and a portable credential that earners own, control, and share with any institution.

---

## 🌟 Key Innovations Built

### 1. Cryptographic Anti-Fraud & Tamper-Evident Proof (SHA-256)
- Replaces unverified, editable payslip screenshots with verifiable data provenance (Platform APIs, DigiLocker, NPCI BBPS, and Account Aggregator rails).
- Every passport is sealed with an immutable **SHA-256 content digest** and digital signature.
- Includes a live **Integrity Audit Inspector Modal** verifying 0% data alteration and classifying fraud risk as *Negligible (<1%)*.

### 2. Stress-Tested Safe Borrowing Capacity & Explainable Decision Simulator
- Calculates **Safe Monthly EMI Absorption Capacity** by stress-testing the earner's worst-case observed monthly floor income against local essential living expenses.
- Features an interactive **"What-If" Loan Pre-Qualification Simulator** where workers and lenders test credit amounts (₹5,000 to ₹1,00,000) and tenures (3 to 24 months).
- **Zero Silent Rejections**: If a loan request stretches the cashflow floor, CredEnce generates a plain-language **Actionable Adverse Action Notice** with an exact 3-step roadmap to qualify.

### 3. Informal & Micro-Merchant Proof Ledger (UPI QR & Supplier Khata)
- Expands beyond delivery platforms to include street vendors and small merchants:
  - **UPI QR Daily Settlements**: Tracks PhonePe/GPay Business daily transaction counts, active settlement days, and monthly volume.
  - **Supplier & Peer Khata Discipline**: Records trade credit settlements with local suppliers (auto spares, raw materials, packaging) with verified on-time settlement percentages.

### 4. Granular Consent & Time-Limited Sharing
- Workers generate time-limited (7, 15, 30, 60 days) shareable links and QR codes.
- Choose whether to disclose full score breakdowns, earnings figures, or high-level ratings.
- Instant, one-click revocation of institutional access at any time.

---

## 👥 Demo Profiles & Test Cases

The application includes 5 pre-configured personas spanning different informal earning profiles for testing and evaluation:

| Profile Name | Passport ID | Monthly Inflow | Tier | Key Scenario Tested |
|---|---|---|---|---|
| **Rajesh Kumar** | `BHR-2024-RK7842` | ₹80,000+ | **Excellent (86)** | Multi-platform veteran (Swiggy, Uber, Zomato) + PhonePe QR merchant inflow + 100% on-time utility history. Pre-approved for up to ₹1,00,000. |
| **Priya Sharma** | `BHR-2024-PS3291` | ₹45,000+ | **Good (66)** | Steady dual-platform delivery partner with moderate income variance and GPay Business QR inflow. Eligible for flexible/conditional loans. |
| **Amit Patel** | `BHR-2024-AP5510` | ₹20,000+ | **Starting (41)** | Thin-file worker with high month-to-month earnings volatility and late bill payments. Tests the **Explainable Adverse Action Engine**. |
| **Sneha Reddy** | `BHR-2024-SR6723` | ₹47,000+ | **Good (73)** | Platform delivery partner + artisanal packaging business with active supplier khata credit records. Strong payment discipline. |
| **Vikram Singh** | `BHR-2024-VS9104` | ₹1,05,000+ | **Excellent (89)** | 5-platform verified top earner with high-volume fleet UPI collections (₹68,000/mo) and multi-year verified tenure. |

---

## 🧪 Evaluation & Test Scenarios

### Test Case 1: Anti-Fraud & Tamper Verification
1. Navigate to **Dashboard** (`/dashboard`) or **Public Passport** (`/passport/rajesh-hdfc-2024`).
2. Click the green badge **"Cryptographically Verified (SHA-256)"** on the Passport Card.
3. Observe the immutable SHA-256 digest, digital signature, and verified data provenance rails.
4. Click **"Re-validate SHA-256 Seal"** to execute a live checksum verification.

### Test Case 2: What-If Loan Simulator & Actionable Adverse Action Notice
1. On the **Dashboard**, locate the **Safe Borrowing Capacity & Simulator** card.
2. Select **Rajesh Kumar** (Trust Score 86): Set Loan Amount to ₹40,000 and Tenure to 12 months.
   - *Expected Outcome*: **Pre-Approved** with plain-language explanation of floor income coverage.
3. Switch to **Amit Patel** (Trust Score 41): Set Loan Amount to ₹60,000 and Tenure to 6 months.
   - *Expected Outcome*: **Action Needed** (Adverse Action Notice) stating that EMI exceeds stress-tested floor buffer, accompanied by a 3-step roadmap to qualify.

### Test Case 3: Informal Micro-Merchant & Supplier Ledger
1. On the **Dashboard**, scroll to the bottom tabs and click **"Micro-Merchant & UPI Ledger"**.
2. Inspect the **UPI Merchant Settlement Stream** (VPA, daily transactions, active settlement days).
3. Inspect the **Supplier & Trade Khata Credit Discipline** cards showing on-time settlement percentages.

### Test Case 4: Consent-Controlled Sharing & Revocation
1. Navigate to **Share** (`/dashboard/share`).
2. Configure settings (toggle breakdown / earnings visibility, select expiry days).
3. Click **"Generate Shareable Link"** to create a custom URL and QR code.
4. Scroll down to **"Shared With"** and click **"Revoke"** on an active link to immediately terminate access.

### Test Case 5: Institutional Lender Review
1. Navigate to **Lender Portal** (`/lender`).
2. Observe institution metrics: *0% Fabricated Document Risk*, *100% Actionable Decisions*, *<30s Turnaround*.
3. Search applicants by name or city.
4. Click any applicant to inspect their read-only verified passport.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, Static Generation + Dynamic Rendering)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS with custom passport textures and micro-interactions
- **Animations**: Framer Motion
- **Visualizations**: Recharts (Interactive Area & Headroom Charts)
- **Icons**: Lucide React
- **QR Generation**: QRCode.react (SVG Vector Rendering)
- **UI Primitives**: Radix UI (Dialog, Tabs, Progress, Tooltip, Switch)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm or yarn

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/udayan992/financial-identity.git
cd financial-identity

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```
├── src/
│   ├── app/
│   │   ├── dashboard/           # Worker Dashboard & Simulator
│   │   │   └── share/           # Consent-governed sharing & revocation
│   │   ├── lender/              # Institutional Lender Portal
│   │   ├── onboard/             # Multi-step onboarding & platform connection
│   │   ├── passport/[id]/       # Verifiable read-only passport view
│   │   ├── layout.tsx           # Root layout & CredEnce metadata
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   ├── layout/Navbar.tsx    # Header navigation with role switcher
│   │   ├── passport/
│   │   │   ├── CommitmentSimulator.tsx   # Safe borrowing capacity & decision simulator
│   │   │   ├── InformalLedger.tsx        # UPI QR settlements & supplier khatas
│   │   │   ├── TamperVerificationModal.tsx # Cryptographic SHA-256 audit modal
│   │   │   ├── PassportCard.tsx          # Digital reputation card
│   │   │   ├── ScoreBreakdown.tsx        # Explainable AI factors breakdown
│   │   │   ├── ScoreHistoryChart.tsx     # 6-month historical trend
│   │   │   └── ConnectedPlatforms.tsx    # Multi-platform data feeds
│   │   └── ui/                           # Reusable design system primitives
│   ├── context/AppContext.tsx   # Global reactive state with local persistence
│   └── lib/
│       ├── types.ts             # Comprehensive domain types & schemas
│       ├── scoring.ts           # Explainable scoring & underwriting algorithms
│       ├── mockData.ts          # Authentic thin-file earner profiles
│       └── utils.ts             # Currency, date, and string formatting
└── README.md
```

---

## 🏆 Submission Note
Created for the **Microsoft Innovation Club (MIC), VIT Chennai** Hackathon under the **Fintech & Commerce Track**.
*Team CredEnce — Bringing financial legibility and dignity to the informal workforce.*
