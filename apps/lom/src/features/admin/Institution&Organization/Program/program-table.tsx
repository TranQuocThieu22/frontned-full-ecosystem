"use client";
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { UpdateActionIcon } from "@/components/crud/UpdateActionIcon";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateProgram, canDeleteProgram, canUpdateProgram } from "@/features/auth/PageAuthorization/program-data.auth";
import SyncDataEdusoftButton from "@/shared/components/SyncDataEdusoftButton";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { DepartmentInfoViewModel } from "../Department/department-table";
import ProgramForm from "./program-form";

export interface ProgramInfoViewModel {
    id: number;
    code?: string | null;
    name?: string | null;
    note?: string | null;
    departmentId?: number | null;
    department?: DepartmentInfoViewModel | null
    concurrencyStamp?: string;
    isEnabled: boolean;
}

export default function ProgramTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const defaultProgramData = {
        id: 0,
        code: null,
        name: null,
        note: null,
        departmentId: null,
        concurrencyStamp: 'string',
        isEnabled: true,
    }
    const [programFormOpened, programFormHandler] = useDisclosure(false);
    const [programDeletePromptOpened, programDeletePromptHandler] = useDisclosure(false);

    const [currentProgramData, setCurrentProgramData] = useState<ProgramInfoViewModel>(defaultProgramData);

    const programQuery = useQuery<ProgramInfoViewModel[]>({
        queryKey: ["Programs"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEProgram/Getall?cols=Department");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<ProgramInfoViewModel>[]>(() => [
        { header: "Mã chương trình", accessorKey: "code" },
        { header: "Tên chương trình", accessorKey: "name" },
        {
            header: "Khoa quản lý",
            accessorKey: "department.name",
        },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.updatedAt!)),
        // },
    ], []);

    const openProgramForm = (programData: ProgramInfoViewModel) => {
        setCurrentProgramData(programData);
        programFormHandler.open();
    }

    const deleteProgramMutation = useMutation({
        mutationFn: async (currentProgramData: ProgramInfoViewModel) => {
            let body = {
                id: currentProgramData?.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/COEProgram/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            programQuery.refetch();
            programDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const openDeleteProgramPrompt = (programData: ProgramInfoViewModel) => {
        setCurrentProgramData(programData);
        programDeletePromptHandler.open();
    }

    return (
        <>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        {canCreateProgram(userStore, userPermissionStore) && <Button onClick={() => openProgramForm(defaultProgramData)} leftSection={<IconPlus />}>Thêm</Button>}
                        <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataMajor()} />
                    </Group>
                )}
                columns={columns}
                data={programQuery.data || []}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        {canUpdateProgram(userStore, userPermissionStore) &&
                            <UpdateActionIcon
                                actionIconProps={{
                                    onClick: () => openProgramForm(row.original)
                                }}
                            />}
                        {canDeleteProgram(userStore, userPermissionStore) &&
                            <DeleteActionIcon
                                actionIconProps={{
                                    onClick: () => openDeleteProgramPrompt(row.original)
                                }}
                            />}
                    </CustomCenterFull>
                )}
            />

            <Modal
                size={'lg'}
                opened={programFormOpened}
                onClose={programFormHandler.close}
                title={<Text fw={700}>Thông tin chương trình đào tạo</Text>}
            >
                <ProgramForm programData={currentProgramData} formHandler={programFormHandler} />
            </Modal>

            <DeletePrompt
                onConfirm={() => deleteProgramMutation.mutate(currentProgramData)}
                target={{
                    label: "chương trình đào tạo",
                    code: currentProgramData.code,
                    name: currentProgramData.name
                }}
                modalProps={{
                    opened: programDeletePromptOpened,
                    onClose: programDeletePromptHandler.close
                }}
            />
        </>
    );
}

