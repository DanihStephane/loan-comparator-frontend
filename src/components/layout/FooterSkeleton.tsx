import React from "react";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const FooterSkeleton = () => (
  <footer className="bg-black text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + agences */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className={`h-10 w-32 bg-gray-700 rounded-lg ${shimmer}`} />
          <div className={`h-5 w-24 bg-gray-800 rounded ${shimmer}`} />
          <div className={`h-4 w-32 bg-gray-700 rounded ${shimmer}`} />
          <div className={`h-8 w-24 bg-gray-700 rounded-lg mt-4 ${shimmer}`} />
        </div>
        {/* Support */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className={`h-6 w-32 bg-gray-700 rounded ${shimmer}`} />
          <div className={`h-4 w-24 bg-gray-800 rounded ${shimmer}`} />
          <div className={`h-4 w-32 bg-gray-700 rounded ${shimmer}`} />
        </div>
        {/* Useful links */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className={`h-6 w-32 bg-gray-700 rounded ${shimmer}`} />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-4 w-24 bg-gray-800 rounded ${shimmer}`}
            />
          ))}
        </div>
        {/* Socials */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className={`h-6 w-32 bg-gray-700 rounded ${shimmer}`} />
          <div className="flex gap-4 mb-6">
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className={`h-10 w-10 rounded-full bg-gray-800 ${shimmer}`}
              />
            ))}
          </div>
          <div className={`h-4 w-32 bg-gray-700 rounded ${shimmer}`} />
        </div>
      </div>

      <div className="my-8 h-1 bg-white/20 rounded" />

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-center md:text-left">
        <div className={`h-4 w-40 bg-gray-700 rounded ${shimmer}`} />
        <div className="flex gap-6">
          <div className={`h-4 w-24 bg-gray-700 rounded ${shimmer}`} />
          <div className={`h-4 w-24 bg-gray-700 rounded ${shimmer}`} />
        </div>
      </div>
    </div>
  </footer>
);

// Ajoute la keyframes shimmer dans ton CSS global si besoin