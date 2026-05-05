import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { Table, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    clo?: string,
    weight?: number,
    assessmentMethod?: string
    assessmentName?: string
    maxPoint?: number
}

export default function CLOMatrixSummaryTablePrototype() {
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "CLO",
            size: 10,
            accessorKey: "clo",
            Cell: ({ row, table }) => {
                const current = row.original.clo;
                const rowIndex = row.index;
                const allRows = table.getRowModel().rows;
                const prevRow = allRows[rowIndex - 1];
                const prev = prevRow?.original?.clo;
                return current === prev ? null : current;
            },
            Footer: ({ table }) => {
                return `Tổng: `;
            },
        },
        {
            header: "Trọng số",
            accessorKey: "weight",
            Cell: ({ row }) => row.original.weight + " %",
            Footer: ({ table }) => {
                const total = table
                    .getFilteredRowModel()
                    .rows.reduce((sum, row) => sum + (row.getValue<number>('weight') ?? 0), 0);
                return `${total} %`;
            },

        },
        {
            header: "Hình thức đánh giá",
            accessorKey: "assessmentMethod"
        },
        {
            header: "Bài đánh giá",
            accessorKey: "assessmentName"
        },
        {
            header: "Điểm tối đa",
            accessorKey: "maxPoint"
        }
    ], [])
    return (
        <CustomDataTable
            enableRowSelection
            columns={columns}
            data={data}
            renderTopToolbarCustomActions={() => (
                <CustomButtonPrintPDF buttonProps={{
                    children: "In"
                }}>
                    <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                        <CustomFlexColumn ta={'center'} gap={2}>
                            <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                            <Text fw={'bold'} tt={"uppercase"} td={"underline"}>Trường đại học ABC</Text>
                        </CustomFlexColumn>
                        <CustomFlexColumn ta={'center'} gap={2}>
                            <Text fw={'bold'} tt={"uppercase"}>Tổng hợp CLO môn học</Text>
                            <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>Toàn môn học </Text>
                        </CustomFlexColumn>
                        <Text>Chương trình: Kế toán doanh nghiệp</Text>
                        <Text>Khoá: KT2401</Text>
                        <Text>Môn: Kế tooán ngân hàng thương mại</Text>
                        <Table style={{ border: "1px solid black" }}>
                            <Table.Thead style={{ border: "1px solid black" }}>
                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Th style={{ border: "1px solid black" }}>CLO</Table.Th>
                                    <Table.Th style={{ border: "1px solid black" }}>Trọng số</Table.Th>
                                    <Table.Th style={{ border: "1px solid black" }}>Hình thức đánh giá</Table.Th>
                                    <Table.Th style={{ border: "1px solid black" }}>Bài đánh giá</Table.Th>
                                    <Table.Th style={{ border: "1px solid black" }}>Điểm tối đa</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody style={{ border: "1px solid black" }}>
                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}>CLO2</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Chuyên cần</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Bài tập 1: Sử dụng Excel/SPSS</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>

                                </Table.Tr>
                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Cuối kỳ</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Phần 1: Chạy mô hình và xuất kết quả</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                </Table.Tr>
                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}>CLO3</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Chuyên cần</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Phần 2: Phân tích và biện luận kết quả</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                </Table.Tr>
                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Chuyên cần</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Câu 1: Đọc và giải thích input có sẵn</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>

                                </Table.Tr>
                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>20%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Cuối kỳ</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Câu 2: Lựa chọn và thực hiện kiểm định phù hợp</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                </Table.Tr>

                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}>CLO4</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Giữa kỳ</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Bài tập 2: Viết báo cáo nhỏ</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                </Table.Tr>

                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>30%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Cuối kỳ</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>Phần 3: Trình bày báo cáo dự án</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                </Table.Tr>

                                <Table.Tr style={{ border: "1px solid black" }}>
                                    <Table.Td style={{ border: "1px solid black" }}>Tổng</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>100%</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                        <CustomFlexEnd>
                            <CustomFlexColumn>
                                <Text ta={'center'}>TP.HCM, ngày 23 tháng 4 năm 2025</Text>
                                <Text ta={'center'}>Người lập biểu</Text>
                            </CustomFlexColumn>
                        </CustomFlexEnd>
                    </CustomFlexColumn>
                </CustomButtonPrintPDF>
            )}
        />
    )
}


const data: I[] = [
    {
        clo: "CLO2",
        weight: 10,
        assessmentMethod: "Chuyên cần",
        assessmentName: "Bài tập 1: sử dụng Excel/SPSS",
        maxPoint: 5,
    },
    {
        clo: "CLO2",
        weight: 10,
        assessmentMethod: "Cuối kỳ",
        assessmentName: "Phần 1: Chạy mô hình và xuất kết quả",
        maxPoint: 5,
    },
    {
        clo: "CLO3",
        weight: 10,
        assessmentMethod: "Chuyên cần",
        assessmentName: "Phần 2: Phân tích và biện luận kết quả",
        maxPoint: 5,
    },
    {
        clo: "CLO3",
        weight: 10,
        assessmentMethod: "Chuyên cần",
        assessmentName: "Câu 1: đọc và giải thích Input có sẵn",
        maxPoint: 5,
    },
    {
        clo: "CLO3",
        weight: 20,
        assessmentMethod: "Cuối kỳ",
        assessmentName: "Câu 2: Lựa chọn và thực hiện kiểm định phù hợp",
        maxPoint: 5,
    },
    {
        clo: "CLO4",
        weight: 10,
        assessmentMethod: "Giữa kỳ",
        assessmentName: "Bài tập 2: viết báo cáo nhỏ",
        maxPoint: 5,
    },
    {
        clo: "CLO4",
        weight: 30,
        assessmentMethod: "Cuối kỳ",
        assessmentName: "Phần 3: Trình bày báo cáo dự án",
        maxPoint: 5,
    },
];