import { notifications } from "@mantine/notifications";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";
import { mutationLabel, mutationType } from "@aq-fe/core-ui/shared/types/mutationType";
export interface CustomReactMutationProps<ResponseModel = void, RequestType = void> extends UseMutationOptions<ResponseModel, Error, RequestType> {
    serviceFn: (values: RequestType) => Promise<AxiosResponse<CustomAPIResponse<ResponseModel>>>;
    successNotification?: string
    mutationType: mutationType
}
interface CustomErrorResponse {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    errors: Record<string, string[]>;
}
export function useCustomReactMutation<ResponseModel = void, RequestType = void>({
    serviceFn,
    successNotification,
    mutationType,
    ...options
}: CustomReactMutationProps<ResponseModel, RequestType>) {
    const queryClient = useQueryClient()
    return useMutation<ResponseModel, AxiosError<CustomErrorResponse>, RequestType>({
        mutationFn: async (values: RequestType) => {
            const response = await serviceFn(values);
            return response.data?.results;
        },
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries()
            notifications.show({
                message: successNotification || mutationLabel[mutationType!],
                color: "green",
            })
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            notifications.show({
                message: Object.values(error.response?.data.errors || {}).join(", ") || "Có lỗi xảy ra!",
                color: "red",
            })
            if (options?.onError) {
                options.onError(error, variables, context);
            }
        },
    })
}

