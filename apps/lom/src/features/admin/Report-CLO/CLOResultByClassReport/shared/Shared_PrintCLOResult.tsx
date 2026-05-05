import { CustomButtonPrintPDF, CustomButtonPrintPDFProps } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { Group, Stack, Table, Text } from "@mantine/core";

interface ITableData {
    clo?: string, // Tên clo
    cloDescription?: string, // Mô tả CLO
    passingThresholdPercent?: number, // Ngưỡng đạt
    studentPassCount?: number, // Số lượng sinh viên đạt
    studentPassPercent?: number,// Tỷ lệ sinh viên đạt
    studentFailCount?: number, // Số lượng sinh viên không đạt
    studentFailPercent?: number // Tỷ lệ sinh viên không đạt
}

interface IProps {
    subjectName?: string,
    class?: string,
    grade?: string,
    department?: string
    program?: string
    buttonPrintPDFProps?: CustomButtonPrintPDFProps
    tableData?: ITableData[]
}

export default function Shared_PrintCLOResult(props: IProps) {
    return (
        <CustomButtonPrintPDF
            {...props.buttonPrintPDFProps}
            buttonProps={{
                children: "In kết quả đo lường CLO",
                ...props.buttonPrintPDFProps?.buttonProps
            }}
        >
            <Stack>
                <Stack ta={'center'} gap={2}>
                    <Text tt={"uppercase"}>Phòng quản lý đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                </Stack>
                <Stack ta={'center'} gap={2}>
                    <Text fw={'bold'}>BÁO CÁO TỔNG HỢP KẾT QUẢ ĐO LƯỜNG CHUẨN ĐẦU RA HỌC PHẦN</Text>
                </Stack>
                <Stack>
                    <Text>Học phần: {props.subjectName}</Text>
                    <Group>
                        <Text>Lớp: {props.class}</Text>
                        <Text>Khóa: {props.grade}</Text>
                    </Group>
                    <Group>
                        <Text>Khoa: {props.class}</Text>
                        <Text>CTĐT/Ngành: {props.program}</Text>
                    </Group>
                </Stack>

                <Table className="my-bordered-table">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th rowSpan={3}>STT</Table.Th>
                            <Table.Th rowSpan={3}>CLO</Table.Th>
                            <Table.Th rowSpan={3}>MÔ TẢ CLO</Table.Th>
                            <Table.Th rowSpan={3}>NGƯỠNG ĐẠT</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th colSpan={2}>SLSV ĐẠT</Table.Th>
                            <Table.Th colSpan={2}>SLSV KHÔNG ĐẠT</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>SLSV</Table.Th>
                            <Table.Th>TỶ LỆ %</Table.Th>
                            <Table.Th>SLSV</Table.Th>
                            <Table.Th>TỶ LỆ %</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {props.tableData?.map((item, idx) => (
                            <Table.Tr key={idx}>
                                <Table.Td>{idx + 1}</Table.Td>
                                <Table.Td>{item.clo}</Table.Td>
                                <Table.Td>{item.cloDescription}</Table.Td>
                                <Table.Td>{item.passingThresholdPercent} %</Table.Td>
                                <Table.Td>{item.studentPassCount}</Table.Td>
                                <Table.Td>{item.studentPassPercent}</Table.Td>
                                <Table.Td>{item.studentFailCount}</Table.Td>
                                <Table.Td>{item.studentFailPercent}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Stack>
        </CustomButtonPrintPDF>
    )
}
