"use client"
import { DeleteActionIcon } from '@/components/crud/DeleteActionIcon';
import DeletePrompt from '@/components/crud/DeletePrompt';
import { UpdateActionIcon } from '@/components/crud/UpdateActionIcon';
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification';
import { MyDataTable } from '@/components/ui/DataDisplay/DataTable/MyDataTable';
import { CRUD_TYPES } from '@/data/constants/types';
import { CustomButtonPrintPDF } from '@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFlexColumn } from '@aq-fe/core-ui/shared/components/layout/CustomFlexColumn';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group, List, Modal, Table, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { IGradeSubject } from '../Interfaces/Interfaces';
import GSAssessmentForm from './GSAssessmentForm';
import { useGSAssessmentCRUDController } from './Hooks/useGSAssessmentCRUDController';
import { IGSAssessment } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

enum questionType {
    "Trắc nghiệm" = 1,
    "Tự luận" = 2,
    "Trắc nghiệm + Tự luận" = 3,
    "Tiểu luận" = 4,
    "Vấn đáp" = 5,
}

enum toolType {
    "Rubrics" = 1
}

export default function GSAssessmentTable({ isActiveTab, gradeSubjectId, gradeSubjectValues, programName }: { isActiveTab: boolean, gradeSubjectId: number, gradeSubjectValues?: IGradeSubject, programName: string }) {
    const crudController = useGSAssessmentCRUDController(gradeSubjectId);

    const allGSAssessment = useQuery<IGSAssessment[]>({
        enabled: isActiveTab,
        queryKey: ['GSAssessments', gradeSubjectId],
        queryFn: async () => {
            if (gradeSubjectId === null) return [];
            let cols = "COESubjectMethods,COESubjectFormula";
            const response = await baseAxios.get(`/COESubjectAssessment/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}&cols=${cols}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<IGSAssessment>[]>(() =>
        [
            {
                header: "Hình thức đánh giá",
                accessorFn: (originalRow) => originalRow.coeSubjectFormula?.formulaType === null ? "" : formulaType[originalRow.coeSubjectFormula?.formulaType!],
            },
            {
                header: "Tỷ trọng CA",
                accessorFn: (originalRow) => originalRow.coeSubjectFormula?.rate,
                Cell: ({ row }) => {
                    return (
                        <>
                            {row.original.coeSubjectFormula?.rate} %
                        </>
                    )
                }
            },
            {
                header: "Nội dung đánh giá",
                accessorKey: "content",
            },
            {
                header: "CLOi",
                accessorFn: (originalRow) => originalRow.coeSubjectMethods?.map((item) => item.coeclo?.code!),
                Cell: ({ row }) => {
                    return (
                        <>
                            <List
                                my={10}
                                mr={20}
                                spacing="xs"
                                size="sm"
                                center
                            >
                                {row.original.coeSubjectMethods?.map((item) =>
                                    <List.Item
                                        key={item.id}
                                    // icon={<></>}
                                    >
                                        <b>{item.coeclo?.code!}</b> - {item.coeclo?.description}
                                    </List.Item>
                                )}
                            </List>
                        </>
                    )
                },
                size: 480,
            },
            {
                header: "Thời điểm đánh giá",
                accessorKey: "assessmentWhen",
            },
            {
                header: "Phương pháp đánh giá",
                accessorFn: (originalRow) => originalRow.questionType === null ? "" : questionType[originalRow.questionType!],
            },
            {
                header: "Loại công cụ đánh giá",
                accessorFn: (originalRow) => originalRow.assessmentTool === null ? "" : toolType[originalRow.assessmentTool!],
            },
            {
                header: "Thời gian đánh giá",
                accessorKey: "assessmentDuration",
            },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",
            // },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },
            // },
        ],
        []
    );

    const contentToPrint = () => {
        // Group assessments by formula type
        interface GroupedAssessments {
            [key: number]: IGSAssessment[];
        }

        const groupedAssessments = allGSAssessment.data?.reduce((acc: GroupedAssessments, assessment) => {
            const formulaTypeId = assessment.coeSubjectFormula?.formulaType || 0;
            if (!acc[formulaTypeId]) {
                acc[formulaTypeId] = [];
            }
            acc[formulaTypeId].push(assessment);
            return acc;
        }, {} as GroupedAssessments) || {};

        // Helper function to get CLO codes as string
        const getCLOCodes = (methods: IGSAssessment['coeSubjectMethods']) => {
            return methods?.map(method => method.coeclo?.code || '').filter(Boolean).join(", ") || "";
        };

        return (
            <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                </CustomFlexColumn>
                <hr style={{ border: "1px solid gray", width: "35%", margin: "auto" }} />
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text fw={'bold'} tt={"uppercase"}>Nội dung đánh giá môn học</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Chương trình: {programName}</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Môn: {gradeSubjectValues?.name}</Text>
                </CustomFlexColumn>
                <Table style={{ border: "1px solid black", marginTop: '20px' }}>
                    <Table.Thead style={{ border: "1px solid black" }}>
                        <Table.Tr style={{ border: "1px solid black" }}>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Thành phần đánh giá</Table.Th>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Bài đánh giá</Table.Th>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Thời điểm</Table.Th>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>CĐR môn học</Table.Th>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Tỷ trọng %</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {Object.values(formulaType)
                            .filter(type => typeof type === 'number')
                            .map((type: number) => {
                                const assessments = groupedAssessments[type] || [];
                                if (assessments.length === 0) return null;

                                return (
                                    <React.Fragment key={type}>
                                        {assessments.map((assessment: IGSAssessment, index: number) => (
                                            <Table.Tr key={assessment.id} style={{ border: "1px solid black" }}>
                                                {index === 0 && (
                                                    <Table.Td
                                                        ta="center"
                                                        style={{ border: "1px solid black", padding: '8px' }}
                                                        rowSpan={assessments.length + 1}
                                                    >
                                                        {formulaType[type]}
                                                    </Table.Td>
                                                )}
                                                <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{questionType[assessment.questionType!]}</Table.Td>
                                                <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{assessment.assessmentWhen}</Table.Td>
                                                <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{getCLOCodes(assessment.coeSubjectMethods)}</Table.Td>
                                                <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{assessment.coeSubjectFormula?.rate}%</Table.Td>
                                            </Table.Tr>
                                        ))}
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black", padding: '8px', fontWeight: "bold" }} colSpan={3}>Tổng cộng</Table.Td>
                                            <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px', fontWeight: "bold" }}>
                                                {assessments.reduce((sum: number, assessment: IGSAssessment) =>
                                                    sum + (assessment.coeSubjectFormula?.rate || 0), 0)}%
                                            </Table.Td>
                                        </Table.Tr>
                                    </React.Fragment>
                                );
                            })}
                    </Table.Tbody>
                </Table>
            </CustomFlexColumn>
        );
    }

    const mutateGSAssessment = useMutation({
        mutationFn: async () => {
            let body = {
                id: crudController.initialFormValue?.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/COESubjectAssessment/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            allGSAssessment.refetch();
            crudController.handler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });


    return (
        <>
            <MyDataTable
                columns={columns}
                data={allGSAssessment.data || []}
                state={{
                    isLoading: allGSAssessment.isLoading
                }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <Button onClick={() => crudController.openCreateForm(gradeSubjectId!)} leftSection={<IconPlus />}>Thêm</Button>
                            {/* <PrototypeExportButton />
                            <PrototypeImportButton />
                            <PrototypeDeleteAllButton /> */}
                            <CustomButtonPrintPDF  >
                                {contentToPrint()}
                            </CustomButtonPrintPDF>
                        </Group>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <Group gap={8}>
                                <UpdateActionIcon
                                    actionIconProps={{
                                        onClick: () => crudController.openUpdateForm(row.original)
                                    }}
                                />
                                <DeleteActionIcon
                                    actionIconProps={{
                                        onClick: () => crudController.openDeletePrompt(row.original)
                                    }}
                                />
                            </Group>
                        </CustomCenterFull>
                    )
                }}
            />

            <Modal
                size={'lg'}
                opened={(crudController.CRUDType === CRUD_TYPES.Create || crudController.CRUDType === CRUD_TYPES.Update) && crudController.opened}
                onClose={crudController.handler.close}
                title={<Text fw={700}>Chi tiết nội dung đánh giá</Text>}
            >
                <GSAssessmentForm
                    CRUDType={crudController.CRUDType}
                    initialValue={crudController.initialFormValue}
                    modalHandler={crudController.handler}
                    gradeSubjectId={gradeSubjectId!}
                />
            </Modal>

            <DeletePrompt
                onConfirm={() => mutateGSAssessment.mutate()}
                target={{
                    label: "nội dung đánh giá",
                    code: crudController.initialFormValue?.code,
                    name: crudController.initialFormValue?.name
                }}
                modalProps={{
                    opened: crudController.CRUDType === CRUD_TYPES.Delete && crudController.opened,
                    onClose: crudController.handler.close
                }}
            />
        </>
    )
}
