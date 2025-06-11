interface SortParams {
  field: string;
  direction: "asc" | "desc";
}
export interface paginationParams {
  page: number;
  limit: number;
  search?: string;
  sort?: SortParams;
  direction?: "asc" | "desc";
  filter?: any;
  filterValue?: any;
  byUser?: boolean;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
