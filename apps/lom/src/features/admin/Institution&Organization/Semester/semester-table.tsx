'use client'
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { UpdateActionIcon } from "@/components/crud/UpdateActionIcon";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import SyncDataEdusoftButton from "@/shared/components/SyncDataEdusoftButton";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Button, Checkbox, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { canCreateSemester, canDeleteSemester, canUpdateSemester } from "../../../auth/PageAuthorization/semester.auth";
import SemesterForm from "./semester-form";

export interface SemesterInfoViewModel {
    id: number;
    code?: string | null;
    name?: string | null;
    note?: string | null;
    isEnabled?: boolean;
    concurrencyStamp?: string;
    modifiedWhen?: Date | null;
    modifiedBy?: number | null;
    modifiedFullName?: string;
    hierarchyId?: number | null;
    facultyId?: number | null;
    academicYearId?: number | null;
    startDate?: Date | null;
    endDate?: Date | null;
    isCurrent?: boolean;
    semester?: number | null;
    totalWeek?: number | null;
    aqModuleId?: number | null;
}

export default function SemesterTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const defaultSemesterData = {
        id: 0,
        code: null,
        name: null,
        note: null,
        isEnabled: true,
        concurrencyStamp: 'string',
        hierarchyId: null,
        facultyId: null,
        academicYearId: null,
        startDate: null,
        endDate: null,
        isCurrent: false,
        semester: null,
        totalWeek: null,
        aqModuleId: 5,
    }
    const [semesterFormOpened, semesterFormHandler] = useDisclosure(false);
    const [semesterDeletePromptOpened, semesterDeletePromptHandler] = useDisclosure(false);

    const [currentSemesterData, setCurrentSemesterData] = useState<SemesterInfoViewModel>(defaultSemesterData);

    const semestersQuery = useQuery<SemesterInfoViewModel[]>({
        queryKey: ["Semesters"],
        queryFn: async () => {
            let response = await baseAxios.get(`/ActivityPlan/ActivityPlanOnlyGetAll`)
            return response.data.data
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<SemesterInfoViewModel>[]>(() => [
        { header: "Năm học - Học kì", accessorKey: "code", size: 200 },
        { header: "Tên năm học - Học kì", accessorKey: "name", size: 220 },
        {
            header: "Năm học",
            accessorKey: "academicYear.name",
        },
        {
            header: "Ngày bắt đầu", accessorKey: "startDate",
            accessorFn(originalRow) {
                return dateUtils.toDDMMYYYY(new Date(originalRow.startDate!));
            },
        },
        {
            header: "Ngày kết thúc", accessorKey: "endDate",
            accessorFn(originalRow) {
                return dateUtils.toDDMMYYYY(new Date(originalRow.endDate!));
            },
        },
        { header: "Số tuần", accessorKey: "totalWeek" },
        {
            header: "Hiện hành", accessorKey: "isCurrent",
            accessorFn: (row) => {

                return (
                    <Checkbox
                        color="green"
                        checked={row.isCurrent!}
                        readOnly
                    />
                )
            }
        },
        { header: "Ghi chú", accessorKey: "note" },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // {
        //     header: "Ngày cập nhật", accessorKey: "modifiedWhen",
        //     accessorFn(originalRow) {
        //         return U0DateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
        //     },
        // }
    ], []);

    const openSemesterForm = (semesterData: SemesterInfoViewModel) => {
        canCreateSemester(userStore, userPermissionStore);
        setCurrentSemesterData(semesterData);
        semesterFormHandler.open();
    }

    const deleteSemesterMutation = useMutation({
        mutationFn: async (currentSemesterData: SemesterInfoViewModel) => {
            let body = {
                id: currentSemesterData?.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/ActivityPlan/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            semestersQuery.refetch();
            semesterDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const openDeleteSemesterPrompt = (semesterData: SemesterInfoViewModel) => {
        setCurrentSemesterData(semesterData);
        semesterDeletePromptHandler.open();
    }

    return (
        <>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                {canCreateSemester(userStore, userPermissionStore) &&
                                    <Button onClick={() => openSemesterForm(defaultSemesterData)} leftSection={<IconPlus />}>Thêm</Button>
                                }
                                <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataActivityPlan()} />
                                {/* <PrototypeImportButton />
                                <PrototypeExportButton />
                                <PrototypeDeleteAllButton /> */}
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={semestersQuery.data ?? []}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            {canUpdateSemester(userStore, userPermissionStore) &&
                                <UpdateActionIcon
                                    actionIconProps={{
                                        onClick: () => openSemesterForm(row.original)
                                    }}
                                />
                            }
                            {canDeleteSemester(userStore, userPermissionStore) &&
                                <DeleteActionIcon
                                    actionIconProps={{
                                        onClick: () => openDeleteSemesterPrompt(row.original)
                                    }}
                                />
                            }
                        </CustomCenterFull>
                    )
                }}
            />

            <Modal
                size={'lg'}
                opened={semesterFormOpened}
                onClose={semesterFormHandler.close}
                title={<Text fw={700}>Thông tin học kỳ</Text>}
            >
                <SemesterForm
                    semesterData={currentSemesterData}
                    formHandler={semesterFormHandler}
                />
            </Modal>

            <DeletePrompt
                onConfirm={() => deleteSemesterMutation.mutate(currentSemesterData!)}
                target={{
                    label: "học kỳ",
                    code: currentSemesterData.code,
                    name: currentSemesterData.name
                }}
                modalProps={{
                    opened: semesterDeletePromptOpened,
                    onClose: semesterDeletePromptHandler.close
                }}
            />
        </>
    );
}