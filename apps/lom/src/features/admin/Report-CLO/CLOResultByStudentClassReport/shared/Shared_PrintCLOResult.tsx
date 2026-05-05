import { CustomButtonPrintPDF, CustomButtonPrintPDFProps } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { Group, Stack, Table, Text } from "@mantine/core";
import React from "react";

export interface CLOResult {
    clo: string;
    threshold: number;
    result: string;
    evaluation: string;
}

export interface ITableData {
    studentCode: string;
    fullName: string;
    clos: CLOResult[];
}

interface IProps {
    subjectName?: string;
    class?: string;
    grade?: string;
    department?: string;
    program?: string;
    buttonPrintPDFProps?: CustomButtonPrintPDFProps;
    tableData?: ITableData[];
}

export default function Shared_PrintCLOResult(props: IProps) {
    // Lấy danh sách CLO chuẩn từ sinh viên đầu tiên
    const cloHeaders = props.tableData?.[0]?.clos ?? [];

    return (
        <CustomButtonPrintPDF
            {...props.buttonPrintPDFProps}
            buttonProps={{
                children: "In kết quả đo lường CLO",
                ...props.buttonPrintPDFProps?.buttonProps,
            }}
        >
            <Stack>
                <Stack ta="center" gap={2}>
                    <Text tt="uppercase">Phòng quản lý đào tạo</Text>
                    <Text fw="bold" tt="uppercase">
                        Trường đại học ABC
                    </Text>
                </Stack>
                <Stack ta="center" gap={2}>
                    <Text fw="bold">BÁO CÁO TỔNG HỢP KẾT QUẢ ĐO LƯỜNG CHUẨN ĐẦU RA HỌC PHẦN</Text>
                </Stack>
                <Stack>
                    <Text>Học phần: {props.subjectName}</Text>
                    <Group>
                        <Text>Lớp: {props.class}</Text>
                        <Text>Khóa: {props.grade}</Text>
                    </Group>
                    <Group>
                        <Text>Khoa: {props.department}</Text>
                        <Text>CTĐT/Ngành: {props.program}</Text>
                    </Group>
                </Stack>

                <Table className="my-bordered-table">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th rowSpan={3}>STT</Table.Th>
                            <Table.Th rowSpan={3}>MASV</Table.Th>
                            <Table.Th rowSpan={3}>HỌ VÀ TÊN</Table.Th>
                            {cloHeaders.map((clo, index) => (
                                <Table.Th key={index} colSpan={2}>
                                    {clo.clo}
                                </Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr>
                            {cloHeaders.map((clo, index) => (
                                <Table.Th key={index} colSpan={2}>
                                    NGƯỠNG ĐẠT {clo.threshold}%
                                </Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr>
                            {cloHeaders.map((_, index) => (
                                <React.Fragment key={index}>
                                    <Table.Th>KQĐL</Table.Th>
                                    <Table.Th>ĐÁNH GIÁ</Table.Th>
                                </React.Fragment>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {props.tableData?.map((student, rowIdx) => (
                            <Table.Tr key={rowIdx}>
                                <Table.Td>{rowIdx + 1}</Table.Td>
                                <Table.Td>{student.studentCode}</Table.Td>
                                <Table.Td>{student.fullName}</Table.Td>
                                {cloHeaders.map((clo, cloIdx) => {
                                    const actualCLO = student.clos.find((c) => c.clo === clo.clo);
                                    return (
                                        <React.Fragment key={cloIdx}>
                                            <Table.Td>{actualCLO?.result ?? ""}</Table.Td>
                                            <Table.Td>{actualCLO?.evaluation ?? ""}</Table.Td>
                                        </React.Fragment>
                                    );
                                })}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Stack>
        </CustomButtonPrintPDF>
    );
}
