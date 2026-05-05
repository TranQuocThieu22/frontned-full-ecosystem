import Shared_ScoreSheetTemplate from "@/features/admin/Report-CLO/CLOAssessmentReport/Shared_ScoreSheetTemplate";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Group, Table } from "@mantine/core";
import { useS_ConfigCLOAssessment } from "../../Hooks/useS_ConfigCLOAssessment";

interface IData {
    cloName?: string;
    density?: number;
    formulaTypeName?: string;
    content?: string;
    maxScore?: number | string;
}

interface ViewCLOMatrixSummaryProps {
    data?: IData[];
}

export default function CLOMatrixSummaryTableShared({ data = [] }: ViewCLOMatrixSummaryProps) {
    // Nhóm dữ liệu theo cloName
    const store = useS_ConfigCLOAssessment()
    const groupedData = data.reduce<Record<string, IData[]>>((acc, row) => {
        const key = row.cloName ?? "__null__";
        acc[key] = acc[key] || [];
        acc[key].push(row);
        return acc;
    }, {});

    const totalDensity = data.reduce((sum, item) => sum + (item.density ?? 0), 0);
    function TableContent() {
        return (
            <Table
                withColumnBorders
                highlightOnHover
                striped
                horizontalSpacing="md"
                verticalSpacing="sm"
                style={{ border: "1px solid #ccc", borderCollapse: "collapse" }}
            >
                <Table.Thead
                    style={{
                        background: colorsObject.mantineBackgroundBlueLight,
                        color: colorsObject.mantineBackgroundPrimary,
                    }}
                >
                    <Table.Tr>
                        <Table.Th style={{ border: "1px solid #ccc" }}>CLO</Table.Th>
                        <Table.Th style={{ border: "1px solid #ccc" }}>Trọng số</Table.Th>
                        <Table.Th style={{ border: "1px solid #ccc" }}>Hình thức đánh giá</Table.Th>
                        <Table.Th style={{ border: "1px solid #ccc" }}>Bài đánh giá</Table.Th>
                        <Table.Th style={{ border: "1px solid #ccc" }}>Điểm tối đa</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {Object.entries(groupedData).map(([cloName, rows], groupIndex) =>
                        rows.map((row, rowIndex) => (
                            <Table.Tr key={`${groupIndex}-${rowIndex}`}>
                                {rowIndex === 0 && (
                                    <Table.Td rowSpan={rows.length} style={{ border: "1px solid #ccc" }}>
                                        {cloName === "__null__" ? "" : cloName}
                                    </Table.Td>
                                )}
                                <Table.Td style={{ border: "1px solid #ccc" }}>{row.density} %</Table.Td>
                                <Table.Td style={{ border: "1px solid #ccc" }}>{row.formulaTypeName}</Table.Td>
                                <Table.Td style={{ border: "1px solid #ccc" }}>{row.content}</Table.Td>
                                <Table.Td style={{ border: "1px solid #ccc" }}>{row.maxScore}</Table.Td>
                            </Table.Tr>
                        ))
                    )}
                </Table.Tbody>
                {/* <Table.Tfoot>
                    <Table.Tr>
                        <Table.Td style={{ border: "1px solid #ccc" }}><strong>Tổng:</strong></Table.Td>
                        <Table.Td style={{ border: "1px solid #ccc" }}><strong>{totalDensity} %</strong></Table.Td>
                        <Table.Td colSpan={3} style={{ border: "1px solid #ccc" }}></Table.Td>
                    </Table.Tr>
                </Table.Tfoot> */}
            </Table>
        )
    }
    return (
        <CustomFlexColumn>
            <Group>
                <CustomButtonPrintPDF>
                    <Shared_ScoreSheetTemplate
                        title="TỔNG HỢP ĐÁNH GIÁ CLO MÔN HỌC"
                        subjectName={store.state.coeSubjectName}
                        programName={store.state.programName}
                        gradeName={store.state.gradeName}
                    >
                        <TableContent />
                    </Shared_ScoreSheetTemplate>
                </CustomButtonPrintPDF>
            </Group>
            <TableContent />
        </CustomFlexColumn>
    );
}
