import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { MyApiResponse } from "../../shared/lib/createBaseApi";

export interface MyReactQueryProps<IRes, IBody, TData = IRes> {
    queryKey?: QueryKey;
    axiosFn?: () => Promise<AxiosResponse<MyApiResponse<IRes>, IBody>>;
    options?: Omit<UseQueryOptions<IRes, Error, TData>, "queryKey">;
    mockData?: IRes;
    isPrototype?: boolean;
}

export function useMyReactQuery<IRes, IBody, TData = IRes>({
    queryKey,
    axiosFn,
    options,
    mockData,
    isPrototype,
}: MyReactQueryProps<IRes, IBody, TData>) {
    const [dataCount, setDataCount] = useState<number>(0);
    const [rawData, setRawData] = useState<MyApiResponse<IRes> | null>(null);

    const queryResult = useQuery<IRes, Error, TData>({
        queryKey: queryKey ?? [],
        queryFn: async () => {
            const useMock = isPrototype ?? process.env.NEXT_PUBLIC_APP_PROTOTYPE === "1";

            if (useMock) {
                if (mockData !== undefined) {
                    const fakeResponse: MyApiResponse<IRes> = {
                        isSuccess: 1,
                        message: "Mock success",
                        data: mockData,
                        dataCount: Array.isArray(mockData) ? mockData.length : 0,
                    };
                    setRawData(fakeResponse);
                    setDataCount(fakeResponse.dataCount || 0);
                    return mockData;
                }
                throw new Error("Prototype mode is on but no mockData provided.");
            }

            if (!axiosFn) {
                throw new Error("axiosFn is required when not in prototype mode.");
            }

            const res = await axiosFn();
            if (res.data.isSuccess === 0) {
                throw new Error(res.data.message || "API returned isSuccess = 0");
            }

            setRawData(res.data); // save full API response
            setDataCount(res.data.dataCount || 0);
            return res.data.data;
        },
        ...options,
    });
    return {
        ...queryResult,
        dataCount,
        rawData, // expose raw API response
    } as UseQueryResult<TData, Error> & { dataCount: number; rawData: MyApiResponse<IRes> | null };
}
