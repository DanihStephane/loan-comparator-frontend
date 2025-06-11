"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { LoanFilters } from "./LoanFilters";
import { LoanRatesTable } from "./LoanRatesTable";
import { LoanComparisonForm } from "./form/LoanComparisonForm";
import { LoanComparisonTable } from "./LoanComparisonTable";
import { useLoans } from "../hooks/useLoans";
import { LoanComparisonRequest, LoanComparisonResult } from "../types/loanTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp } from "lucide-react";

export function LoanComparisonPage() {
  const t = useTranslations("loan");
  const [comparisonResults, setComparisonResults] = useState<{
    request: { amount: number; duration: number };
    results: LoanComparisonResult[];
  } | null>(null);

  const {
    loanRates,
    isLoading,
    pagination,
    amount,
    duration,
    setPage,
    setItemsPerPage,
    updateFilters,
    compareLoan,
    isComparing,
  } = useLoans();

  const handleFiltersChange = (newAmount: number, newDuration: number) => {
    updateFilters(newAmount, newDuration);
  };

  const handleComparisonSubmit = (data: LoanComparisonRequest) => {
    compareLoan(data, {
      onSuccess: (response) => {
        setComparisonResults(response);
        toast.success(t("comparison.success") || "Comparaison effectuée avec succès");
      },
      onError: (error: any) => {
        toast.error(t("comparison.error") || "Erreur lors de la comparaison");
        console.error("Comparison error:", error);
      },
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          {t("title") || "Comparateur de Crédits de Consommation"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("subtitle") || 
           "Comparez les meilleurs taux de crédit et trouvez l'offre qui vous convient le mieux"}
        </p>
      </div>

      {/* Filtres */}
      <LoanFilters
        amount={amount}
        duration={duration}
        onFiltersChange={handleFiltersChange}
      />

      {/* Tableau des taux */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("rates.title") || "Taux Disponibles"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoanRatesTable
            loanRates={loanRates}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={setPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </CardContent>
      </Card>

      {/* Formulaire de comparaison */}
      <LoanComparisonForm
        onSubmit={handleComparisonSubmit}
        isLoading={isComparing}
      />

      {/* Résultats de la comparaison */}
      {comparisonResults && (
        <LoanComparisonTable
          results={comparisonResults.results}
          request={comparisonResults.request}
        />
      )}
    </div>
  );
}
