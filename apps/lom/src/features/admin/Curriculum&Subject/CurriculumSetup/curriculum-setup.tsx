'use client'
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { AppFeature } from "@/data/enum/app-feature.enum";
import { canCreateCurriculumSetup, canDeleteCurriculumSetup, canUpdateCurriculumSetup } from "@/features/auth/PageAuthorization/curriculumn-setup.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { useMemo, useState } from "react";
import { EducationLevelInfoViewModel } from "../../GeneralEducationMasterData/EducationLevel/education-level-table";
import { ProgramFormatInfoViewModel } from "../../GeneralEducationMasterData/ProgramFormat/program-format-table";
import { EnrollmentBatchDTO } from "../../Institution&Organization/EnrollmentBatch/enrollment-batch-form";
import { ProgramInfoViewModel } from "../../Institution&Organization/Program/program-table";
import { SemesterInfoViewModel } from "../../Institution&Organization/Semester/semester-table";
import CurriculumSubjectsTable from "./curriculum-subjects-table";
import SyncCurriculum from "./SyncCurriculum";

interface CurriculumSetupProps {
    appFeature: number | null,
    modalHandler?: any
}

export interface ActivatedEnrollmentBatchInfoViewModel {
    id: number
    code?: string | null,
    name?: string | null,
    concurrencyStamp?: string | null,
    isEnabled: boolean,
    modifiedWhen?: Date | null,
    modifiedBy?: number | null,
    modifiedFullName?: string | null,
    activityPlanStartId?: number | null,
    activityPlanEndId?: number | null,
    coeTrainingLevelId?: number | null,
    coeProgramId?: number | null,
    note?: string | null,
    isActive?: boolean | null,
    totalSubject?: number | null,
    totalCredit?: number | null,
    coeDegreeLevelId?: number | null,
    formulaType?: number | null,
    isSplitPoint?: boolean | null,
    activityPlanStart?: SemesterInfoViewModel | null,
    activityPlanEnd?: SemesterInfoViewModel | null,
    coeTrainingLevel?: EducationLevelInfoViewModel | null,
    coeProgram?: ProgramInfoViewModel | null,
    coeDegreeLevel?: ProgramFormatInfoViewModel | null,
}

export default function CurriculumSetup({ appFeature, modalHandler }: CurriculumSetupProps) {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const queryClient = useQueryClient();
    const [enrollmentBatchMultiSelectOpened, enrollmentBatchMultiSelectHandler] = useDisclosure(false);
    const [curriculumDeletePromptOpened, curriculumDeletePromptHandler] = useDisclosure(false);
    const [updateCurriculumModalOpened, updateCurriculumModalHandler] = useDisclosure(false);
    const [curriculumSyncModalOpened, curriculumSyncModalHandler] = useDisclosure(false);

    const [selectedLOMCurriculumId, setSelectedLOMCurriculumId] = useState<number | null>(null);

    const [currentActivatedEnrollmentBatchData, setCurrentActivatedEnrollmentBatchData] = useState<EnrollmentBatchDTO | null>(null);

    const activatedEnrollmentBatchQuery = useQuery<ActivatedEnrollmentBatchInfoViewModel[]>({
        queryKey: ["ActivatedEnrollmentBatchs"],
        queryFn: async () => {
            let cols = 'ActivityPlanStart,ActivityPlanEnd,COEDegreeLevel'
            const res = await baseAxios.get(`/COEGrade/GetSource?cols=${cols}`);
            return res.data.data ?? []
        },
        refetchOnWindowFocus: false,
    });

    const unActivatedEnrollmentBatchQuery = useQuery<ActivatedEnrollmentBatchInfoViewModel[]>({
        enabled: appFeature === AppFeature.ActivateEnrollmentBatch,
        queryKey: ["UnActivatedEnrollmentBatchs"],
        queryFn: async () => {
            const res = await baseAxios.get(`/COEGrade/GetGradeNotTrainingProgram`);
            return res.data.data ?? []
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<ActivatedEnrollmentBatchInfoViewModel>[]>(() => [
        { header: "Mã khóa", accessorKey: "code" },
        { header: "Tên khóa", accessorKey: "name" },
        { header: "Chương trình", accessorKey: "coeProgram.name" },
        { header: "Khoa", accessorKey: "coeProgram.department.name" },
        ...(appFeature === AppFeature.CurriculumSetup ? [
            {
                header: "Tổng số môn học",
                accessorKey: "totalSubject",
                mantineTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                header: "Tổng số tín chỉ",
                accessorKey: "totalCredit",
                mantineTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                header: "Chương trình đào tạo",
                Cell: ({ row }) => {
                    if (canUpdateCurriculumSetup(userStore, userPermissionStore)) {
                        return (
                            <Button
                                color="indigo.8"
                                onClick={handleOnClickUpdateCurriculumButton(row.original)}
                            >
                                Cập nhật
                            </Button>
                        )
                    }
                    else return "";
                }
            }
        ] as MRT_ColumnDef<ActivatedEnrollmentBatchInfoViewModel>[] : [])
    ], []);

    const activateEnrollmentBatchsMutation = useMutation({
        mutationFn: async (activatedEnrollmentBatchsData: EnrollmentBatchDTO[]) => {
            let response = await baseAxios.post('/COEGrade/UpdateList', activatedEnrollmentBatchsData)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ['ActivatedEnrollmentBatchs'] });
            modalHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const handleSelectEnrollmentBatchs = (selectedRows: MRT_Row<ActivatedEnrollmentBatchInfoViewModel>[]) => {
        let mappedData = mapToActivatedEnrollmentBatchs(selectedRows)
        activateEnrollmentBatchsMutation.mutate(mappedData);
    }

    const mapToActivatedEnrollmentBatchs = (selectedRows: MRT_Row<ActivatedEnrollmentBatchInfoViewModel>[]): EnrollmentBatchDTO[] => {
        return selectedRows.map(row => ({
            id: row.original.id,
            code: row.original.code,
            name: row.original.name,
            concurrencyStamp: row.original.concurrencyStamp,
            isEnabled: row.original.isEnabled,
            activityPlanStartId: row.original.activityPlanStartId,
            activityPlanEndId: row.original.activityPlanEndId,
            coeProgramId: row.original.coeProgramId,
            note: row.original.note,
            isActive: true,
            coeDegreeLevelId: row.original.coeDegreeLevelId,
            formulaType: row.original.formulaType,
            isSplitPoint: row.original.isSplitPoint
        }))
    }

    const openDeleteActivatedEnrollmentBatchPrompt = (enrollmentBatchData: ActivatedEnrollmentBatchInfoViewModel) => {
        setCurrentActivatedEnrollmentBatchData(mapToDeactivatedEnrollmentBatchs(enrollmentBatchData));
        curriculumDeletePromptHandler.open();
    }

    const mapToDeactivatedEnrollmentBatchs = (activatedEnrollmentBatch: ActivatedEnrollmentBatchInfoViewModel): EnrollmentBatchDTO => {
        return {
            id: activatedEnrollmentBatch.id,
            code: activatedEnrollmentBatch.code,
            name: activatedEnrollmentBatch.name,
            concurrencyStamp: activatedEnrollmentBatch.concurrencyStamp,
            isEnabled: activatedEnrollmentBatch.isEnabled,
            activityPlanStartId: activatedEnrollmentBatch.activityPlanStartId,
            activityPlanEndId: activatedEnrollmentBatch.activityPlanEndId,
            coeProgramId: activatedEnrollmentBatch.coeProgramId,
            note: activatedEnrollmentBatch.note,
            isActive: false,
            coeDegreeLevelId: activatedEnrollmentBatch.coeDegreeLevelId,
            formulaType: activatedEnrollmentBatch.formulaType,
            isSplitPoint: activatedEnrollmentBatch.isSplitPoint
        }
    }

    const deleteCurriculumMutation = useMutation({
        mutationFn: async (deactivatedEnrollmentBatchData: EnrollmentBatchDTO) => {
            let currentCurriculumSubjects = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${deactivatedEnrollmentBatchData.id}`);
            let deletedCurriculumSubjects = currentCurriculumSubjects.data.data.map((curriculumSubject: any) => ({
                id: curriculumSubject.id,
                isEnabled: false,
            }))
            let resDeactivateEnrollmentBatch = await baseAxios.post('/COEGrade/Update', deactivatedEnrollmentBatchData)
            let resDeletedCurriculumSubjects = await baseAxios.post('/COEGradeSubject/DeleteList', deletedCurriculumSubjects);

            if (resDeactivateEnrollmentBatch.data.isSuccess !== 1 || resDeletedCurriculumSubjects.data.isSuccess !== 1) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ['ActivatedEnrollmentBatchs'] });
            curriculumDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const confirmDeleteCurriculum = (deactivatedEnrollmentBatchData: EnrollmentBatchDTO) => {
        deleteCurriculumMutation.mutate(deactivatedEnrollmentBatchData);
    }

    const handleOnClickUpdateCurriculumButton = (enrollmentBatchData: ActivatedEnrollmentBatchInfoViewModel) => () => {
        setCurrentActivatedEnrollmentBatchData(enrollmentBatchData)
        updateCurriculumModalHandler.open()
    }

    const handleOnClickSyncButton = (LOMCurriculumId: number | null) => {
        setSelectedLOMCurriculumId(LOMCurriculumId);
        curriculumSyncModalHandler.open();
    }

    return (
        <>
            <CustomDataTable
                data={appFeature === AppFeature.CurriculumSetup ? activatedEnrollmentBatchQuery.data ?? [] : unActivatedEnrollmentBatchQuery.data ?? []}
                columns={columns}
                isLoading={activatedEnrollmentBatchQuery.isLoading || unActivatedEnrollmentBatchQuery.isLoading}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                {canCreateCurriculumSetup(userStore, userPermissionStore) &&
                                    appFeature === AppFeature.CurriculumSetup &&
                                    <Button loading={activatedEnrollmentBatchQuery.isFetching} onClick={enrollmentBatchMultiSelectHandler.open} leftSection={<IconPlus />}>Thêm</Button>
                                }
                                {appFeature === AppFeature.ActivateEnrollmentBatch &&
                                    <Button loading={unActivatedEnrollmentBatchQuery.isFetching} disabled={table.getSelectedRowModel().rows.length === 0} onClick={() => handleSelectEnrollmentBatchs(table.getSelectedRowModel().rows)} leftSection={<IconPlus />} color="indigo">Chọn</Button>
                                }
                                {appFeature === AppFeature.CurriculumSetup &&
                                    <Button
                                        loading={activatedEnrollmentBatchQuery.isFetching}
                                        variant="filled" color="green" leftSection={<IconRefresh />}
                                        disabled={table.getSelectedRowModel().rows.length > 1}
                                        onClick={() => handleOnClickSyncButton(table.getSelectedRowModel().rows[0]?.original.id ?? null)}>
                                        Đồng bộ
                                    </Button>}
                            </Group>
                        </>
                    )
                }}
                renderRowActions={appFeature === AppFeature.CurriculumSetup ? ({ row }) => {
                    return (
                        <CustomCenterFull>
                            {canDeleteCurriculumSetup(userStore, userPermissionStore) && <DeleteActionIcon
                                actionIconProps={{
                                    onClick: () => openDeleteActivatedEnrollmentBatchPrompt(row.original)
                                }}
                            />}
                        </CustomCenterFull>
                    )
                } : undefined}
                initialState={{
                    columnPinning: {
                        right: ['Chương trình đào tạo'],
                    },
                }}
            />

            <Modal
                opened={enrollmentBatchMultiSelectOpened}
                onClose={enrollmentBatchMultiSelectHandler.close}
                title={<Text fw={600}>Chọn khóa đào tạo</Text>}
                size="1600"
            >
                <>
                    <CurriculumSetup
                        appFeature={AppFeature.ActivateEnrollmentBatch}
                        modalHandler={enrollmentBatchMultiSelectHandler}
                    />
                </>
            </Modal>

            <DeletePrompt
                onConfirm={() => confirmDeleteCurriculum(currentActivatedEnrollmentBatchData!)}
                target={{
                    label: "chương trình đào tạo",
                    code: currentActivatedEnrollmentBatchData?.code,
                    name: currentActivatedEnrollmentBatchData?.name
                }}
                modalProps={{
                    opened: curriculumDeletePromptOpened,
                    onClose: curriculumDeletePromptHandler.close
                }}
            />

            <Modal
                opened={updateCurriculumModalOpened}
                onClose={updateCurriculumModalHandler.close}
                title={<Text fw={600}>Quản lý môn học thuộc chương trình đào tạo</Text>}
                size="1600"
            >
                <>
                    {currentActivatedEnrollmentBatchData &&
                        <CurriculumSubjectsTable
                            enrollmentBatchId={currentActivatedEnrollmentBatchData.id}
                            startSemesterId={currentActivatedEnrollmentBatchData.activityPlanStartId!}
                            endSemesterId={currentActivatedEnrollmentBatchData.activityPlanEndId!}
                        />
                    }
                </>
            </Modal>

            <Modal
                opened={curriculumSyncModalOpened}
                onClose={curriculumSyncModalHandler.close}
                title={<Text fw={600}>Đồng bộ chương trình đào tạo từ SIS</Text>}
                size="1600"
            >
                <>
                    <SyncCurriculum
                        LOMCurriculumId={selectedLOMCurriculumId}
                    />
                </>
            </Modal>
        </>
    );
}



