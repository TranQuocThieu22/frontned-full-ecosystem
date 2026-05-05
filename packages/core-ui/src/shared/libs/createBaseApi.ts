import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { AxiosInstance } from "axios";

export interface PagingParams {
    pageNumber?: number;
    pageSize?: number;
}
export type BaseApiType<T> = ReturnType<typeof createBaseApi<T>>;
export interface CustomApiResponse<IRes> {
    isSuccess: 1 | 0;
    message: string;
    data: IRes;
    dataCount?: number
}

export function createBaseApi<T>(baseUrl: string, axiosInstance: AxiosInstance) {
    return {
        get: ({
            params = "",
            id,
            paging
        }: {
            params?: string,
            id?: number,
            paging?: PagingParams
        } = {}) => {
            return axiosInstance.get<CustomApiResponse<T>>(`${baseUrl}/get` + params, { params: { ...paging, id } });
        },
        getAll: ({
            params = "",
            cols,
            paging
        }: {
            params?: string,
            paging?: PagingParams
            cols?: string[]
        } = {}) => {
            return axiosInstance.get<CustomApiResponse<T[]>>(`${baseUrl}/GetAll` + params, {
                params: {
                    cols: cols?.join(","),
                    ...paging
                }
            });
        },
        create: (data: Partial<T>) => {
            return axiosInstance.post<CustomApiResponse<T>>(`${baseUrl}/create`, {
                ...data,
                // 18/07/2025 cái nào lỗi không thêm được thì nhờ backend sửa
                // id: 0,
                // concurrencyStamp: "string",
                // isEnabled: true
            });
        },
        update: (data: Partial<T>) => {
            return axiosInstance.post<CustomApiResponse<T>>(`${baseUrl}/update`, data);
        },
        updateList: (data: Partial<T[]>) => {
            return axiosInstance.post<CustomApiResponse<T[]>>(`${baseUrl}/updateList`, data);
        },
        createOrUpdateList: (data: Partial<T[]>) => {
            return axiosInstance.post<CustomApiResponse<T[]>>(`${baseUrl}/createOrUpdateList`, data);
        },
        createList: (data: Partial<T[]>) => {
            return axiosInstance.post<CustomApiResponse<T[]>>(`${baseUrl}/createList`, data);
        },
        delete: (id: number) => {
            return axiosInstance.post(`${baseUrl}/delete`, { id: id });
        },
        //Theme delete list
        deleteList: (values: BaseEntity[]) => {
            return axiosInstance.post(`${baseUrl}/deleteList`, values.map(item => ({
                id: item.id,
                isEnabled: false
            })));
        },
        deleteListIds: (ids: number[]) => {
            return axiosInstance.post(`${baseUrl}/deleteList`, ids.map(id => ({
                id: id,
                isEnabled: false
            })));
        },
    };
}
