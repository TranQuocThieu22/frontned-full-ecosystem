import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { CustomAPIResponse, Paging } from "../interfaces/CustomAPIResponse";

export interface CustomReactQueryProps<ResponseType extends object> extends UseQueryOptions<ResponseType, Error> {
    serviceFn: () => Promise<AxiosResponse<CustomAPIResponse<ResponseType>>>;
    mockData?: ResponseType;
}

export function useCustomReactQuery<ResponseType extends object>({
    serviceFn,
    queryKey,
    mockData,
    ...options
}: CustomReactQueryProps<ResponseType>) {
    const pagingState = useState<Paging | undefined>(undefined);
    const query = useQuery<ResponseType, Error>({
        queryKey: queryKey,
        queryFn: async () => {
            if (mockData !== undefined) {
                return mockData;
            }
            const response = await serviceFn();
            pagingState[1](response.data.paging)
            return response.data.results
        },
        ...options,
    });
    return { ...query, paging: pagingState[0] }
}
