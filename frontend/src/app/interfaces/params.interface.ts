export interface IParams<T> {
  page: number;
  limit: number;
  order: "ASC" | "DESC";
  orderBy: keyof T;
}
