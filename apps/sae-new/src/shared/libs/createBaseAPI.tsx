import { AxiosInstance } from "axios";
import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";

/** Tham số phân trang kiểu REST (PageNumber, PageSize) */
export interface PagingParams {
    PageNumber?: number;
    PageSize?: number;
}

export type BaseApiType<T> = ReturnType<typeof createBaseAPI<T>>;

export function createBaseAPI<T>(
    baseUrl: string,
    axiosInstance: AxiosInstance
) {
    return {
        create: ({ tenantId, body }: { tenantId: string, body: Partial<T> }) =>
            axiosInstance.post<CustomAPIResponse<T>>(`${baseUrl}/${tenantId}`, body),

        update: (id: string, body: Partial<T>) =>
            axiosInstance.put<CustomAPIResponse<T>>(`${baseUrl}/${id}/update`, body),

        delete: (id: string) =>
            axiosInstance.delete<CustomAPIResponse<T>>(`${baseUrl}/${id}/delete`),

        getById: (id: string) =>
            axiosInstance.get<CustomAPIResponse<T>>(`${baseUrl}/${id}/get-by-id`),

        getAll: (params?: PagingParams) =>
            axiosInstance.get<CustomAPIResponse<T[]>>(`${baseUrl}/get-all`, { params }),
    };
}
