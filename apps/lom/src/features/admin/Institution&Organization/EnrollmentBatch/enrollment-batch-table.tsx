'use client'
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { UpdateActionIcon } from "@/components/crud/UpdateActionIcon";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateEnrollmentBatch, canDeleteEnrollmentBatch, canUpdateEnrollmentBatch } from "@/features/auth/PageAuthorization/enrollment-batch.auth";
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
import { ActivatedEnrollmentBatchInfoViewModel } from "../../Curriculum&Subject/CurriculumSetup/curriculum-setup";
import { ProgramFormatInfoViewModel } from "../../GeneralEducationMasterData/ProgramFormat/program-format-table";
import { ProgramInfoViewModel } from "../Program/program-table";
import { SemesterInfoViewModel } from "../Semester/semester-table";
import EnrollmentBatchForm from "./enrollment-batch-form";

export interface EnrollmentBatchInfoViewModel {
    id: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled: boolean;
    modifiedWhen?: Date | null,
    modifiedBy?: number | null,
    modifiedFullName?: string | null,
    activityPlanStartId?: number | null,
    activityPlanEndId?: number | null,
    coeProgramId?: number | null,
    note?: string | null;
    isActive?: boolean | null;
    totalSubject?: number | null,
    totalCredit?: number | null,
    coeDegreeLevelId?: number | null,
    formulaType?: number | null,
    isSplitPoint?: boolean | null
    activityPlanStart?: SemesterInfoViewModel | null,
    activityPlanEnd?: SemesterInfoViewModel | null,
    coeProgram?: ProgramInfoViewModel | null,
    coeDegreeLevel?: ProgramFormatInfoViewModel | null,
}

export default function EnrollmentBatchTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const defaultEnrollmentBatchData = {
        id: 0,
        code: null,
        name: null,
        concurrencyStamp: 'string',
        isEnabled: true,
        activityPlanStartId: null,
        activityPlanEndId: null,
        coeProgramId: null,
        note: null,
        isActive: false,
        totalSubject: null,
        totalCredit: null,
        coeDegreeLevelId: null,
        formulaType: null,
        isSplitPoint: null
    }
    const [currentEnrollmentBatchData, setCurrentEnrollmentBatchData] = useState<EnrollmentBatchInfoViewModel>(defaultEnrollmentBatchData);
    const [enrollmentBatchFormOpened, enrollmentBatchFormHandler] = useDisclosure(false);
    const [enrollmentBatchDeletePromptOpened, enrollmentBatchDeletePromptHandler] = useDisclosure(false);

    const enrollmentBatchQuery = useQuery<EnrollmentBatchInfoViewModel[]>({
        queryKey: ["EnrollmentBatchs"],
        queryFn: async () => {
            let cols = 'COEProgram'
            const res = await baseAxios.get(`/COEGrade/GetAll?cols=${cols}`);
            return res.data.data ?? []
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<EnrollmentBatchInfoViewModel | ActivatedEnrollmentBatchInfoViewModel>[]>(() => [
        { header: "Mã khóa", accessorKey: "code" },
        { header: "Tên khóa", accessorKey: "name" },
        { header: "Chương trình", accessorKey: "coeProgram.name" },
        {
            header: "Khoa",
            accessorKey: "coeProgram.department.name",
        },
    ], []);

    const openEnrollmentBatchForm = (enrollmentBatchData: EnrollmentBatchInfoViewModel) => {
        setCurrentEnrollmentBatchData(enrollmentBatchData);
        enrollmentBatchFormHandler.open();
    }

    const deleteEnrollmentBatchMutation = useMutation({
        mutationFn: async (currentEnrollmentBatchData: EnrollmentBatchInfoViewModel) => {
            let body = {
                id: currentEnrollmentBatchData?.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/COEGrade/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            enrollmentBatchQuery.refetch();
            enrollmentBatchDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const openDeleteEnrollmentBatchPrompt = (enrollmentBatchData: EnrollmentBatchInfoViewModel) => {
        setCurrentEnrollmentBatchData(enrollmentBatchData);
        enrollmentBatchDeletePromptHandler.open();
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
                                {canCreateEnrollmentBatch(userStore, userPermissionStore) && <Button onClick={() => openEnrollmentBatchForm(defaultEnrollmentBatchData)} leftSection={<IconPlus />}>Thêm</Button>}
                                <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataFieldOfStudy()} />
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={enrollmentBatchQuery.data || []}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            {canUpdateEnrollmentBatch(userStore, userPermissionStore) &&
                                <UpdateActionIcon
                                    actionIconProps={{
                                        onClick: () => openEnrollmentBatchForm(row.original)
                                    }}
                                />
                            }
                            {canDeleteEnrollmentBatch(userStore, userPermissionStore) &&
                                <DeleteActionIcon
                                    actionIconProps={{
                                        onClick: () => openDeleteEnrollmentBatchPrompt(row.original)
                                    }}
                                />
                            }
                        </CustomCenterFull>
                    )
                }}
            />

            <Modal
                opened={enrollmentBatchFormOpened}
                onClose={enrollmentBatchFormHandler.close}
                title={<Text fw={600}>Thông tin khóa đào tạo</Text>}
                size="lg"
            >
                <EnrollmentBatchForm
                    enrollmentBatchData={currentEnrollmentBatchData}
                    formHandler={enrollmentBatchFormHandler}
                />
            </Modal>

            <DeletePrompt
                onConfirm={() => deleteEnrollmentBatchMutation.mutate(currentEnrollmentBatchData)}
                target={{
                    label: "danh mục khóa đào tạo",
                    code: currentEnrollmentBatchData.code,
                    name: currentEnrollmentBatchData.name
                }}
                modalProps={{
                    opened: enrollmentBatchDeletePromptOpened,
                    onClose: enrollmentBatchDeletePromptHandler.close
                }}
            />
        </>
    );
}