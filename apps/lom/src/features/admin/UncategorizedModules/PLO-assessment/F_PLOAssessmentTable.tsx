"use client"
import ClonePLOPIButton from '@/features/admin/UncategorizedModules/PLO-assessment/ClonePLOPI/ClonePLOPIButton';
import { canUpdatePLOData } from '@/features/auth/PageAuthorization/plo-data.auth';
import { COEGrade } from '@/interfaces/shared-interfaces/COEGrade';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { CustomColumnDef } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomFlexColumn } from '@aq-fe/core-ui/shared/components/layout/CustomFlexColumn';
import { CustomDataTableAPI } from '@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { Button, Group, Modal, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import F_PLOAssessmentUpdate from './F_PLOAssessmentUpdate';
import { SubjectTable } from './subject-table';

// interface IF_PLOAssessment_PIs {
//     PIsCode: string;
//     PIsPercentage: number;
//     descriptionPage2: string
// }

// interface IF_lz8rrabyws_Read {
//     id?: number;
//     code?: string;
//     name?: string;
//     coeGrade?: {};
//     totalCourse?: number;
//     totalCredit?: number;
//     nguoiCapNhat?: string;
//     ngayCapNhat?: Date | undefined;
//     PIs: IF_PLOAssessment_PIs[];
// }



// const mockProgramDetails: IProgramDetail[] = [
//     {
//         id: 1,
//         year: "2024-1",
//         order: "1",
//         code: "KTTC001",
//         name: "Kế toán tài chính",
//         group: "Cơ sở ngành",
//         credit: 2,
//         periods: 30,
//         courseCode: "CKCT24",
//     },
// ];

export default function F_PLOAssessmentTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const [totalSubjects, setTotalSubjects] = useState<Record<number, number>>({}); // Lưu tổng số môn học theo ID
    const [currentCurriculumId, setCurrentCurriculumId] = useState<number | null>(null);
    const [curriculumModalOpened, curriculumModalHandler] = useDisclosure(false);

    const curriculumsQuery = useCustomReactQuery({
        queryKey: [`GradeGetSource`],
        axiosFn: async () => {
            const result = await baseAxios.get<CustomApiResponse<COEGrade[]>>("/COEGrade/GetSource")
            return result
        },
    });


    const columns = useMemo<CustomColumnDef<COEGrade>[]>(() => [
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
            header: "Tổng số PIs",
            accessorKey: "totalPI",
            size: 100,
        },
        {
            header: "Chương trình đào tạo",
            accessorFn: (row) => {
                return (
                    <Button variant='filled' color='cyan' onClick={() => {
                        if (!row.id) return
                        setCurrentCurriculumId(row.id);
                        curriculumModalHandler.open();
                    }}>Xem chi tiết
                    </Button>
                )
            },
        },
        {
            header: "PLO",
            accessorFn: (row) => {
                if (canUpdatePLOData(userStore, userPermissionStore))
                    return <F_PLOAssessmentUpdate id={row.id!} name={row?.coeProgram?.name || ""} enrollmentBatchCode={row.code || ""} enrollmentBatchName={row.name || ""} />
                else
                    return null
            }
        },
    ], [totalSubjects]);

    const contentToPrint = () => (
        <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            <CustomFlexColumn ta={'center'} gap={2}>
                <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                <Text fw={'bold'} tt={"uppercase"}>Trường đại học</Text>
            </CustomFlexColumn>
            <hr style={{ border: "1px solid gray", width: "35%", margin: "auto" }} />
            <CustomFlexColumn ta={'center'} gap={2}>
                <Text fw={'bold'} tt={"uppercase"}>CHUẨN ĐẦU RA MÔN HỌC</Text>
                <Text fw={'bold'} tt={"uppercase"}>CHƯƠNG TRÌNH: { }</Text>
            </CustomFlexColumn>
            <Text>Chuẩn đầu ra chương trình đào tạo</Text>
            {/* Table */}
            <Table style={{ border: "1px solid black", marginTop: '20px' }}>
                <Table.Thead style={{ border: "1px solid black" }}>
                    <Table.Tr style={{ border: "1px solid black" }}>
                        <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Chuẩn đầu ra chương trình</Table.Th>
                        <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Chỉ số thực hiện đo lường (CLO)</Table.Th>
                        <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Tỷ trọng</Table.Th>
                        <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Mô tả CĐR</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>

                </Table.Tbody>
            </Table>
        </CustomFlexColumn>
    )

    return (
        <>
            <CustomDataTableAPI
                initialState={{
                    columnPinning: {
                        right: ["Chương trình đào tạo", "PLO"]
                    }
                }}
                exportProps={{
                    fileName: "Danh sách Chuẩn đầu ra chương trình đào tạo (PLO)",
                }}
                state={{
                    isLoading: curriculumsQuery.isFetching
                }}
                key={JSON.stringify(totalSubjects)}
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                query={curriculumsQuery}
                renderTopToolbarCustomActions={({ table }) => {
                    const ids = table.getSelectedRowModel().rows.map(row => row.original.id ?? 0);
                    return (
                        <Group>
                            <ClonePLOPIButton gradeIds={ids} resetRowSelection={table.resetRowSelection} />
                        </Group >
                    )
                }
                }
            />

            < Modal
                opened={curriculumModalOpened}
                onClose={() => curriculumModalHandler.close()}
                size="90%"
            >
                <SubjectTable id={currentCurriculumId!} modalDisclosure={curriculumModalHandler} />
            </Modal >
        </>
    );
}
