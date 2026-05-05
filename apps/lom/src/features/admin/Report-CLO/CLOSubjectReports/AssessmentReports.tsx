import { ICOEStudentInfoRes } from "@/api/services/service_account";
import { IStudentReportRes } from "@/api/services/service_COECourseSectionStudent";
import { enumLabel_formulaType } from "@/data/enum/enum_formulaType";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box, Table, Text } from "@mantine/core";
import { IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces";

interface Props {
    selectedStudentData: IStudentInfoViewModel;
    selectedCourseSectionStudent: any;
    studentInfoQuery: ICOEStudentInfoRes;
    StudentReportData: ReturnType<typeof useCustomReactQuery<IStudentReportRes[], Error>>;
}

export default function AssessmentReports({
    selectedStudentData,
    selectedCourseSectionStudent,
    studentInfoQuery,
    StudentReportData,
}: Props) {
    const data = StudentReportData.data?.[0];

    const groupedByFormula = data?.studentPoints?.reduce(
        (acc, point) => {
            const formula = point.formulaType;
            if (typeof formula === "undefined") return acc;
            if (!acc[formula]) acc[formula] = [];
            acc[formula].push(point);
            return acc;
        },
        {} as Record<number, typeof data.studentPoints>
    );

    return (
        <Box style={{ alignSelf: "flex-start" }}>
            <CustomButtonPrintPDF
                buttonProps={{
                    children: ' In phiếu điểm theo thành phần đánh giá',
                    disabled: !selectedCourseSectionStudent
                }}>
                <CustomFlexColumn p={"lg"} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    <CustomFlexColumn ta={"center"} gap={2}>
                        <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                        <Text fw={"bold"} tt={"uppercase"} td={"underline"}>Trường đại học ABC</Text>
                    </CustomFlexColumn>

                    <CustomFlexColumn ta={"center"} gap={2}>
                        <Text fw={"bold"} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                        <Text fw={"bold"} tt={"uppercase"} fs={"normal"}>Toàn môn học</Text>
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

                    <Text>
                        Môn: {selectedCourseSectionStudent?.coeCourseSection?.coeGradeSubject?.coeSubject?.name || ''}
                    </Text>

                    <Table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid black" }}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={{ border: "1px solid black" }}>Thành phần đánh giá</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Trọng số</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>CLO được đo lường</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Bài đánh giá sử dụng</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Điểm tối đa</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Điểm</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {Object.entries(groupedByFormula ?? {}).map(([formulaType, points]) => {
                                return points.map((point, idx) => (
                                    <Table.Tr key={`${formulaType}-${idx}`}>
                                        {idx === 0 && (
                                            <>
                                                <Table.Td
                                                    style={{ border: "1px solid black" }}
                                                    rowSpan={points.length}>
                                                    {enumLabel_formulaType[Number(formulaType) as keyof typeof enumLabel_formulaType]
                                                        || 'Không xác định'}
                                                </Table.Td>

                                            </>
                                        )}
                                        {idx !== 0 && <><Table.Td style={{ display: "none" }} /><Table.Td style={{ display: "none" }} /></>}
                                        <Table.Td style={{ border: "1px solid black" }}>{point.densityMethodCLO}%</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{point.cloCode}</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{point.assessmentName}</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{point.medthodMaxPoint}</Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>{String(point.point)}</Table.Td>
                                    </Table.Tr>
                                ));
                            })}
                        </Table.Tbody>
                    </Table>

                    <Text>Mức đạt CLO môn học: {data?.gradeSubjectPointResult?.toFixed(2)}</Text>

                    <CustomFlexEnd>
                        <CustomFlexColumn>
                            <Text ta={"center"}>TP.HCM, ngày 23 tháng 4 năm 2025</Text>
                            <Text ta={"center"}>Người lập biểu</Text>
                        </CustomFlexColumn>
                    </CustomFlexEnd>
                </CustomFlexColumn>
            </CustomButtonPrintPDF>
        </Box>
    );
}
