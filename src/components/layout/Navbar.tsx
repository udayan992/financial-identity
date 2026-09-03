"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { viewMode, setViewMode } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLanding = pathname === "/";
  const isLender = viewMode === "lender" || pathname.startsWith("/lender");
  const isPassportView = pathname.startsWith("/passport");

  if (isPassportView) return null;

  const workerLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/share", label: "Share" },
  ];

  const lenderLinks = [{ href: "/lender", label: "Applicants" }];

  const links = isLender ? lenderLinks : workerLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-white shadow-sm group-hover:bg-navy-700 transition-colors">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-navy-900 tracking-tight leading-none">
              CredEnce
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              MIC VIT Chennai · Fintech
            </span>
          </div>

        </Link>


        <nav className="hidden md:flex items-center gap-1">
          {!isLanding &&
            links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-navy-50 text-navy-800"
                    : "text-slate-600 hover:text-navy-800 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode("worker")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                !isLender
                  ? "bg-white text-navy-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Worker
            </button>
            <button
              onClick={() => setViewMode("lender")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                isLender
                  ? "bg-white text-navy-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Lender
            </button>
          </div>
          {isLanding && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/lender">I&apos;m a Lender</Link>
              </Button>
              <Button asChild>
                <Link href="/onboard">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          {!isLanding &&
            links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          <div className="flex gap-2 pt-2">
            <Button
              variant={!isLender ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => {
                setViewMode("worker");
                setMobileOpen(false);
              }}
            >
              Worker
            </Button>
            <Button
              variant={isLender ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => {
                setViewMode("lender");
                setMobileOpen(false);
              }}
              asChild
            >
              <Link href="/lender">Lender</Link>
            </Button>
          </div>
          {isLanding && (
            <Button className="w-full" asChild>
              <Link href="/onboard" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
