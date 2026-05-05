import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";
export interface CustomReactMutationProps<ResponseModel = void, RequestType = void> extends UseMutationOptions<ResponseModel, Error, RequestType> {
    serviceFn: (values: RequestType) => Promise<AxiosResponse<CustomAPIResponse<ResponseModel>>>;
}

export function useCustomReactMutation<ResponseModel = void, RequestType = void>({
    serviceFn,
    ...options
}: CustomReactMutationProps<ResponseModel, RequestType>) {
    return useMutation<ResponseModel, Error, RequestType>({
        mutationFn: async (values: RequestType) => {
            const response = await serviceFn(values);
            if (response.data?.status != 200) {
                throw new Error(response.data?.message);
            }
            return response.data?.results;
        },
        ...options,
        onSuccess: (data, variables, context) => {
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            if (options?.onError) {
                options.onError(error, variables, context);
            }
        },
    })
}

