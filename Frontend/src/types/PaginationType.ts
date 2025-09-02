import { AnyObject } from "./AnyObject";


export interface PaginationType {
  data: AnyObject[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  sortColumn: string;
  sortOrder: string;
  filterColumn: string;
  filterQuery: string;
}


