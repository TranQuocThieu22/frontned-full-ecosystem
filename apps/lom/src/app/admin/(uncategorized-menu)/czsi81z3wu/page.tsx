'use client'
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Paper, Select, Table, Text } from "@mantine/core";

export default function Page() {
    return (
        <CustomPageContent>
            <Paper p={'md'}>
                <CustomFlexColumn>
                    <MySelect searchable w={'400px'} label="Mã sinh viên" data={["SV000035", "SV000036", "SV000037"]} />
                    <Text>Họ tên: Tô Ngọc Lan</Text>
                    <Text>Chương trình: CKCT - Cơ khí chế tạo</Text>
                    <Text>Khóa: CKCT24</Text>
                    <Text>Lớp: KT2401</Text>
                    <Select searchable w={'400px'} label="Năm học cần in" data={['Năm học 2024 -2025']} />
                    <CustomFlexEnd>
                        <CustomButtonPrintPDF buttonProps={{ children: "In phiếu điểm" }}>
                            <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                                </CustomFlexColumn>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text fw={'bold'} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                                    <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>Năm học 2024 - 2025</Text>
                                </CustomFlexColumn>
                                <CustomFlexRow>
                                    <Text>
                                        Họ tên: Tô Ngọc Lan
                                    </Text>
                                    <Text>
                                        Họ tên: Ngày sinh: 10/02/1997
                                    </Text>
                                    <Text>
                                        Giới tính: Nữ
                                    </Text>
                                </CustomFlexRow>
                                <Text>
                                    Chương trình: Kế toán doanh nghiệp
                                </Text>
                                <CustomFlexRow>
                                    <Text>
                                        Khóa: KT2401
                                    </Text>
                                    <Text>
                                        Lớp: K2401-01
                                    </Text>
                                </CustomFlexRow>
                                <Table style={{ border: "1px solid black" }}>
                                    <Table.Thead style={{ border: "1px solid black" }}>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Th style={{ border: "1px solid black" }}>STT</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>NHHK</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Mã môn học</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Tên môn học</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Điểm CLO</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>CLO không đạt</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody style={{ border: "1px solid black" }}>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2024-1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>MH001</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Nguyên lý kế toán</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>7</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2024-1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>MH002</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Kế toán tài chính</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>7</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>3</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2024-1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>MH003</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Kế toán ngân hàng thương mại</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>6</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO1</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>4</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2024-1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>MH004</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Kinh tế vĩ mô</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>7</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2024-2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>MH005</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Kinh tế vĩ mô</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>7</Table.Td>
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

                    </CustomFlexEnd>
                </CustomFlexColumn>
            </Paper>
        </CustomPageContent>
    )
}
