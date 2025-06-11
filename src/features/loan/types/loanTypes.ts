export interface LoanRate {
  id: string;
  amount: number;
  duration: number;
  rate: number;
  partner: {
    id: string;
    name: string;
  };
}

export interface LoanRatesResponse {
  "hydra:member": LoanRate[];
  "hydra:totalItems": number;
  "hydra:view": {
    "hydra:first": string;
    "hydra:last": string;
    "hydra:previous": string | null;
    "hydra:next": string | null;
  };
}

export interface LoanComparisonRequest {
  amount: number;
  duration: number;
  name: string;
  email: string;
  phone: string;
}

export interface LoanComparisonResult {
  partner: string;
  rate: number;
  monthlyPayment: number;
  totalCost: number;
}

export interface LoanComparisonResponse {
  request: {
    amount: number;
    duration: number;
  };
  results: LoanComparisonResult[];
}

export interface GetLoanRatesParams {
  page: number;
  itemsPerPage: number;
  amount: number;
  duration: number;
}

export interface PaginationData {
  total: number;
  page: number;
  itemsPerPage: number;
  totalPages: number;
}