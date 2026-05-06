import { SyncBatchLogStatusEnum } from '@aq-fe/aq-legacy-framework/shared/const/enum/syncBatchLogStatusEnum';
import { SyncLogStepEnum } from '@aq-fe/aq-legacy-framework/shared/const/enum/syncLogStepEnum';
import { CustomApiResponse } from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';
import { Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from '@mantine/notifications';
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { AQDataSynchronizationService } from '@aq-fe/aq-legacy-framework/shared/APIs/AQDataSynchronizationService';
import { messageIncludesType, removeSyncMessagePrefix, SyncMessageEnum } from '@aq-fe/aq-legacy-framework/shared/const/enum/syncMessageEnum';
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation";
import { useCustomReactQuery } from '@aq-fe/aq-legacy-framework/shared/hooks/useCustomReactQuery';
import { SyncBatchLog } from '@aq-fe/aq-legacy-framework/shared/interfaces/SyncBatchLog';
import { SafeOmitType } from '@aq-fe/core-ui/shared/types/safeOmitType';
import { CustomButton, CustomButtonProps } from "../button/CustomButton/CustomButton";
import { CustomButtonModal, CustomButtonModalProps } from "../button/CustomButtonModal/CustomButtonModal";
import CustomSyncDataTable from '@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomSyncDataTable';
import CustomSyncStepper from '@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomSyncStepper';


export interface CustomButtonModalProcessSyncProps extends SafeOmitType<CustomButtonModalProps, "disclosure"> {
    axiosFn: () => Promise<AxiosResponse<CustomApiResponse<SyncBatchLog>>>
    submitButtonProps?: CustomButtonProps
    invalidateQueryKey?: QueryKey | QueryKey[]
}

const POLL_INTERVAL_MS = 3000;

export default function CustomButtonModalProcessSync({
    axiosFn,
    submitButtonProps,
    invalidateQueryKey,
    ...rest
}: CustomButtonModalProcessSyncProps) {
    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const steps = [
        SyncLogStepEnum.GetDataEduSoft,
        SyncLogStepEnum.VerifyEdusoftData,
        SyncLogStepEnum.VerifyNecsessaryData,
        SyncLogStepEnum.SyncData,
    ];

    const [syncId, setSyncId] = useState<number>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // 1. START SYNC (mutation)
    const startSyncMutation = useLegacyReactMutation<void, SyncBatchLog>({
        axiosFn,
        enableDefaultSuccess: false,
        enableDefaultError: false,
        options: {
            onSuccess: (data) => {
                setErrorMessage(undefined);
                setSyncId(data.id);
            },
            onError: () => {
                let errorMessage = "Quá trình tiến hành đồng bộ thất bại.";

                setErrorMessage(errorMessage);
                notifications.show({ message: errorMessage, color: "red" });
            },
        },
    });

    // 2. POLLING BY syncId
    const syncStatusQuery = useCustomReactQuery<SyncBatchLog | null>({
        queryKey: ["sync-status", syncId],
        axiosFn: () => AQDataSynchronizationService.GetInfoById(syncId),
        options: {
            enabled: !!syncId,
            refetchInterval: (data) => {
                if (!data) return false;
                if (
                    data.state.data?.status === SyncBatchLogStatusEnum.Succeeded ||
                    data.state.data?.status === SyncBatchLogStatusEnum.Failed
                ) {
                    return false;
                }
                return POLL_INTERVAL_MS;
            },
            retry: false,
            refetchOnWindowFocus: false,
        },
    });

    // 3. HANDLE FINAL STATUS
    useEffect(() => {
        const data = syncStatusQuery.data;
        if (!data) return;

        if (data.status === SyncBatchLogStatusEnum.Pending) {
            notifications.show({
                message: "Đồng bộ đang được xếp vào hàng chờ",
                color: "blue",
            });
        }

        if (data.status === SyncBatchLogStatusEnum.Succeeded) {
            notifications.show({
                message: "Đồng bộ dữ liệu thành công",
                color: "green",
            });
        }

        if (data.status === SyncBatchLogStatusEnum.Failed) {
            let rawMessage = data.message ?? "";

            const isWarning = messageIncludesType(data.message ?? "", SyncMessageEnum.BusinessError)
            if (!isWarning) {
                const fallbackMessage = "Đồng bộ dữ liệu thất bại";
                setErrorMessage(fallbackMessage);
                notifications.show({ message: fallbackMessage, color: "red" });
                return;
            }

            rawMessage = removeSyncMessagePrefix(rawMessage)
            const splitMessages = rawMessage.split("\n").filter(Boolean);

            // Notification từng dòng (GIỮ behavior cũ)
            splitMessages.forEach(msg => {
                notifications.show({ message: msg, color: "red" });
            });

            const numberedMessages = splitMessages.map((msg, index) => {
                const cleanMsg = removeSyncMessagePrefix(msg);
                return `${index + 1}. ${cleanMsg}`;
            });

            // Set state 1 lần để hiển thị trong UI
            setErrorMessage(numberedMessages.join("\n"));
        }
    }, [syncStatusQuery.data]);

    const isProcessing = useMemo(() => {
        const data = syncStatusQuery.data;

        if (startSyncMutation.isPending) return true;
        if (syncId && !data) return true;
        if (data?.status === SyncBatchLogStatusEnum.Pending) return true;
        if (data?.status === SyncBatchLogStatusEnum.Processing) return true;

        return false;
    }, [startSyncMutation.isPending, syncStatusQuery.data, syncId]);

    // Invalidate queries after success (custom key if provided, otherwise all)
    useEffect(() => {
        if (syncStatusQuery.data?.status !== SyncBatchLogStatusEnum.Succeeded) return;

        if (!invalidateQueryKey) {
            queryClient.invalidateQueries();
            return;
        }

        const keys = Array.isArray((invalidateQueryKey as any)[0])
            ? invalidateQueryKey as QueryKey[]
            : [invalidateQueryKey as QueryKey];

        keys.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
    }, [syncStatusQuery.data?.status]);

    // 5. UI
    return (
        <CustomButtonModal
            disclosure={disc}
            {...rest}
            modalProps={{
                title: "Xác nhận đồng bộ",
                size: syncStatusQuery.data?.status === SyncBatchLogStatusEnum.Succeeded ? "60%" : "lg",

                ...rest.modalProps
            }}
            buttonProps={{
                actionType: "sync",
                loading: isProcessing || syncStatusQuery.isFetching,
                ...rest.buttonProps,
            }}
        >
            <Stack>
                <Group py={20} gap={30} align="flex-start">
                    {syncStatusQuery.data?.status === SyncBatchLogStatusEnum.Succeeded && (
                        <CustomSyncDataTable
                            flex={1}
                            customInfoRows={[
                                { label: "Dữ liệu đọc từ Edusoft", value: syncStatusQuery.data.tempCount },
                                { label: "Tạo mới", value: syncStatusQuery.data.createCount },
                                { label: "Cập nhật", value: syncStatusQuery.data.updateCount },
                                { label: "Đồng bộ", value: syncStatusQuery.data.syncCount },
                                { label: "Trước đồng bộ", value: syncStatusQuery.data.existingCount },
                                { label: "Sau đồng bộ", value: syncStatusQuery.data.finalCount },
                                {
                                    label: "Thông báo",
                                    value: messageIncludesType(syncStatusQuery.data.message ?? "", SyncMessageEnum.Info)
                                        ? removeSyncMessagePrefix(syncStatusQuery.data.message)
                                        : undefined
                                },
                            ]}
                        />
                    )}

                    <CustomSyncStepper
                        steps={steps}
                        syncData={syncStatusQuery.data}
                    />
                </Group>

                {errorMessage && <Text c="red" style={{ whiteSpace: 'pre-line' }}>{errorMessage}</Text>}

                <CustomButton
                    actionType="sync"
                    loading={isProcessing || syncStatusQuery.isFetching}
                    disabled={isProcessing}
                    onClick={() => {
                        setSyncId(undefined);
                        setErrorMessage(undefined);
                        startSyncMutation.mutate();
                    }}
                    {...submitButtonProps}
                >
                    Bắt đầu đồng bộ
                </CustomButton>
            </Stack>
        </CustomButtonModal>
    );
}