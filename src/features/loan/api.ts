import apiClient from "@/shared/utils/apiClient";
import { API_ENDPOINTS } from "@/shared/constants/apiEndpoints";
import { GetLoanRatesParams, LoanComparisonRequest } from "./types/loanTypes";

export const loanApi = {
  getLoanRates: async (params: GetLoanRatesParams) => {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      itemsPerPage: params.itemsPerPage.toString(),
      amount: params.amount.toString(),
      duration: params.duration.toString(),
    });

    return apiClient.get(`${API_ENDPOINTS.LOANS.RATES}?${queryParams}`);
  },

  compareLoan: async (data: LoanComparisonRequest) => {
    return apiClient.post(API_ENDPOINTS.LOANS.COMPARE, data);
  },
};