"use client"

import { useEffect, useState } from "react";
import { LoanComparisonPage } from "@/features/loan/components/LoanComparisonPage";
import { HomeSkeleton } from "@/components/home/HomeSkeleton";
import { HeaderSkeleton } from "@/components/layout/HeaderSkeleton";
import { FooterSkeleton } from "@/components/layout/FooterSkeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);

  useEffect(() => {
    // Header skeleton: très court (ex: 400ms)
    const headerTimer = setTimeout(() => setHeaderLoading(false), 200);
    // Page skeleton: plus long (ex: 1800ms)
    const timer = setTimeout(() => setLoading(false), 1800);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {headerLoading ? <HeaderSkeleton /> : null}
        <main className="flex-1">
          {/* On affiche tout le skeleton sauf le header si headerLoading est false */}
          <HomeSkeleton hideHeader />
        </main>
        <FooterSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <LoanComparisonPage />
    </div>
  );
}
