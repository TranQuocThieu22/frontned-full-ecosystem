import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";

export interface CustomReactQueryProps<ResponseType> extends UseQueryOptions<ResponseType, Error> {
    serviceFn: () => Promise<AxiosResponse<CustomAPIResponse<ResponseType>>>;
    mockData?: ResponseType;
}

export function useCustomReactQuery<ResponseType>({
    serviceFn,
    queryKey,
    mockData,
    ...options
}: CustomReactQueryProps<ResponseType>) {
    return useQuery<ResponseType, Error>({
        queryKey: queryKey,
        queryFn: async () => {
            if (mockData !== undefined) {
                return mockData;
            }
            const response = await serviceFn();
            if (response.data.status != 200) {
                throw new Error(response.data.message);
            }
            return response.data.results;
        },
        ...options,
    });
}

