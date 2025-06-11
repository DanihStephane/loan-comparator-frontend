import React from "react";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const HeaderSkeleton = () => (
  <nav className="bg-secondary h-16 flex items-center">
    <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
      {/* Logo */}
      <div className={`h-10 w-32 bg-gray-300 rounded-lg ${shimmer}`} />

      {/* Navigation links */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-4 w-20 bg-gray-400 rounded-full ${shimmer}`}
          />
        ))}
      </div>

      {/* Right side: avatar + button + locale switcher */}
      <div className="hidden md:flex md:items-center md:space-x-4">
        {/* Avatar skeleton */}
        <div className={`h-10 w-10 rounded-full bg-gray-400 ${shimmer}`} />
        {/* Button skeleton */}
        <div className={`h-10 w-28 rounded-[10px] bg-primary/50 ${shimmer}`} />
        {/* Locale switcher skeleton */}
        <div className={`h-6 w-10 rounded bg-gray-300 ${shimmer}`} />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <div className={`h-10 w-10 rounded-full bg-gray-400 ${shimmer}`} />
      </div>
    </div>
  </nav>
);

// Ajoute la keyframes shimmer dans ton CSS global si besoin