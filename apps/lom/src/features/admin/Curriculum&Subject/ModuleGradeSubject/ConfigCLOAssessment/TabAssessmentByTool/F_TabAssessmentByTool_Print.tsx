
import { CustomButtonPrintPDF } from '@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF'
import { CustomFlexColumn } from '@aq-fe/core-ui/shared/components/layout/CustomFlexColumn'
import { Table, Text } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useS_ConfigCLOAssessment } from '../Hooks/useS_ConfigCLOAssessment'
import { IGSFormula } from '../TabFormula/Interfaces'
import { ICOERubric, IGSMethodWithRubrics } from './Interfaces'
enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}
export default function F_TabAssessmentByTool_Print({
    values,
    formulaValues
}: {
    formulaValues?: IGSFormula
    values: IGSMethodWithRubrics[]
}) {
    const store = useS_ConfigCLOAssessment()
    const queryClient = useQueryClient()

    if (values == undefined) return
    return (
        <CustomButtonPrintPDF  >
            <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                </CustomFlexColumn>
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text fw={'bold'} tt={"uppercase"}>Chuẩn đầu ra môn học</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Chương trình: {store.state.programName}</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Môn: {store.state.coeSubjectName}</Text>
                    <Text fw={'bold'}>RUBRICS (bảng tiêu chí đánh giá)</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Thành phân điểm: {formulaType[formulaValues?.formulaType!]}</Text>
                </CustomFlexColumn>


                {/* Table */}
                <Table style={{ border: "1px solid black", fontSize: 13 }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th rowSpan={3} style={{ border: "1px solid black", textAlign: "center" }}>Thành phần đánh giá</Table.Th>
                            <Table.Th rowSpan={3} style={{ border: "1px solid black", textAlign: "center" }}>Bài đánh giá</Table.Th>
                            <Table.Th rowSpan={3} style={{ border: "1px solid black", textAlign: "center" }}>CĐR môn học</Table.Th>
                            <Table.Th colSpan={5} style={{ border: "1px solid black", textAlign: "center" }}>Mức độ đánh giá</Table.Th>
                            <Table.Th rowSpan={3} style={{ border: "1px solid black", textAlign: "center" }}>Tỷ lệ</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            {queryClient.getQueryData<ICOERubric[]>(["AllRubrics"])?.map((item, idx) => (
                                <Table.Th key={idx} style={{ border: "1px solid black", textAlign: "center" }}>{item.name}</Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {values.map((item, idx) => (
                            <Table.Tr key={idx}>
                                <Table.Td rowSpan={1} style={{ border: "1px solid black", textAlign: "center", verticalAlign: "middle" }}>{formulaType[formulaValues?.formulaType!]}</Table.Td>
                                <Table.Td rowSpan={1} style={{ border: "1px solid black", textAlign: "center", verticalAlign: "middle" }}>{item.coeSubjectAssessment?.content}</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>
                                    {item.coeclo?.code} {item.coeclo?.name}
                                </Table.Td>
                                { }
                                {queryClient.getQueryData<ICOERubric[]>(["AllRubrics"])?.map((rubricsItem, idx) => (
                                    <Table.Td key={idx} style={{ border: "1px solid black" }}>
                                        {item.coeSubjectMethodRubrics?.find(item => item.coeRubricsMethodId == rubricsItem.id)?.content}
                                    </Table.Td>
                                ))}
                                <Table.Td
                                    rowSpan={1}
                                    style={{ border: "1px solid black", textAlign: "center", verticalAlign: "middle" }}>
                                    {store.state.currentFormulaPercent}
                                </Table.Td>
                            </Table.Tr>
                        ))}
                        <Table.Tr>
                            <Table.Td colSpan={8} style={{ border: "1px solid black", textAlign: "center", fontWeight: "bold" }}>Tổng cộng</Table.Td>
                            <Table.Td style={{ border: "1px solid black", textAlign: "center", fontWeight: "bold" }}>
                                {store.state.currentFormulaPercent! * values.length}%
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </CustomFlexColumn>
        </CustomButtonPrintPDF>

    )
}
