import { loanApi } from "../api";
import { GetLoanRatesParams, LoanComparisonRequest } from "../types/loanTypes";

export const loanService = {
  getLoanRates: async (params: GetLoanRatesParams) => {
    const { data } = await loanApi.getLoanRates(params);
    return data;
  },

  compareLoan: async (data: LoanComparisonRequest) => {
    try {
      const response = await loanApi.compareLoan(data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};