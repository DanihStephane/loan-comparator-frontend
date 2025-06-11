"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { getLoanComparisonColumns } from "../config/tableColumns";
import { LoanComparisonResult } from "../types/loanTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface LoanComparisonTableProps {
  results: LoanComparisonResult[];
  request: {
    amount: number;
    duration: number;
  };
}

export function LoanComparisonTable({ results, request }: LoanComparisonTableProps) {
  const t = useTranslations("loan.comparison");
  const columns = useMemo(() => getLoanComparisonColumns(t), [t]);

  const table = useReactTable<LoanComparisonResult>({
    data: results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {t("title") || "Résultats de la comparaison"}
        </CardTitle>
        <div className="text-sm text-gray-600">
          {t("requestSummary", { 
            amount: new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            }).format(request.amount),
            duration: request.duration
          }) || 
          `Montant: ${new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
          }).format(request.amount)} - Durée: ${request.duration} ans`}
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row, index) => (
                <TableRow 
                  key={row.id}
                  className={index === 0 ? "bg-green-50 border-green-200" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {results.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>{t("bestOffer") || "Meilleure offre:"}</strong> {results[0].partner} 
              avec un taux de {results[0].rate.toFixed(2)}% et une mensualité de{" "}
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              }).format(results[0].monthlyPayment)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}