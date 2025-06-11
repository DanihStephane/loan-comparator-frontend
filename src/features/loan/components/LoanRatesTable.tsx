"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { getLoanRateColumns } from "../config/tableColumns";
import { LoanRate } from "../types/loanTypes";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";

interface LoanRatesTableProps {
  loanRates: LoanRate[];
  isLoading: boolean;
  pagination: {
    total: number;
    page: number;
    itemsPerPage: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function LoanRatesTable({
  loanRates,
  isLoading,
  pagination,
  onPageChange,
  onItemsPerPageChange,
}: LoanRatesTableProps) {
  const t = useTranslations("loan.table");
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo(() => getLoanRateColumns(t), [t]);

  const table = useReactTable<LoanRate>({
    data: loanRates || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-500">{t("loading") || "Chargement..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="flex flex-col">
                          {header.column.getIsSorted() === "asc" && "🔼"}
                          {header.column.getIsSorted() === "desc" && "🔽"}
                          {!header.column.getIsSorted() && "⇅"}
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center py-6">
                    <p className="text-lg font-semibold text-gray-700">
                      {t("noData.title") || "Aucun taux disponible"}
                    </p>
                    <p className="mt-2 text-gray-500">
                      {t("noData.description") || "Modifiez vos critères de recherche."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {t("pagination.total", { total: pagination?.total || 0 }) || 
             `Total: ${pagination?.total || 0}`}
          </span>
          <select
            value={pagination.itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} {t("pagination.perPage") || "par page"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={pagination.page === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: pagination?.totalPages || 1 }).map((_, index) => (
            <Button
              key={index + 1}
              variant={pagination.page === index + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= (pagination?.totalPages || 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
