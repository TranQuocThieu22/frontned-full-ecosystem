'use client'
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Paper, Table, Text } from "@mantine/core";

export default function Page() {
    return (
        <CustomPageContent>
            <Paper p={'md'}>
                <CustomFlexColumn>
                    <MySelect w={'400px'} searchable label="Mã sinh viên" data={["SV000035", "SV000036", "SV000037"]} />
                    <Text>Họ tên: Tô Ngọc Lan</Text>
                    <Text>Chương trình: CKCT - Cơ khí chế tạo</Text>
                    <Text>Khóa: CKCT24</Text>
                    <Text>Lớp: KT2401</Text>
                    <MySelect w={'400px'} searchable label="Môn học" data={['MH0012 - Chế tạo máy - Nhóm: 02']} />
                    <MySelect w={'400px'} searchable label="Hình thức đánh giá" data={['CK - Cuối kỳ']} />
                    <CustomFlexEnd>
                        <CustomButtonPrintPDF >
                            <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                                </CustomFlexColumn>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text fw={'bold'} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                                    <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>Thành phần: Quá trình </Text>
                                </CustomFlexColumn>
                                <CustomFlexRow>
                                    <Text>
                                        Họ tên: Tô Ngọc Lan
                                    </Text>
                                    <Text>
                                        Ngày sinh: 10/02/1997
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
                                <Text>
                                    Môn: Kế toán ngân hàng thương mại
                                </Text>
                                <Table style={{ border: "1px solid black" }}>
                                    <Table.Thead style={{ border: "1px solid black" }}>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Th style={{ border: "1px solid black" }}>STT</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Mã CĐR</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Chuẩn đầu ra môn học</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Điểm tối đa</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Điểm đạt được</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Quy đổi hệ 10</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody style={{ border: "1px solid black" }}>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Phát triển lập trình và tư duy thuật toán</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>1.5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>7.5</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>1</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Hiểu và vận hành hệ thống mạng máy tính</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>1.5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>7.5</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>3</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO3</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Xây dựng và phát triển phần mềm theo mô hình hiện đại</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>1.5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>4</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO4</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Cung cấp kiến thức toán học làm nền tảng cho CNTT</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>1.5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                                <Text>Mức đạt CLO thành phần: 6.25</Text>
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
