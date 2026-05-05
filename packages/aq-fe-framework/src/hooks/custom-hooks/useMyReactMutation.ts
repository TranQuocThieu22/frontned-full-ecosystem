import { type_mutation, typeLabel_mutation } from "@/types/type_mutation";
import { notifications } from "@mantine/notifications";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { MyApiResponse } from "../../shared/lib/createBaseApi";

export interface MyReactMutationProps<IReq = void, IRes = void> {
    isPrototype?: boolean
    axiosFn: (values: IReq) => Promise<AxiosResponse<MyApiResponse<IRes>>>,
    options?: UseMutationOptions<IRes, Error, IReq>,
    mutationType?: type_mutation
    enableDefaultSuccess?: boolean,
    enableDefaultError?: boolean
    successNotification?: string
    autoInvalidate?: boolean
}

function isObject(data: unknown): data is Record<string, unknown> {
    return typeof data === "object" && data !== null && !Array.isArray(data);
}
export function useMyReactMutation<IReq = void, IRes = void>({
    isPrototype,
    axiosFn,
    options,
    mutationType = "create",
    enableDefaultSuccess = true,
    enableDefaultError = true,
    successNotification,
    autoInvalidate = true
}: MyReactMutationProps<IReq, IRes>) {
    const queryClient = useQueryClient()
    return useMutation<IRes, Error, IReq>({
        mutationFn: async (values: IReq) => {
            if (isPrototype) {
                return [] as IRes
            }
            const res = await axiosFn(values);
            if (res.data.isSuccess == 0) throw new Error(JSON.stringify(res.data))
            return res.data.data; // lấy data bên trong response
        },
        ...options,
        onSuccess: (data, variables, context) => {
            if (enableDefaultSuccess) {
                notifications.show({
                    message: successNotification || typeLabel_mutation[mutationType],
                    color: "green",
                });
            }
            if (autoInvalidate) {   // 👈 chỉ invalidate khi cho phép
                queryClient.invalidateQueries();
            }
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            let parsed: MyApiResponse<IRes> | null;
            try {
                parsed = JSON.parse(error.message);
            } catch {
                parsed = null;
            }
            if (enableDefaultError) {
                if (!isObject(parsed?.data)) {
                    notifications.show({
                        message: parsed?.message || "Không thể thao tác, lỗi chưa xác định!",
                        color: "red"
                    });
                }
            }
            options?.onError?.(error, variables, context);
        },
    });
}