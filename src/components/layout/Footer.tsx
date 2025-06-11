"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Heart, Code, Sparkles } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const params = useParams();
  const locale = params.locale;

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Decorative line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-6"></div>
        
        <div className="flex flex-col items-center space-y-4">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meilleur Taux
            </span>
            <Sparkles className="h-6 w-6 text-purple-400" />
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-300 text-center max-w-md">
            Votre partenaire de confiance pour les meilleurs taux et services financiers
          </p>

          {/* Copyright */}
          <div className="flex flex-col items-center space-y-2 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span>© {new Date().getFullYear()}</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>Créé par</span>
              <span className="font-semibold text-purple-300">
                Danih Stephane Rakotoarison Harilanto
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4 text-blue-400" />
              <span>Développé avec passion et innovation</span>
            </div>
          </div>

          {/* Modern touch */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Innovation
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Excellence
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Confiance
            </span>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mt-6"></div>
      </div>
    </footer>
  );
}
