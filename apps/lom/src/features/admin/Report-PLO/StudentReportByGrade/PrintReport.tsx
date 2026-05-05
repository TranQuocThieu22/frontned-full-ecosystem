import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Group, Table, Text } from "@mantine/core";
import React from "react";
import { Shared_ScoreSheetTemplateProps } from "../../Report-CLO/CLOAssessmentReport/Shared_ScoreSheetTemplate";
import { IPLOByGradeViewModel, IStudentReportViewModel } from "./Interfaces/Interface";

interface Feat_PrintReportProps extends Shared_ScoreSheetTemplateProps {
    disable?: boolean
}

interface IPrintReportProps {
    disabled?: boolean;
    PLOdata: IPLOByGradeViewModel[];
    reportData: IStudentReportViewModel[];
    programInfo: any;
    gradeInfo: any;
}

export default function PrintReport({ disabled, PLOdata, reportData, programInfo, gradeInfo }: IPrintReportProps) {
    return (
        <CustomButtonPrintPDF
            useReactToPrintProps={{
                pageStyle: '@page { size: landscape; }',
            }}
            buttonProps={{ children: "In kết quả đo lường PLO", disabled: disabled }}
        >

            <CustomFlexColumn ta={'left'} gap={2}>
                <Text fw={'bold'} fz={16} tt={"uppercase"}>Trường đại học XXXX</Text>
                <Text fw={'400'} fz={14}>{programInfo.coeUnit?.name ?? "Không có dữ liệu"}</Text>
            </CustomFlexColumn>

            <CustomFlexColumn mt={18} ta={'center'} gap={2}>
                <Text fw={'bold'} tt={"uppercase"}>{"Báo cáo tổng hợp kết quả đo lường chuẩn đầu ra"}</Text>
                <Text fw={'bold'} tt={"uppercase"}>{"Chương trình đào tạo"}</Text>
            </CustomFlexColumn>

            <CustomFlexColumn mt={18} gap={6}>
                <Group>
                    <Text>Khóa: {gradeInfo.name ?? "Không có dữ liệu"}</Text>
                </Group>
                <Group>
                    <Text>Khoa: {programInfo.coeUnit?.name ?? "Không có dữ liệu"}</Text>
                    <Text>CTĐT/Ngành: {programInfo.name ?? "Không có dữ liệu"}</Text>
                </Group>

            </CustomFlexColumn >

            <Table mt={18} style={{ border: "1px solid black" }}>
                <Table.Thead style={{ border: "1px solid black" }}>
                    <Table.Tr style={{ border: "1px solid black" }}>
                        <Table.Th rowSpan={3} style={{ border: "1px solid black" }}>STT</Table.Th>
                        <Table.Th rowSpan={3} style={{ border: "1px solid black" }}>MÃ SV</Table.Th>
                        <Table.Th rowSpan={3} style={{ border: "1px solid black" }}>HỌ VÀ TÊN</Table.Th>

                        {/* Prototype section */}
                        {/* <Table.Th colSpan={2} rowSpan={1} style={{ border: "1px solid black" }}>PLO1</Table.Th>
                        <Table.Th colSpan={2} rowSpan={1} style={{ border: "1px solid black" }}>PLO2</Table.Th>
                        <Table.Th colSpan={2} rowSpan={1} style={{ border: "1px solid black" }}>PLO3</Table.Th>
                        <Table.Th colSpan={2} rowSpan={1} style={{ border: "1px solid black" }}>PLO4</Table.Th>
                        <Table.Th colSpan={2} rowSpan={1} style={{ border: "1px solid black" }}>PLO5</Table.Th> */}
                        {
                            PLOdata.map((plo: any, index: number) => (
                                <React.Fragment key={plo.id}>
                                    <Table.Th colSpan={2} rowSpan={1} style={{ border: "1px solid black" }}>{plo.code ?? "Không có dữ liệu"}</Table.Th>
                                </React.Fragment>
                            ))
                        }
                    </Table.Tr>
                    <Table.Tr style={{ border: "1px solid black" }}>
                        {/* Prototype section */}
                        {/* <Table.Th colSpan={2} style={{ border: "1px solid black" }}>NGƯỠNG ĐẠT: 70%</Table.Th>
                        <Table.Th colSpan={2} style={{ border: "1px solid black" }}>NGƯỠNG ĐẠT: 60%</Table.Th>
                        <Table.Th colSpan={2} style={{ border: "1px solid black" }}>NGƯỠNG ĐẠT: 70%</Table.Th>
                        <Table.Th colSpan={2} style={{ border: "1px solid black" }}>NGƯỠNG ĐẠT: 80%</Table.Th>
                        <Table.Th colSpan={2} style={{ border: "1px solid black" }}>NGƯỠNG ĐẠT: 70%</Table.Th> */}
                        {
                            PLOdata.map((plo: any, index: number) => (
                                <React.Fragment key={plo.id}>
                                    {/* <Table.Th colSpan={1} rowSpan={1} style={{ border: "1px solid black" }}>Tỉ trọng: {plo.densityPLO ? `${plo.densityPLO}%` : "Không có dữ liệu"}</Table.Th> */}
                                    <Table.Th colSpan={2} rowSpan={1} style={{ border: "1px solid black" }}>NGƯỠNG ĐẠT: {plo.passedDensity ? `${plo.passedDensity}%` : "Không có dữ liệu"}</Table.Th>
                                </React.Fragment>
                            ))
                        }
                    </Table.Tr>
                    <Table.Tr style={{ border: "1px solid black" }}>
                        {
                            PLOdata.map((plo: any, index: number) => (
                                <React.Fragment key={plo.id}>
                                    <Table.Th style={{ border: "1px solid black" }}>KQĐL</Table.Th>
                                    <Table.Th style={{ border: "1px solid black" }}>ĐÁNH GIÁ</Table.Th>
                                </React.Fragment>
                            ))
                        }
                        {/* Prototype section */}
                        {/* <Table.Th style={{ border: "1px solid black" }}>KQĐL</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>ĐÁNH GIÁ</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>KQĐL</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>ĐÁNH GIÁ</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>KQĐL</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>ĐÁNH GIÁ</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>KQĐL</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>ĐÁNH GIÁ</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>KQĐL</Table.Th>
                        <Table.Th style={{ border: "1px solid black" }}>ĐÁNH GIÁ</Table.Th> */}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody style={{ border: "1px solid black" }}>
                    {reportData.map((studentPLOResult: any, index: any) => (
                        <React.Fragment key={index}>
                            <Table.Tr key={studentPLOResult.studentId} style={{ border: "1px solid black" }}>
                                <Table.Td style={{ border: "1px solid black" }}>{index}</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>{studentPLOResult.studentId}</Table.Td>
                                <Table.Td style={{ border: "1px solid black" }}>{studentPLOResult.studentName}</Table.Td>
                                {studentPLOResult.studentPLOResults.flatMap((plo: any, idx: number) => [
                                    <Table.Td key={`${idx}-result`} style={{ border: "1px solid black" }}>{plo.ploResult ? (plo.ploResult * 10).toFixed(2) : 0}%</Table.Td>,
                                    <Table.Td key={`${idx}-isPass`} style={{ border: "1px solid black" }}>{plo.isPassed ? 'Đạt' : 'Chưa đạt'}</Table.Td>
                                ])}
                            </Table.Tr>
                        </React.Fragment>
                    ))}
                </Table.Tbody>
            </Table>
        </CustomButtonPrintPDF>
    )
}
