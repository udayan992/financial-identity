"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createEmptyWorker,
  getWorkerById,
  initialShareRecords,
  workers,
} from "@/lib/mockData";
import { computeTrustScore } from "@/lib/scoring";
import type {
  OnboardingState,
  PlatformId,
  ShareRecord,
  ShareSettings,
  WorkerProfile,
} from "@/lib/types";

type ViewMode = "worker" | "lender";

interface AppState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentWorkerId: string;
  setCurrentWorkerId: (id: string) => void;
  worker: WorkerProfile;
  customWorkers: WorkerProfile[];
  trustScore: ReturnType<typeof computeTrustScore>;
  onboarding: OnboardingState;
  updateOnboarding: (data: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
  togglePlatformSharing: (platformId: PlatformId, shared: boolean) => void;
  shareRecords: ShareRecord[];
  createShare: (
    institutionName: string,
    settings: ShareSettings
  ) => ShareRecord;
  revokeShare: (shareId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  platformSharing: Record<PlatformId, boolean>;
}

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "credence-app-state";
const LEGACY_STORAGE_KEY = "bharosa-app-state";

interface PersistedState {
  viewMode: ViewMode;
  currentWorkerId: string;
  customWorkers: WorkerProfile[];
  shareRecords: ShareRecord[];
  onboarding: OnboardingState;
  platformSharing: Record<PlatformId, boolean>;
}

function loadState(): Partial<PersistedState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}


export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("worker");
  const [currentWorkerId, setCurrentWorkerId] = useState("worker-rajesh");
  const [customWorkers, setCustomWorkers] = useState<WorkerProfile[]>([]);
  const [shareRecords, setShareRecords] =
    useState<ShareRecord[]>(initialShareRecords);
  const [isLoading, setIsLoading] = useState(false);
  const [platformSharing, setPlatformSharing] = useState<
    Record<PlatformId, boolean>
  >({
    swiggy: true,
    zomato: true,
    uber: true,
    ola: true,
    urbancompany: true,
  });
  const [onboarding, setOnboarding] = useState<OnboardingState>({
    name: "",
    phone: "",
    city: "",
    connectedPlatforms: [],
    completed: false,
  });

  useEffect(() => {
    const saved = loadState();
    if (saved.viewMode) setViewMode(saved.viewMode);
    if (saved.currentWorkerId) setCurrentWorkerId(saved.currentWorkerId);
    if (saved.customWorkers) setCustomWorkers(saved.customWorkers);
    if (saved.shareRecords) setShareRecords(saved.shareRecords);
    if (saved.onboarding) setOnboarding(saved.onboarding);
    if (saved.platformSharing) setPlatformSharing(saved.platformSharing);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: PersistedState = {
      viewMode,
      currentWorkerId,
      customWorkers,
      shareRecords,
      onboarding,
      platformSharing,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [
    hydrated,
    viewMode,
    currentWorkerId,
    customWorkers,
    shareRecords,
    onboarding,
    platformSharing,
  ]);

  const allWorkers = useMemo(
    () => [...workers, ...customWorkers],
    [customWorkers]
  );

  const worker = useMemo(() => {
    return (
      allWorkers.find((w) => w.id === currentWorkerId) ??
      workers[0]
    );
  }, [allWorkers, currentWorkerId]);

  const workerWithSharing = useMemo(() => {
    return {
      ...worker,
      platforms: worker.platforms.map((p) => ({
        ...p,
        connected: p.connected && (platformSharing[p.id] ?? true),
      })),
    };
  }, [worker, platformSharing]);

  const trustScore = useMemo(
    () => computeTrustScore(workerWithSharing),
    [workerWithSharing]
  );

  const updateOnboarding = useCallback((data: Partial<OnboardingState>) => {
    setOnboarding((prev) => ({ ...prev, ...data }));
  }, []);

  const completeOnboarding = useCallback(() => {
    const newWorker = createEmptyWorker(
      onboarding.name,
      onboarding.phone,
      onboarding.city,
      onboarding.connectedPlatforms
    );
    setCustomWorkers((prev) => [...prev, newWorker]);
    setCurrentWorkerId(newWorker.id);
    setOnboarding((prev) => ({ ...prev, completed: true }));
  }, [onboarding]);

  const togglePlatformSharing = useCallback(
    (platformId: PlatformId, shared: boolean) => {
      setPlatformSharing((prev) => ({ ...prev, [platformId]: shared }));
    },
    []
  );

  const createShare = useCallback(
    (institutionName: string, settings: ShareSettings): ShareRecord => {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + settings.expiryDays);
      const token = `${worker.id}-${Date.now()}`;
      const record: ShareRecord = {
        id: `share-${Date.now()}`,
        workerId: worker.id,
        institutionId: `inst-custom-${Date.now()}`,
        institutionName,
        sharedAt: new Date().toISOString().split("T")[0],
        expiresAt: expiresAt.toISOString().split("T")[0],
        settings,
        revoked: false,
        shareToken: token,
      };
      setShareRecords((prev) => [record, ...prev]);
      return record;
    },
    [worker.id]
  );

  const revokeShare = useCallback((shareId: string) => {
    setShareRecords((prev) =>
      prev.map((s) => (s.id === shareId ? { ...s, revoked: true } : s))
    );
  }, []);

  const workerShareRecords = useMemo(
    () => shareRecords.filter((s) => s.workerId === currentWorkerId && !s.revoked),
    [shareRecords, currentWorkerId]
  );

  const value: AppState = {
    viewMode,
    setViewMode,
    currentWorkerId,
    setCurrentWorkerId,
    worker: workerWithSharing,
    customWorkers,
    trustScore,
    onboarding,
    updateOnboarding,
    completeOnboarding,
    togglePlatformSharing,
    shareRecords: workerShareRecords,
    createShare,
    revokeShare,
    isLoading,
    setIsLoading,
    platformSharing,
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-600 border-t-transparent" />
      </div>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function useWorkerById(id: string) {
  const worker = getWorkerById(id);
  return worker ?? workers[0];
}
