"use client";

import { LocaleSwitcher } from "@/shared/components/LocaleSwitcher";
import { Sparkles, TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-4">
          {/* Main Title */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Meilleur Taux
            </h1>
            <div className="hidden md:block">
              <div className="flex flex-col">
                <span className="text-xs text-purple-300 font-medium">
                  Votre partenaire financier
                </span>
                <span className="text-xs text-gray-400">
                  Excellence & Innovation
                </span>
              </div>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                Premium Service
              </span>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
    </nav>
  );
}
