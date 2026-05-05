import { ICOEStudentInfoRes } from "@/api/services/service_account";
import { IStudentPLOResult, IStudentReportRes } from "@/api/services/service_COECourseSectionStudent";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box, Table, Text } from "@mantine/core";
import { IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces";

interface Props {
    selectedStudentData: IStudentInfoViewModel,
    studentInfoQuery: ICOEStudentInfoRes,
    StudentReportData: IStudentReportRes[]
}

export default function SemesterReportPrint({
    selectedStudentData,
    studentInfoQuery,
    StudentReportData
}: Props) {

    // const processStudentReportData = (reportData: IStudentReportRes[]) => {
    //     if (!reportData || !Array.isArray(reportData) || reportData.length === 0) return [];

    //     return reportData.flatMap((entry, index) => {
    //         return entry.studentPLOResults?.map((ploResult, ploIndex) => ({
    //             stt: index + 1,
    //             subjectCode: entry.subjectCode ?? '',
    //             subjectName: entry.subjectName ?? '',
    //             ploName: ploResult.ploName ?? '',
    //             ploCode: ploResult.ploCode ?? '',
    //             ploDescription: ploResult.ploDescription ?? '',
    //             ploPassedDensity: ploResult.ploPassedDensity ?? 0,
    //             ploResult: (ploResult.ploResult ?? 0) * 10,
    //             isPassed: ploResult.isPassed
    //         })) ?? [];
    //     });
    // };

    return (
        <Box style={{ alignSelf: 'flex-start' }}>
            <CustomButtonPrintPDF buttonProps={{ children: "In phiếu điểm PLO" }}>
                <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                        <Text fw={'bold'} tt={"uppercase"} td={"underline"}>Trường đại học ABC</Text>
                    </CustomFlexColumn>
                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text fw={'bold'} tt={"uppercase"}>Báo cáo kết quả đo lường chuẩn đầu chương trình đào tạo</Text>
                    </CustomFlexColumn>
                    <CustomFlexRow>
                        <Text>Họ tên: {selectedStudentData?.fullName}</Text>
                        <Text>Ngày sinh: {selectedStudentData?.dateOfBirth ? dateUtils.toDDMMYYYY(new Date(selectedStudentData.dateOfBirth)) : ""}</Text>
                        <Text>Giới tính: {Number(selectedStudentData?.gender) === 1 ? "Nam" : Number(selectedStudentData?.gender) === 2 ? "Nữ" : ""}</Text>
                    </CustomFlexRow>
                    <Text>Chương trình: {studentInfoQuery.coeProgramName}</Text>
                    <CustomFlexRow>
                        <Text>Khóa: {studentInfoQuery.coeGradeName}</Text>
                        <Text>Lớp: {studentInfoQuery.className}</Text>
                    </CustomFlexRow>

                    <Table style={{ border: "1px solid black" }}>
                        <Table.Thead style={{ border: "1px solid black" }}>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Th style={{ border: "1px solid black" }}>STT</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>PLO</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Mô tả chuẩn đầu ra (PLO)</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Ngưỡng đạt</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Kết quả đo lường</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Đánh giá PLO</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody style={{ border: "1px solid black" }}>
                            {
                                (StudentReportData.length === 0) ?
                                    <Table.Tr>
                                        <Table.Td colSpan={8} style={{ textAlign: 'center' }}>Không có dữ liệu để hiển thị</Table.Td>
                                    </Table.Tr>
                                    :
                                    StudentReportData && StudentReportData[0]?.studentPLOResults?.map((row: IStudentPLOResult, idx: number) => (
                                        <Table.Tr key={`${idx}`}>
                                            <Table.Td style={{ border: "1px solid black" }}>{idx + 1}</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>{row.ploCode}</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>{row.ploDescription}</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>{row.ploPassedDensity}%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>{row.ploResult ? (row.ploResult * 10).toFixed(2) : 0}%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>{row.isPassed ? "Đạt" : "Không đạt"}</Table.Td>
                                        </Table.Tr>
                                    ))
                            }
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
        </Box>
    );
}
