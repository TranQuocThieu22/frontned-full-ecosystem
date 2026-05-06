export interface CustomAPIResponse<T> {
    status?: number;
    message?: string;
    results: T;
    paging?: Paging
}


export interface Paging {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItemCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    before: string;
    after: string;
}
