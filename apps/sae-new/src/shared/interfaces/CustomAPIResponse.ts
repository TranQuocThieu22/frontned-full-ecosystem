export interface CustomAPIResponse<T> {
    status: number;
    message: string;
    results: T;
    paging?: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItemCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        before: string;
        after: string;
    }
}
export interface CustomAPIResponseWithPaging<T> {
    status: number;
    message: string;
    results: DataIncludePagingResponse<T>;
}
export interface DataIncludePagingResponse<T>{
    data:T[];
    paging?: {
        currentPage: number,
        pageSize: number,
        totalPage: number,
        totalItemCount: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        before: string,
        after: string
    }
}

/**
 * Core-UI compatible API response wrapper
 * Core-UI's useCustomReactQuery expects { isSuccess: 1|0, data, message }
 * SAE backend returns { status, results, message }
 */
export interface CustomApiResponse<T> {
    isSuccess: 1 | 0;
    data: T;
    message: string;
}
