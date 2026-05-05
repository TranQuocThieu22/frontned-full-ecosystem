'use client';
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { UpdateActionIcon } from "@/components/crud/UpdateActionIcon";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group, Modal, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { SubjectInfoViewModel } from "../../Institution&Organization/Subject/subject-table";
import CurriculumSubjectForm from "./curriculum-subject-form";

interface Props {
    enrollmentBatchId: number;
    startSemesterId: number;
    endSemesterId: number;
}

export interface CurriculumSubjectInfoViewModel {
    id: number,
    code?: string | null,
    name?: string | null,
    concurrencyStamp?: string | null,
    isEnabled: boolean,
    modifiedWhen?: Date | null,
    modifiedBy?: number | null,
    modifiedFullName?: string | null,
    coeGradeId?: number | null,
    coeSubjectId?: number | null,
    activityPlanId?: number | null,
    coeSubjectGroupId?: number | null,
    order?: number | null,
    isCore?: boolean | null,
    armiValue?: string | null,
    courseSectionQuantity?: number | null,
    courseSectionQuantityActual?: number | null,
    teachingUnitId?: number | null,
    measureUnitId?: number | null,
    collectUnitId?: number | null,
    coecGs?: any[] | null,
    coeSubjectFomulas?: any[] | null,
    coeGrade?: any | null,
    coeSubject?: SubjectInfoViewModel | null,
    activityPlan?: any | null,
    coeSubjectGroup?: any | null,
    coeSubjectAssessments?: any[] | null,
    coeGradeSubjectMITPIs?: any[] | null,
    teachingUnit?: any | null,
    measureUnit?: any | null,
    collectUnit?: any | null,
    coeGradeSubjectPIs?: any[] | null,
}

export default function CurriculumSubjectsTable({
    enrollmentBatchId,
    startSemesterId,
    endSemesterId
}: Props) {
    const queryClient = useQueryClient();
    const [currentCurriculumSubjectData, setCurrentCurriculumSubjectData] = useState<CurriculumSubjectInfoViewModel>();
    const [curriculumSubjectFormOpened, curriculumSubjectFormHandler] = useDisclosure(false);
    const [curriculumSubjectDeletePromptOpened, curriculumSubjectDeletePromptHandler] = useDisclosure(false);

    const curriculumsubjectsQuery = useQuery<CurriculumSubjectInfoViewModel[]>({
        queryKey: ["CurriculumSubjects"],
        queryFn: async () => {
            let cols = 'COESubject,COESubjectGroup,ActivityPlan'
            const res = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${enrollmentBatchId}&cols=${cols}`);
            return res.data.data ?? []
        },
        refetchOnWindowFocus: false,
        select: (data) => data.sort((subjectA, subjectB) => (subjectA.order ?? 0) - (subjectB.order ?? 0))
    });

    const columns = useMemo<MRT_ColumnDef<CurriculumSubjectInfoViewModel>[]>(() => [
        {
            header: "Năm học Học kỳ",
            accessorKey: "activityPlan.name",
            size: 80
        },
        {
            header: "Thứ tự",
            accessorKey: "order",
            size: 80,
            mantineTableBodyCellProps: {
                align: 'center'
            }
        },
        { header: "Mã môn học", accessorKey: "coeSubject.code", size: 120 },
        { header: "Tên môn học", accessorKey: "coeSubject.name" },
        { header: "Nhóm môn học", accessorKey: "coeSubjectGroup.name", size: 120 },
        {
            header: "Số tín chỉ",
            accessorKey: "coeSubject.numberCredit",
            size: 80,
            mantineTableBodyCellProps: {
                align: 'center'
            }
        },
        {
            header: "Số tiết",
            accessorKey: "coeSubject.numberPeriod",
            size: 80,
            mantineTableBodyCellProps: {
                align: 'center'
            }
        },
        { header: "Người cập nhật", accessorKey: "modifiedFullName" },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn(originalRow) {
                return originalRow.modifiedWhen ? (new Date(originalRow.modifiedWhen)).toLocaleString() : '';
            },
        },
    ], []);

    const openCurriculumSubjectForm = (curriculumSubjectData?: CurriculumSubjectInfoViewModel) => {
        setCurrentCurriculumSubjectData(curriculumSubjectData);
        curriculumSubjectFormHandler.open();
    }

    const deleteCurriculumSubjectMutation = useMutation({
        mutationFn: async (currentCurriculumSubjectData: CurriculumSubjectInfoViewModel) => {
            let body = {
                id: currentCurriculumSubjectData.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/COEGradeSubject/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            curriculumsubjectsQuery.refetch();
            queryClient.invalidateQueries({ queryKey: ["ActivatedEnrollmentBatchs"] });
            curriculumSubjectDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const openDeleteCurriculumSubjectPrompt = (curriculumSubjectData: CurriculumSubjectInfoViewModel) => {
        setCurrentCurriculumSubjectData(curriculumSubjectData);
        curriculumSubjectDeletePromptHandler.open();
    }

    return (
        <>
            <CustomDataTable
                columns={columns}
                data={curriculumsubjectsQuery.data ?? []}
                isLoading={curriculumsubjectsQuery.isFetching}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <>
                        <Group>
                            <Button loading={curriculumsubjectsQuery.isFetching} leftSection={<IconPlus />} onClick={() => openCurriculumSubjectForm()}>Thêm môn học</Button>
                        </Group>
                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <UpdateActionIcon
                                actionIconProps={{
                                    onClick: () => openCurriculumSubjectForm(row.original)
                                }}
                            />
                            <DeleteActionIcon
                                actionIconProps={{
                                    onClick: () => openDeleteCurriculumSubjectPrompt(row.original)
                                }}
                            />
                        </CustomCenterFull>
                    );
                }}
            />

            <Modal
                size={(!currentCurriculumSubjectData) ? '1600px' : '640px'}
                opened={curriculumSubjectFormOpened}
                onClose={curriculumSubjectFormHandler.close}
                title={<Text fw={700}>Thông tin môn học chương trình đào tạo</Text>}
            >
                <Space />
                <CurriculumSubjectForm
                    enrollmentBatchId={enrollmentBatchId}
                    curriculumSubjectId={currentCurriculumSubjectData?.id ?? 0}
                    startSemesterId={startSemesterId}
                    endSemesterId={endSemesterId}
                    formHandler={curriculumSubjectFormHandler}
                />
            </Modal>

            <DeletePrompt
                onConfirm={() => currentCurriculumSubjectData && deleteCurriculumSubjectMutation.mutate(currentCurriculumSubjectData)}
                target={{
                    label: "môn học chương trình đào tạo",
                    code: currentCurriculumSubjectData?.coeSubject?.code,
                    name: currentCurriculumSubjectData?.coeSubject?.name
                }}
                modalProps={{
                    opened: curriculumSubjectDeletePromptOpened,
                    onClose: curriculumSubjectDeletePromptHandler.close
                }}
            />
        </>
    );
}


