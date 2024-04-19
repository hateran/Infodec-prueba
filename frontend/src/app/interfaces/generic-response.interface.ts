export interface IGenericListResponse<T> {
  status: number;
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  data: T[];
}
