"use client"
import ClonePLOPIConfirmButton from '@/features/admin/UncategorizedModules/PLO-assessment/ClonePLOPI/ClonePLOPIConfirmButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCopy } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

interface Props {
    gradeIds: number[]
    resetRowSelection?: Function
}

export default function ClonePLOPIButton({ gradeIds, resetRowSelection }: Props) {
    const dics = useDisclosure();
    const queryClient = useQueryClient();

    const gradeQuery = useCustomReactQuery({
        queryKey: ["grade_has_plo_pi"],
        axiosFn: () => axiosInstance.get<CustomApiResponse<any[]>>("/COEGrade/GetSource",
            { params: { justHasPLOPI: true, ignoreIds: gradeIds }, paramsSerializer: { indexes: null } },
        ),
        options: {
            refetchOnWindowFocus: false,
            enabled: gradeIds.length > 0 && dics[0]
        }
    });

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            header: "Mã khóa",
            accessorKey: "code",
            accessorFn: (row) => row?.code,
        },
        {
            header: "Tên khóa",
            accessorKey: "name",
            accessorFn: (row) => row?.name
        },
        {
            header: "Chương trình",
            accessorKey: "coeGrade",
            accessorFn: (row) => row?.coeProgram?.name
        },
        {
            header: "Khoa",
            accessorFn: (row) => row?.coeProgram?.department?.name
        },
        {
            header: "Tổng số môn học",
            accessorKey: "totalSubject",
            size: 100,
        },
        {
            header: "Tổng số tín chỉ",
            accessorKey: "totalCredit",
            size: 100,
        },
        {
            header: "Tổng số PLO",
            accessorKey: "totalPLO",
            size: 100,
        },
        {
            header: "Tổng số PI",
            accessorKey: "totalPI",
            size: 100,
        },
    ], []);

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['GradeGetSource'] })
        dics[1].close();
        resetRowSelection && resetRowSelection();
    }

    return (
        <>
            <CustomButtonModal
                buttonProps={{
                    children: "Copy",
                    leftSection: <IconCopy />,
                    disabled: gradeIds.length == 0
                }}
                modalProps={{
                    title: "Sao chép Chuẩn đầu ra (PLO) từ khoá khác",
                    size: '70%'
                }}
                disclosure={dics}
            >
                <CustomDataTable
                    rowActionSize={100}
                    columns={columns}
                    data={gradeQuery.data || []}
                    isLoading={gradeQuery.isFetching}
                    isError={gradeQuery.isError}
                    renderRowActions={({ row }) => {
                        return <Center>
                            <ClonePLOPIConfirmButton
                                fromGradeId={row.original.id}
                                toGradeIds={gradeIds}
                                onSuccess={onSuccess}
                            />
                        </Center>
                    }}
                />
            </CustomButtonModal>
        </>
    )
}

