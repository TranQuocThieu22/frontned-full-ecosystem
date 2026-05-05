import { ICOEStudentInfoRes } from "@/api/services/service_account";
import { IStudentReportRes } from "@/api/services/service_COECourseSectionStudent";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box, Table, Text } from "@mantine/core";
import { IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces";

// Enum mappings
export enum enum_formulaType {
    attendace = 1,
    progress = 2,
    final = 3
}

export const enumLabel_formulaType: Record<enum_formulaType, string> = {
    [enum_formulaType.attendace]: "Chuyên cần",
    [enum_formulaType.progress]: "Quá trình",
    [enum_formulaType.final]: "Cuối kỳ"
};

interface Props {
    selectedStudentData: IStudentInfoViewModel;
    selectedCourseSectionStudent: any;
    studentInfoQuery: ICOEStudentInfoRes;
    StudentReportData: ReturnType<typeof useCustomReactQuery<IStudentReportRes[], any>>;
}

export default function SubjectReportPrint({
    selectedStudentData,
    selectedCourseSectionStudent,
    studentInfoQuery,
    StudentReportData
}: Props) {
    const processStudentReportData = (reportData: IStudentReportRes[]) => {
        if (!Array.isArray(reportData) || reportData.length === 0) {
            return { columns: [], rows: [] };
        }

        const { studentPoints, studentCLOResults } = reportData[0]!;

        if (!studentPoints || !studentCLOResults) {
            return { columns: [], rows: [] };
        }

        // Map final results for easy lookup
        const finalPointMap = new Map(studentCLOResults.map(r => [r.cloId, r.point]));

        // Extract dynamic columns
        const dynamicColumns = Array.from(
            new Map(
                studentPoints.map(p => [
                    `${p.formulaType}_${p.assessmentId}`,
                    {
                        formulaType: p.formulaType,
                        assessmentId: p.assessmentId,
                    }
                ])
            ).values()
        ).sort((a, b) => a.formulaType! - b.formulaType!);

        // Group student points by CLO
        const cloGroups = new Map<
            number,
            {
                cloId: number;
                cloCode: string;
                cloName: string;
                densityMethodCLO: number;
                pointsByFormulaAssessment: Record<string, number>;
            }
        >();

        for (const point of studentPoints) {
            if (!cloGroups.has(point.cloId || 0)) {
                cloGroups.set(
                    point.cloId || 0,
                    {
                        cloId: point.cloId || 0,
                        cloCode: point.cloCode || '',
                        cloName: point.cloName || '',
                        densityMethodCLO: point.densityMethodCLO || 0,
                        pointsByFormulaAssessment: {},
                    });

            }

            const group = cloGroups.get(point.cloId || 0)!;

            const key = `${point.formulaType}_${point.assessmentId}`;
            group.pointsByFormulaAssessment[key] = point.point10 || 0;
        }
        // Final columns: static + dynamic + final + average
        const columns = [
            { key: "stt", label: "STT" },
            { key: "cloCode", label: "Mã CĐR" },
            { key: "cloName", label: "Chuẩn đầu ra môn học" },
            { key: "densityMethodCLO", label: "Tỷ trọng" },
            ...dynamicColumns.map(({ formulaType, assessmentId }) => ({
                key: `${formulaType}_${assessmentId}`,
                label: `${enumLabel_formulaType[Number(formulaType) as enum_formulaType] || 'Không xác định'}`,
            })),
            { key: "average", label: "Trung bình" },
        ];

        // Build rows
        type RowType = {
            stt: number;
            cloCode: string;
            cloName: string;
            densityMethodCLO: string;
            finalPoint: string;
            average: string;
            [key: string]: string | number;
        };

        const rows: RowType[] = Array.from(cloGroups.values()).map((clo, index) => {
            const final = finalPointMap.get(clo.cloId);

            return {
                stt: index + 1,
                cloCode: clo.cloCode,
                cloName: clo.cloName.trim(),
                densityMethodCLO: `${clo.densityMethodCLO} % `,
                ...dynamicColumns.reduce((acc, col) => {
                    const key = `${col.formulaType}_${col.assessmentId}`;
                    acc[key] = clo.pointsByFormulaAssessment[key]?.toFixed(1) ?? "";
                    return acc;
                }, {} as Record<string, string>),
                finalPoint: final !== undefined ? final.toFixed(1) : "",
                average: final !== undefined ? final.toFixed(2) : "",
            };
        });

        return { columns, rows };
    };

    return (
        <Box style={{ alignSelf: 'flex-start' }}>
            <CustomButtonPrintPDF
                buttonProps={{ children: 'In phiếu điểm theo CLO', disabled: !selectedCourseSectionStudent }}>

                <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                        <Text fw={'bold'} tt={"uppercase"} td={"underline"}>Trường đại học ABC</Text>
                    </CustomFlexColumn>

                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text fw={'bold'} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                        <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>Toàn môn học</Text>
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

                    <Table style={{ border: "1px solid black" }}>
                        {(() => {
                            if (StudentReportData.isLoading) {
                                return (
                                    <Table.Tbody>
                                        <Table.Tr>
                                            <Table.Td colSpan={8} style={{ textAlign: 'center' }}>Đang tải dữ liệu...</Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                );
                            }

                            if (StudentReportData.error) {
                                return (
                                    <Table.Tbody>
                                        <Table.Tr>
                                            <Table.Td colSpan={8} style={{ textAlign: 'center' }}>Lỗi: {StudentReportData.error.message}</Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                );
                            }

                            if (!StudentReportData.data) {
                                return (
                                    <Table.Tbody>
                                        <Table.Tr>
                                            <Table.Td colSpan={8} style={{ textAlign: 'center' }}>Chưa có dữ liệu</Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                );
                            }

                            const { columns, rows } = processStudentReportData(StudentReportData.data);
                            if (rows.length === 0) {
                                return (
                                    <Table.Tbody>
                                        <Table.Tr>
                                            <Table.Td colSpan={columns.length} style={{ textAlign: 'center' }}>Không có dữ liệu để hiển thị</Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                );
                            }

                            return (
                                <>
                                    <Table.Thead>
                                        <Table.Tr>
                                            {columns.map(col => (
                                                <Table.Th key={col.key} style={{ border: "1px solid black" }}>{col.label}</Table.Th>
                                            ))}
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {rows.map((row, idx) => (
                                            <Table.Tr key={idx}>
                                                {columns.map(col => (
                                                    <Table.Td key={col.key} style={{ border: "1px solid black" }}>{row[col.key]}</Table.Td>
                                                ))}
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </>
                            );
                        })()}
                    </Table>

                    <Text>
                        Mức đạt CLO môn học: {StudentReportData.data && StudentReportData.data[0]?.gradeSubjectPointResult || 0}
                    </Text>

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
