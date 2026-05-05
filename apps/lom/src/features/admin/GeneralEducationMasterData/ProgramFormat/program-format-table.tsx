'use client'
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { UpdateActionIcon } from "@/components/crud/UpdateActionIcon";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateProgramFormat, canDeleteProgramFormat, canUpdateProgramFormat } from "@/features/auth/PageAuthorization/program-format.auth";
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
import ProgramFormatForm from "./program-format-form";

export interface ProgramFormatInfoViewModel {
    id: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled: boolean;
    modifiedWhen?: Date | null,
    modifiedBy?: number | null,
    modifiedFullName?: string | null,
    nameEg?: string | null;
    coeRegulationId?: number | null,
    coeTrainingSystemId?: number | null,
    coeTrainingLevelId?: number | null,
    numSemestersMax?: number | null,
    numSemestersProgram?: number | null,
    numSemestersYear?: number | null,
    coeRegulation?: any | null;
    coeTrainingLevel?: any | null;
    coeTrainingSystem?: any | null;
}

export default function ProgramFormatTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const defaultProgramFormatData = {
        id: 0,
        code: null,
        name: null,
        concurrencyStamp: 'string',
        isEnabled: true,
        nameEg: null,
        coeRegulationId: null,
        coeTrainingSystemId: null,
        coeTrainingLevelId: null,
        numSemestersMax: null,
        numSemestersProgram: null,
        numSemestersYear: null,
    }
    const [currentProgramFormatData, setCurrentProgramFormatData] = useState<ProgramFormatInfoViewModel>(defaultProgramFormatData);
    const [programFormatFormOpened, programFormatFormHandler] = useDisclosure(false);
    const [programFormatDeletePromptOpened, programFormatDeletePromptHandler] = useDisclosure(false);

    const programFormatQuery = useQuery<ProgramFormatInfoViewModel[]>({
        queryKey: ["ProgramFormats"],
        queryFn: async () => {
            let cols = 'COEProgram,COETrainingLevel,COETrainingSystem,COERegulation';
            const result = await baseAxios.get(`/COEDegreeLevel/GetAll?cols=${cols}`);
            return result.data?.data || []
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<ProgramFormatInfoViewModel>[]>(() => [
        { header: "Mã bậc hệ", accessorKey: "code" },
        { header: "Tên bậc hệ", accessorKey: "name" },
        {
            header: "Quy chế",
            accessorKey: "coeRegulation.name",
        },
        {
            header: "Bậc",
            accessorKey: "coeTrainingLevel.name",
        },
        {
            header: "Hệ",
            accessorKey: "coeTrainingSystem.name",
        },
        { header: "Số học kỳ chương trình", accessorKey: "numSemestersProgram" },
        { header: "Số học kỳ tối đa", accessorKey: "numSemestersMax" },
        { header: "Số học kỳ năm học", accessorKey: "numSemestersYear" },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
        // },
    ], []);

    const openProgramFormatForm = (programFormatData: ProgramFormatInfoViewModel) => {
        setCurrentProgramFormatData(programFormatData);
        programFormatFormHandler.open();
    }

    const deleteProgramFormatMutation = useMutation({
        mutationFn: async (currentProgramFormatData: ProgramFormatInfoViewModel) => {
            let body = {
                id: currentProgramFormatData?.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/COEDegreeLevel/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            programFormatQuery.refetch();
            programFormatDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const openDeleteProgramFormatPrompt = (programFormatData: ProgramFormatInfoViewModel) => {
        setCurrentProgramFormatData(programFormatData);
        programFormatDeletePromptHandler.open();
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
                                {canCreateProgramFormat(userStore, userPermissionStore) &&
                                    <Button onClick={() => openProgramFormatForm(defaultProgramFormatData)} leftSection={<IconPlus />}>Thêm</Button>
                                }
                                <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataDegreeLevel()} />
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={programFormatQuery.data ?? []}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            {canUpdateProgramFormat(userStore, userPermissionStore) &&
                                <UpdateActionIcon
                                    actionIconProps={{
                                        onClick: () => openProgramFormatForm(row.original)
                                    }}
                                />
                            }
                            {canDeleteProgramFormat(userStore, userPermissionStore) &&
                                <DeleteActionIcon
                                    actionIconProps={{
                                        onClick: () => openDeleteProgramFormatPrompt(row.original)
                                    }}
                                />
                            }
                        </CustomCenterFull>
                    )
                }}
            />

            <Modal
                opened={programFormatFormOpened}
                onClose={programFormatFormHandler.close}
                title={<Text fw={600}>Thông tin bậc hệ</Text>}
                size="lg"
            >
                <ProgramFormatForm
                    programFormatData={currentProgramFormatData}
                    formHandler={programFormatFormHandler}
                />
            </Modal>

            <DeletePrompt
                onConfirm={() => deleteProgramFormatMutation.mutate(currentProgramFormatData!)}
                target={{
                    label: "bậc hệ",
                    code: currentProgramFormatData.code,
                    name: currentProgramFormatData.name
                }}
                modalProps={{
                    opened: programFormatDeletePromptOpened,
                    onClose: programFormatDeletePromptHandler.close
                }}
            />
        </>
    );
}