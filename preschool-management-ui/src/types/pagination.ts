export interface PaginationRequest {
    pageNumber: number;
    pageSize: number;
    filter?: boolean;
    searchText?: string;
}

export interface PaginatedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
}