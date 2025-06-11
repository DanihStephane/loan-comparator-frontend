import { createColumnHelper } from "@tanstack/react-table";
import { LoanRate, LoanComparisonResult } from "../types/loanTypes";

const columnHelper = createColumnHelper<LoanRate>();
const comparisonColumnHelper = createColumnHelper<LoanComparisonResult>();

export const getLoanRateColumns = (t: any) => [
  columnHelper.accessor("partner.name", {
    cell: (info) => (
      <div className="font-medium text-gray-900">
        {info.getValue()}
      </div>
    ),
    header: () => t("columns.partner") || "Partenaire",
    enableSorting: true,
  }),
  columnHelper.accessor("amount", {
    cell: (info) => (
      <div className="text-gray-700">
        {new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        }).format(info.getValue())}
      </div>
    ),
    header: () => t("columns.amount") || "Montant",
    enableSorting: true,
  }),
  columnHelper.accessor("duration", {
    cell: (info) => (
      <div className="text-gray-700">
        {info.getValue()} ans
      </div>
    ),
    header: () => t("columns.duration") || "Durée",
    enableSorting: true,
  }),
  columnHelper.accessor("rate", {
    cell: (info) => (
      <div className="font-semibold text-blue-600">
        {info.getValue().toFixed(2)}%
      </div>
    ),
    header: () => t("columns.rate") || "Taux",
    enableSorting: true,
  }),
];

export const getLoanComparisonColumns = (t: any) => [
  comparisonColumnHelper.accessor("partner", {
    cell: (info) => (
      <div className="font-medium text-gray-900">
        {info.getValue()}
      </div>
    ),
    header: () => t("columns.partner") || "Partenaire",
  }),
  comparisonColumnHelper.accessor("rate", {
    cell: (info) => (
      <div className="font-semibold text-blue-600">
        {info.getValue().toFixed(2)}%
      </div>
    ),
    header: () => t("columns.rate") || "Taux",
  }),
  comparisonColumnHelper.accessor("monthlyPayment", {
    cell: (info) => (
      <div className="text-green-600 font-medium">
        {new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        }).format(info.getValue())}
      </div>
    ),
    header: () => t("columns.monthlyPayment") || "Mensualité",
  }),
  comparisonColumnHelper.accessor("totalCost", {
    cell: (info) => (
      <div className="text-gray-700">
        {new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        }).format(info.getValue())}
      </div>
    ),
    header: () => t("columns.totalCost") || "Coût total",
  }),
];