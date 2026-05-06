import { mutationLabel, mutationType } from "@aq-fe/core-ui/shared/types/mutationType";
import { notifications } from "@mantine/notifications";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRef } from "react";
import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";

export interface CustomReactMutationProps<IReq = void, IRes = void> {
    isPrototype?: boolean
    axiosFn: (values: IReq) => Promise<AxiosResponse<CustomApiResponse<IRes>>>,
    options?: UseMutationOptions<IRes, Error, IReq>,
    mutationType?: mutationType
    enableDefaultSuccess?: boolean,
    enableDefaultError?: boolean
    successNotification?: string
    autoInvalidate?: boolean
}

function isObject(data: unknown): data is Record<string, unknown> {
    return typeof data === "object" && data !== null && !Array.isArray(data);
}
export function useLegacyReactMutation<IReq = void, IRes = void>({
    isPrototype,
    axiosFn,
    options,
    mutationType = "create",
    enableDefaultSuccess = true,
    enableDefaultError = true,
    successNotification,
    autoInvalidate = true
}: CustomReactMutationProps<IReq, IRes>) {
    const queryClient = useQueryClient()
    const fullResponseRef = useRef<CustomApiResponse<IRes> | null>(null);
    return useMutation<IRes, Error, IReq>({
        mutationFn: async (values: IReq) => {
            if (isPrototype) {
                return [] as IRes
            }
            const res = await axiosFn(values);
            if (res.data.isSuccess == 0) throw new Error(JSON.stringify(res.data))
            fullResponseRef.current = res.data;
            return res.data.data; // lấy data bên trong response
        },
        ...options,
        onSuccess: (data, variables, context) => {
            if (enableDefaultSuccess) {
                if (mutationType == "sync") {
                    notifications.show({
                        message: successNotification || fullResponseRef.current?.message,
                        color: "green",
                    })
                } else {
                    notifications.show({
                        message: successNotification || mutationLabel[mutationType],
                        color: "green",
                    });
                }

            }
            if (autoInvalidate) {   // 👈 chỉ invalidate khi cho phép
                queryClient.invalidateQueries();
            }
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            let parsed: CustomApiResponse<IRes> | null;
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