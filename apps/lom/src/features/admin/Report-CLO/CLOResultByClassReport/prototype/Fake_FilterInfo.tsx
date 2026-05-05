import { service_account } from "@/api/services/service_account";
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent";
import { enum_formulaType } from "@/data/enum/enum_formulaType";
import { Account } from "@/interfaces/shared-interfaces/Account";
import { COESubject } from "@/interfaces/shared-interfaces/COESubject";
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Flex, Group, Paper, Select, Space, Table, Text } from "@mantine/core";
import { IconSelect } from "@tabler/icons-react";
import { useState } from "react";
import Fake_PrintReport from "./Fake_PrintReport";

export default function Fake_FilterInfo() {
    const studentIdState = useState<string | null>()
    const studentObjectState = useState<Account>()
    const courseSectionState = useState<COESubject | undefined>()
    const formulaTypeState = useState<string | null>(enum_formulaType.attendace.toString())
    const studentReportQuery = useCustomReactQuery({
        queryKey: ["studentReport", studentIdState[0], courseSectionState[0]?.coeCourseSection?.id, formulaTypeState[0]],
        axiosFn: () => service_COECourseSectionStudent.getStudentReport({
            studentId: parseInt(studentIdState[0]!),
            courseSectionId: courseSectionState[0]?.coeCourseSection?.id,
            formulaType: parseInt(formulaTypeState[0]!)
        }),
        options: {
            enabled: !!studentIdState[0] && !!formulaTypeState[0] && !!courseSectionState[0]
        }
    })
    const studentInfoQuery = useCustomReactQuery({
        queryKey: ['studentInfo', studentIdState[0]],
        axiosFn: () => {
            return service_account.getCOEStudentInfo({ studentId: parseInt(studentIdState[0]!) })
        },
        options: {
            enabled: !!studentIdState[0]
        }
    })
    return (
        <Flex direction={"column"}>
            <Paper p={'md'}>
                <CustomFlexIconTitle icon={<IconSelect className="h-5 w-5 text-blue-600 dark:text-blue-400" />}>
                    Chọn đối tượng cần in
                </CustomFlexIconTitle>
                <Space />
                <Group grow>
                    <Select
                        label="Chương trình"
                        placeholder="Sinh viên chưa thuộc chương trình!"
                        readOnly
                        data={['Kế toán']}
                        defaultValue={'Kế toán'}
                    />
                    <Select
                        label="Khóa"
                        placeholder="Sinh viên chưa thuộc Khóa!"
                        data={['Kế toán 2024']}
                        defaultValue={'Kế toán 2024'}
                    />
                    <Select
                        label="Lớp"
                        placeholder="Sinh viên chưa thuộc lớp!"
                        data={['K240101']}
                        defaultValue={'K240101'}
                    />
                    <Select
                        label="Môn học"
                        placeholder="Sinh viên chưa thuộc lớp!"
                        data={['Nguyên lý kế toán']}
                        defaultValue={'Nguyên lý kế toán'}
                    />
                </Group>
                <Space />
                <Fake_PrintReport
                    addressTitle={<Text tt={"uppercase"}>Phòng quản lý đào tạo</Text>}
                    title="Báo cáo kết quả đo lường chuẩn đầu ra học phần"
                >
                    <CustomFlexColumn>
                        <Text>Học phần: QUẢN TRỊ HỌC</Text>
                        <Group>
                            <Text>Lớp: xxxxx</Text>
                            <Text>Khóa: 2021-2025</Text>
                        </Group>
                        <Group>
                            <Text>Khoa quản trị kinh doanh</Text>
                            <Text>CTĐT/Ngành quản trị kinh doanh</Text>
                        </Group>

                    </CustomFlexColumn>
                    <Table style={{ border: "1px solid black" }}>
                        <Table.Thead style={{ border: "1px solid black" }}>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Th rowSpan={2} style={{ border: "1px solid black" }}>STT</Table.Th>
                                <Table.Th rowSpan={2} style={{ border: "1px solid black" }}>CLO</Table.Th>
                                <Table.Th rowSpan={2} style={{ border: "1px solid black" }}>MÔ TẢ CLO</Table.Th>
                                <Table.Th rowSpan={2} style={{ border: "1px solid black" }}>NGƯỠNG ĐẠT</Table.Th>
                                <Table.Th colSpan={2} style={{ border: "1px solid black" }}>SLSV ĐẠT</Table.Th>
                                <Table.Th colSpan={2} style={{ border: "1px solid black" }}>SLSV KHÔNG ĐẠT</Table.Th>
                            </Table.Tr>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Th style={{ border: "1px solid black" }}>SLSV</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>TỶ LỆ %</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>SLSV</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>TỶ LỆ %</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody style={{ border: "1px solid black" }}>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Td style={{ border: "1px solid black" }}>1</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>CLO1</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>Vận dụng kiến thức cơ bản vào thực tiễn</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>60%</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>85</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>85%</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>15</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>15%</Table.Td>
                            </Table.Tr>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Td style={{ border: "1px solid black" }}>2</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>CLO2</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>Phân tích tình huống và đưa ra giải pháp phù hợp</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>65%</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>80</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>80%</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>20</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>20%</Table.Td>
                            </Table.Tr>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Td style={{ border: "1px solid black" }}>3</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>CLO3</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>Làm việc nhóm hiệu quả và có trách nhiệm</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>70%</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>90</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>90%</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>10</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                            </Table.Tr>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}><strong>Tổng cộng</strong></Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>255</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>85%</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>45</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>15%</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Fake_PrintReport>
            </Paper>
        </Flex>
    )
}
