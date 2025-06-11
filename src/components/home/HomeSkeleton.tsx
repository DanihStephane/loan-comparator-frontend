import React from "react";
import { HeaderSkeleton } from "@/components/layout/HeaderSkeleton";
import { FooterSkeleton } from "@/components/layout/FooterSkeleton";

// Utilitaire shimmer
const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const HomeSkeleton = ({ hideHeader = false }: { hideHeader?: boolean }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    {!hideHeader && <HeaderSkeleton />}
    
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section Skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-12 w-3/4 max-w-4xl mx-auto rounded-lg bg-gray-200 ${shimmer}`} />
        <div className="max-w-2xl mx-auto space-y-2">
          <div className={`h-6 w-full rounded bg-gray-300 ${shimmer}`} />
          <div className={`h-6 w-3/4 mx-auto rounded bg-gray-300 ${shimmer}`} />
        </div>
      </div>

      {/* Search/Filters Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
        <div className={`h-6 w-48 rounded bg-gray-200 ${shimmer}`} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 w-20 rounded bg-gray-200 ${shimmer}`} />
              <div className={`h-10 w-full rounded-lg bg-gray-100 border ${shimmer}`} />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className={`h-10 w-32 rounded-lg bg-primary/40 ${shimmer}`} />
        </div>
      </div>

      {/* Main Content Card Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-5 h-5 rounded bg-primary/40 ${shimmer}`} />
            <div className={`h-6 w-48 rounded bg-gray-200 ${shimmer}`} />
          </div>
        </div>
        <div className="p-6">
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 pb-4 border-b">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-4 w-24 rounded bg-gray-200 ${shimmer}`} />
            ))}
          </div>
          
          {/* Table Rows Skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-4 py-3 border-b border-gray-100">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className={`h-5 w-full rounded bg-gray-100 ${shimmer}`} />
                ))}
              </div>
            ))}
          </div>
          
          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className={`h-4 w-32 rounded bg-gray-200 ${shimmer}`} />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded bg-gray-200 ${shimmer}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Form Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded bg-primary/40 ${shimmer}`} />
          <div className={`h-6 w-56 rounded bg-gray-200 ${shimmer}`} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-4 w-32 rounded bg-gray-200 ${shimmer}`} />
                <div className={`h-10 w-full rounded-lg bg-gray-100 border ${shimmer}`} />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-4 w-32 rounded bg-gray-200 ${shimmer}`} />
                <div className={`h-10 w-full rounded-lg bg-gray-100 border ${shimmer}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className={`h-12 w-48 rounded-lg bg-primary/40 ${shimmer}`} />
        </div>
      </div>

      {/* Results Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded bg-primary/40 ${shimmer}`} />
            <div className={`h-6 w-64 rounded bg-gray-200 ${shimmer}`} />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`h-6 w-32 rounded bg-gray-200 ${shimmer}`} />
                  <div className={`h-5 w-16 rounded-full bg-green-200 ${shimmer}`} />
                </div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex justify-between items-center">
                      <div className={`h-4 w-24 rounded bg-gray-200 ${shimmer}`} />
                      <div className={`h-4 w-16 rounded bg-gray-100 ${shimmer}`} />
                    </div>
                  ))}
                </div>
                <div className={`h-10 w-full rounded-lg bg-primary/30 ${shimmer}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
            <div className={`w-12 h-12 rounded-lg bg-primary/30 ${shimmer}`} />
            <div className={`h-5 w-32 rounded bg-gray-200 ${shimmer}`} />
            <div className="space-y-2">
              <div className={`h-3 w-full rounded bg-gray-100 ${shimmer}`} />
              <div className={`h-3 w-3/4 rounded bg-gray-100 ${shimmer}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <FooterSkeleton />
  </div>
);
