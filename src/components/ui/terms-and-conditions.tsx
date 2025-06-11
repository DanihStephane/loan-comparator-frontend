"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface TermsAndConditionsProps {
  onTermsAcceptedChange: (accepted: boolean) => void;
  termsAccepted: boolean;
  error?: string;
  translationPrefix: string;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  onTermsAcceptedChange,
  termsAccepted,
  error,
  translationPrefix,
}) => {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="bg-white rounded-xl space-y-3 p-4 md:p-5">
      <h3 className="text-black font-bold text-lg mb-2">
        {translationPrefix}
      </h3>
      <hr className="border-gray-200 mb-2" />

      {/* Bloc amélioré pour le lien vers les CGV */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-5 rounded-lg border border-primary/20 transition-all hover:shadow-md mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">
                Consultez nos conditions générales de vente
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Veuillez lire nos conditions avant de les accepter
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/cgv`}
            className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Eye className="h-4 w-4 group-hover:animate-pulse" />
            <span>Consulter</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-xs mb-2" data-error="true">
          {error}
        </div>
      )}

      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-5 rounded-lg border border-primary/20 transition-all hover:shadow-md">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="terms1"
            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:animate-pulse"
            checked={termsAccepted}
            onCheckedChange={(checked) => onTermsAcceptedChange(checked === true)}
          />
          <label htmlFor="terms1" className="font-semibold text-sm cursor-pointer">
            J'accepte les conditions générales de vente
          </label>
        </div>
      </div>
    </div>
  );
};
