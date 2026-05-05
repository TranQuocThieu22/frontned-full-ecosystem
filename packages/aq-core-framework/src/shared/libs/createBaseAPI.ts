import { AxiosInstance } from "axios";
import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";
import { useAuthenticateStore } from "../stores/useAuthenticateStore";
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
        create: (body: Partial<T>) => {
            const tenantId = useAuthenticateStore.getState().state.tenantId;
            return axiosInstance.post<CustomAPIResponse<T>>(`${baseUrl}/${tenantId}`, body)
        },
        update: (id: string, body: Partial<T>) => {
            const tenantId = useAuthenticateStore.getState().state.tenantId;
            return axiosInstance.put<CustomAPIResponse<T>>(`${baseUrl}/${tenantId}/${id}`, body)
        },
        delete: (id: string) => {
            const tenantId = useAuthenticateStore.getState().state.tenantId;
            return axiosInstance.delete<CustomAPIResponse<T>>(`${baseUrl}/${tenantId}/${id}`)
        },
        getById: (id: string) => {
            const tenantId = useAuthenticateStore.getState().state.tenantId;
            return axiosInstance.get<CustomAPIResponse<T>>(`${baseUrl}/${tenantId}/${id}/get-by-id`)
        },
        getAll: (params?: PagingParams) => {
            const tenantId = useAuthenticateStore.getState().state.tenantId;
            return axiosInstance.get<CustomAPIResponse<T[]>>(`${baseUrl}/${tenantId}`, { params })
        },
    };
}
