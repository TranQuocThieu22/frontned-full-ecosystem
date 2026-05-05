"use client"
import { MyDataTable } from '@/components/ui/DataDisplay/DataTable/MyDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import GSFormulaCreateButton from './GSFormulaCreateButton';
import GSFormulaDeleteActionIconModal from './GSFormulaDeleteActionIcon';
import GSFormulaUpdateActionIcon from './GSFormulaUpdateActionIcon';
import { IGSFormula } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1, // Chuyên cần
    "Quá trình" = 2, // Quá trình
    "Cuối kỳ" = 3  // Cuối kỳ
}

export default function GSFormulaTable({ isActiveTab, gradeSubjectId }: { isActiveTab: boolean, gradeSubjectId?: number }) {

    const allGSFormula = useQuery<IGSFormula[]>({
        enabled: isActiveTab,
        queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            // return mockData
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COESubjectFormula/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<IGSFormula>[]>(() =>
        [
            {
                header: "Hình thức đánh giá",
                accessorFn: (originalRow) => originalRow.formulaType === null ? "" : formulaType[originalRow.formulaType!],
            },
            {
                header: "Tỷ trọng CA",
                accessorFn: (originalRow) => originalRow.rate,
                Cell: ({ row }) => {
                    return (
                        <>
                            {row.original.rate} %
                        </>
                    )
                }
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

    return (
        <MyDataTable
            columns={columns}
            data={allGSFormula.data || []}
            state={{
                isLoading: allGSFormula.isLoading
            }}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <GSFormulaCreateButton gradeSubjectId={gradeSubjectId} />
                            {/* <Button leftSection={<IconTablePlus />} color="green" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Import</Button>
                            <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Export</Button> */}
                            {/* <Button color='red'>Xóa</Button> */}
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <Group gap={8}>
                            <GSFormulaUpdateActionIcon
                                gradeSubjectFormulaValues={row.original}
                                gradeSubjectId={gradeSubjectId}
                            />
                            <GSFormulaDeleteActionIconModal
                                GSFormulaCode={row.original.code === null ? null : row.original.code}
                                GSFormulaID={row.original.id}
                                gradeSubjectId={gradeSubjectId}
                            />
                        </Group>
                    </CustomCenterFull>
                )
            }}
        />
    )
}
