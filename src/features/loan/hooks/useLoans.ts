import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { loanService } from "../services/loanService";
import { LoanRate, LoanComparisonResult, PaginationData } from "../types/loanTypes";

export function useLoans() {
  const [loanRates, setLoanRates] = useState<LoanRate[]>([]);
  const [comparisonResults, setComparisonResults] = useState<LoanComparisonResult[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [amount, setAmount] = useState(50000);
  const [duration, setDuration] = useState(20);
  
  const [paginationData, setPaginationData] = useState<PaginationData>({
    total: 0,
    page: 1,
    itemsPerPage: 10,
    totalPages: 0,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["loanRates", page, itemsPerPage, amount, duration],
    queryFn: () =>
      loanService.getLoanRates({
        page,
        itemsPerPage,
        amount,
        duration,
      }),
  });

  useEffect(() => {
    if (data) {
      setLoanRates(data["hydra:member"]);
      const totalPages = Math.ceil(data["hydra:totalItems"] / itemsPerPage);
      setPaginationData({
        total: data["hydra:totalItems"],
        page,
        itemsPerPage,
        totalPages,
      });
    }
  }, [data, page, itemsPerPage]);

  const compareLoanMutation = useMutation({
    mutationFn: loanService.compareLoan,
    onSuccess: (data) => {
      setComparisonResults(data.results);
    },
  });

  const updateFilters = (newAmount: number, newDuration: number) => {
    setAmount(newAmount);
    setDuration(newDuration);
    setPage(1);
  };

  return {
    loanRates,
    comparisonResults,
    isLoading,
    isError,
    error,
    pagination: paginationData,
    page,
    itemsPerPage,
    amount,
    duration,
    setPage,
    setItemsPerPage,
    updateFilters,
    refetch,
    compareLoan: compareLoanMutation.mutate,
    isComparing: compareLoanMutation.isPending,
    comparisonError: compareLoanMutation.error,
  };
}