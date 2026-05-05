import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import CustomButtonModalSync from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { SyncBatchHistory, syncBatchHistoryTableTypeApi, syncBatchHistoryTableTypeEnum, syncBatchHistoryTableTypeLabel } from "@aq-fe/core-ui/shared/interfaces/SyncBatchHistory";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";


const allowedTableTypes: syncBatchHistoryTableTypeEnum[] = [
    syncBatchHistoryTableTypeEnum.EduDegreeLevelTemp,
    syncBatchHistoryTableTypeEnum.EducationLevelTemp,
    syncBatchHistoryTableTypeEnum.EducationSystemTemp,
    syncBatchHistoryTableTypeEnum.EduRegulationTemp,
    syncBatchHistoryTableTypeEnum.EduMajorTemp,
    syncBatchHistoryTableTypeEnum.EduFieldOfStudyTemp,
    syncBatchHistoryTableTypeEnum.EduSubjectTemp,
    syncBatchHistoryTableTypeEnum.EduClassTemp,
    syncBatchHistoryTableTypeEnum.EduUnitTemp,
    syncBatchHistoryTableTypeEnum.EduLecturerTemp,
    syncBatchHistoryTableTypeEnum.EduStudentFullTemp,
];

export default function PlatformDataSynchronizationTable() {
    const disc = useDisclosure()
    const [step, setStep] = useState<number>(0);
    const query = useCustomReactQuery({
        queryKey: ['AQDataSynchronizationService'],
        axiosFn: () => AQDataSynchronizationService.getSyncBatchLogHistory(),
        options: {
            select: (res) => {
                const result: SyncBatchHistory[] = allowedTableTypes.map(type => {
                    const found = res.find((item: any) => item.tableType === type);

                    return found ?? {
                        id: type, // hoặc -1
                        tableType: type,
                        createCount: undefined,
                        updateCount: undefined,
                        createdAt: undefined,
                        isMissing: true
                    };
                });

                return result;
            }
        }
    })
    const columns = useMemo<CustomColumnDef<SyncBatchHistory>[]>(() => [
        {
            header: "Dữ liệu",
            accessorKey: "label",
            accessorFn: (row) => syncBatchHistoryTableTypeLabel[row.tableType!]
        },
        {
            header: "Thêm mới",
            accessorKey: "createCount"
        },
        {
            header: "Cập nhật",
            accessorKey: "updateCount"
        },
        {
            header: "Ngày đồng bộ",
            accessorKey: "createdAt",
            accessorFn: (row) => row.isMissing ? "Chưa đồng bộ" : dateUtils.toDDMMYYYY(row.createdAt),
        },
    ], [])
    const syncAllMutation = useMutation({
        mutationFn: async () => {
            // Chạy từng API theo thứ tự
            const entries = Object.entries(syncBatchHistoryTableTypeApi);

            // Chạy theo đúng thứ tự key đã defined trong record
            for (const [type, apiFn] of entries) {
                if (!apiFn) continue; // bỏ qua undefined

                setStep((prev) => prev + 1);

                const res = await apiFn();
                const enumKey = Number(type) as syncBatchHistoryTableTypeEnum;
                const label = syncBatchHistoryTableTypeLabel[enumKey];

                if (res.data.isSuccess == 0) {
                    notifications.show({
                        message: "Đồng bộ thất bại: " + (label ?? "Không xác định"),
                        color: "red"
                    });
                    throw new Error(res.data.message);
                }
            }

            return { data: { message: "Đồng bộ tất cả thành công" } }
        },
        onSuccess: () => {
            notifications.show({
                message: "Đồng bộ tất cả thành công"
            })
        },
        onSettled: () => {
            setStep(0)
        }

    });

    return (
        <CustomFieldset title="Danh sách dữ liệu nền tảng">
            <CustomDataTableAPI
                query={query}
                columns={columns}
                renderTopToolbarCustomActions={() => (
                    step == 0 ? (
                        <CustomButtonModal
                            disclosure={disc}
                            modalProps={{
                                title: "Xác nhận đồng bộ"
                            }}
                            buttonProps={{
                                actionType: "sync",
                                variant: "filled",
                                children: "Đồng bộ tất cả"
                            }}
                        >
                            <CustomButton
                                actionType="sync"
                                variant="filled"
                                onClick={() => {
                                    syncAllMutation.mutate()
                                    disc[1].close()
                                }}
                            >
                                Bắt đầu đồng bộ
                            </CustomButton>
                        </CustomButtonModal>
                    ) :
                        <CustomButton disabled>Đang đồng bộ api ({step})</CustomButton>
                )}
                renderRowActions={({ row }) => (<>
                    {syncBatchHistoryTableTypeApi[row.original.tableType!] && (
                        <CustomButtonModalSync
                            axiosFn={() => syncBatchHistoryTableTypeApi[row.original.tableType!]!()}
                        />
                    )}
                </>)}
            />
        </CustomFieldset>
    )
}



