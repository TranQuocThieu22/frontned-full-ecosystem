import { ICOEStudentInfoRes } from "@/api/services/service_account";
import { IStudentReportRes } from "@/api/services/service_COECourseSectionStudent";
import { COESemester } from "@/interfaces/shared-interfaces/COESemester";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box, Table, Text } from "@mantine/core";
import { IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces";

interface Props {
    selectedStudentData: IStudentInfoViewModel,
    selectedSemester: COESemester,
    studentInfoQuery: ICOEStudentInfoRes,
    StudentReportData: ReturnType<typeof useCustomReactQuery<IStudentReportRes[], any>>
}

export default function SemesterReportPrint({
    selectedStudentData,
    selectedSemester,
    studentInfoQuery,
    StudentReportData
}: Props) {

    const processStudentReportData = (reportData: IStudentReportRes[]) => {
        if (!reportData || !Array.isArray(reportData) || reportData.length === 0) return [];

        return reportData.map((entry, index) => {
            const cloNotPassed = entry.studentCLOResults
                ?.filter(r => !r.isPassed)
                ?.map(r => r.cloCode)
                ?.join(', ') || '';

            return {
                stt: index + 1,
                subjectCode: entry.subjectCode ?? '',
                subjectName: entry.subjectName ?? '',
                cloScore: entry.gradeSubjectPointResult ?? 0,
                cloNotPassed
            };
        });
    };

    return (
        <Box style={{ alignSelf: 'flex-start' }}>
            <CustomButtonPrintPDF buttonProps={{
                children: "In phiếu điểm theo CLO"
            }}>
                <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                        <Text fw={'bold'} tt={"uppercase"} td={"underline"}>Trường đại học ABC</Text>
                    </CustomFlexColumn>
                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text fw={'bold'} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                        <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>{selectedSemester.name} </Text>
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
                                <Table.Th style={{ border: "1px solid black" }}>Mã môn học</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Tên môn học</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Điểm CLO</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>CLO không đạt</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody style={{ border: "1px solid black" }}>
                            {(() => {
                                if (StudentReportData.isLoading) {
                                    return (
                                        <Table.Tr>
                                            <Table.Td colSpan={5} style={{ textAlign: 'center' }}>Đang tải dữ liệu...</Table.Td>
                                        </Table.Tr>
                                    );
                                }

                                if (StudentReportData.error) {
                                    return (
                                        <Table.Tr>
                                            <Table.Td colSpan={5} style={{ textAlign: 'center' }}>Lỗi: {StudentReportData.error.message}</Table.Td>
                                        </Table.Tr>
                                    );
                                }

                                if (!StudentReportData.data) {
                                    return (
                                        <Table.Tr>
                                            <Table.Td colSpan={5} style={{ textAlign: 'center' }}>Chưa có dữ liệu</Table.Td>
                                        </Table.Tr>
                                    );
                                }

                                const processedData = processStudentReportData(StudentReportData.data);

                                if (processedData.length === 0) {
                                    return (
                                        <Table.Tr>
                                            <Table.Td colSpan={5} style={{ textAlign: 'center' }}>Không có dữ liệu để hiển thị</Table.Td>
                                        </Table.Tr>
                                    );
                                }

                                return processedData.map((row) => (
                                    <Table.Tr key={row.stt}>
                                        <Table.Td style={{ border: "1px solid black" }}>{row.stt}</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{row.subjectCode}</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{row.subjectName}</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{row.cloScore.toFixed(2)}</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{row.cloNotPassed}</Table.Td>
                                    </Table.Tr>
                                ));
                            })()}
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
