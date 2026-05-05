import { CustomButtonPrintPDF, CustomButtonPrintPDFProps } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { Group, Stack, Table, Text } from "@mantine/core";

interface ITableData {
    cloCode?: string
    desciptionClo?: string
    passingThreshold?: number,
    measuredResult?: number
    cloEvaluation?: boolean
}

interface Shared_PrintScoreReportProps {
    subjectName?: string
    studentName?: string,
    studentId?: string
    gradeName?: string
    departmentName?: string
    program?: string
    CustomButtonPrintPDFProps?: CustomButtonPrintPDFProps
    tableData?: ITableData[]
}

export default function Shared_PrintScoreReport(props: Shared_PrintScoreReportProps) {
    return (
        <CustomButtonPrintPDF {...props.CustomButtonPrintPDFProps}>
            <Stack>
                <Stack ta={'center'} gap={2}>
                    <Text tt={"uppercase"}>Phòng quản lý đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                </Stack>
                <Stack ta={'center'} gap={2}>
                    <Text fw={'bold'} tt={"uppercase"}>BÁO CÁO KẾT QUẢ ĐO LƯỜNG CHUẨN ĐẦU RA HỌC PHẦN</Text>
                </Stack>
                <Text>Học phần: {props.subjectName}</Text>
                <Group>
                    <Text>Sinh viên: {props.studentName} </Text>
                    <Text>Mã số SV: {props.studentId} </Text>
                    <Text>Khóa: {props.gradeName}</Text>
                </Group>

                <Group>
                    <Text>Khoa: {props.departmentName} </Text>
                    <Text>CTĐT/Ngành: {props.program} </Text>
                </Group>


                <Table className="my-bordered-table">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>STT</Table.Th>
                            <Table.Th>CLO</Table.Th>
                            <Table.Th>Mô tả CLO</Table.Th>
                            <Table.Th>Ngưỡng đạt</Table.Th>
                            <Table.Th>Kết quả đo lường</Table.Th>
                            <Table.Th>Đánh giá CLO</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {props.tableData?.map((item, idx) => (
                            <Table.Tr key={idx}>
                                <Table.Td>{idx + 1}</Table.Td>
                                <Table.Td>{item.cloCode}</Table.Td>
                                <Table.Td>{item.desciptionClo}</Table.Td>
                                <Table.Td>{item.passingThreshold}%</Table.Td>
                                <Table.Td>{item.measuredResult}%</Table.Td>
                                <Table.Td>{item.cloEvaluation == true ? "Đạt" : "Không đạt"}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                <CustomFlexEnd>
                    <Stack>
                        <Text>TP.HCM, ngày 22 tháng 04 năm 2025</Text>
                        <Text ta={"center"}>Người lập biểu</Text>
                    </Stack>
                </CustomFlexEnd>
            </Stack>
        </CustomButtonPrintPDF>
    )
}
