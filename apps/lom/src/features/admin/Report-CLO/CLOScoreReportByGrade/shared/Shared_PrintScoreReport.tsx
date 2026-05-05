import { CustomButtonPrintPDF, CustomButtonPrintPDFProps } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group, Stack, Table, Text } from "@mantine/core";

interface ITableData {
    yearCode?: string
    subjectCode?: string
    subjectName?: string,
    cloPoint?: number
    cloNotPassCode?: string
}

interface Shared_PrintScoreReportProps {
    studentName?: string,
    dateOfBirth?: string,
    gender?: genderEnum,
    program?: string,
    grade?: string,
    class?: string
    CustomButtonPrintPDFProps?: CustomButtonPrintPDFProps
    tableData?: ITableData[]
}

export default function Shared_PrintScoreReport(props: Shared_PrintScoreReportProps) {
    return (
        <CustomButtonPrintPDF {...props.CustomButtonPrintPDFProps}>
            <Stack>
                <Stack ta={'center'} gap={2}>
                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                </Stack>
                <Stack ta={'center'} gap={2}>
                    <Text fw={'bold'} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                    <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>Toàn khóa</Text>
                </Stack>
                <Group>
                    <Text>Họ tên: {props.studentName} </Text>
                    <Text>Ngày sinh: {dateUtils.toDDMMYYYY(props.dateOfBirth)} </Text>
                    <Text>Giới tính: {genderLabel[props.gender as genderEnum] ?? ""}</Text>

                </Group>

                <Text>Chương trình: {props.program}</Text>
                <Group>
                    <Text>Khóa: {props.grade}</Text>
                    <Text>Lớp: {props.class}</Text>
                </Group>
                <Table className="my-bordered-table">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>STT</Table.Th>
                            <Table.Th>NNHK</Table.Th>
                            <Table.Th>Mã môn học</Table.Th>
                            <Table.Th>Tên môn học</Table.Th>
                            <Table.Th>Điểm CLO</Table.Th>
                            <Table.Th>CLO không đạt</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {props.tableData?.map((item, idx) => (
                            <Table.Tr key={idx}>
                                <Table.Td>{idx + 1}</Table.Td>
                                <Table.Td>{item.yearCode}</Table.Td>
                                <Table.Td>{item.subjectCode}</Table.Td>
                                <Table.Td>{item.subjectName}</Table.Td>
                                <Table.Td>{item.cloPoint}</Table.Td>
                                <Table.Td>{item.cloNotPassCode}</Table.Td>
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
