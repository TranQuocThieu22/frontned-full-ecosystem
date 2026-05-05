'use client'
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, Table, Text } from "@mantine/core";
import { useMemo } from "react";
import Feat_PrintReport from "../../PLOResultByClassReport/Feat_PrintReport";
import useS_FilterGrade from "../FilterGrade/useS_FilterGrade";

export default function GradeReportRead() {
    const store = useS_FilterGrade()

    const studentReportQuery = useCustomReactQuery({
        queryKey: [`studentReportByClassId=${store.state.grade?.id}`],
        axiosFn: () =>
            service_COECourseSectionStudent.StudentReports({
                param: `coeGradeId=${store.state.grade?.id}`,
            }),
        options: {
            enabled: !!store.state.grade?.id,
        },
    });
    const ploSummary = useMemo(() => {
        const ploMap = new Map();
        const seen = new Set();
        const students = studentReportQuery.data || [];
        for (const student of students) {
            const studentId = student.studentId;
            for (const plo of student.studentPLOResults || []) {
                const key = plo.ploCode?.trim();
                if (!key) continue;
                const pair = `${studentId}_${plo.ploId}`;
                if (seen.has(pair)) continue;
                seen.add(pair);
                if (!ploMap.has(key)) {
                    ploMap.set(key, {
                        code: plo.ploCode,
                        description: plo.ploName ?? plo.ploDescription ?? '',
                        passedDensity: plo.ploPassedDensity,
                        passed: new Set(),
                        failed: new Set(),
                    });
                }
                const entry = ploMap.get(key);
                if (plo.isPassed) {
                    entry.passed.add(studentId);
                } else {
                    entry.failed.add(studentId);
                }
            }
        }
        return Array.from(ploMap.entries()).map(([_, data], idx) => {
            const passed = data.passed.size;
            const failed = data.failed.size;
            const total = passed + failed;
            const passedPercent = total ? Math.round((passed / total) * 100) : 0;
            const failedPercent = total ? 100 - passedPercent : 0;

            return {
                index: idx + 1,
                plo: {
                    code: data.code,
                    description: data.description,
                    passedDensity: data.passedDensity ? `${data.passedDensity}%` : '',
                },
                passed,
                failed,
                passedPercent,
                failedPercent,
            };
        });
    }, [studentReportQuery.data]);

    const totals = useMemo(() => {
        const totalPassed = ploSummary.reduce((sum, p) => sum + p.passed, 0);
        const totalFailed = ploSummary.reduce((sum, p) => sum + p.failed, 0);
        const total = totalPassed + totalFailed;
        const passedPercent = total ? Math.round((totalPassed / total) * 100) : 0;
        const failedPercent = 100 - passedPercent;
        return { totalPassed, totalFailed, passedPercent, failedPercent };
    }, [ploSummary]);


    return (

        <Feat_PrintReport
            addressTitle={<Text tt={"uppercase"}>Phòng quản lý đào tạo</Text>}
            title="Báo cáo kết quả đo lường chuẩn đầu ra chương trình đào tạo"
        >
            <CustomFlexColumn>
                <Group>
                    <Text>Khóa: {store.state.grade?.name}</Text>
                </Group>
                <Group>
                    <Text>Khoa: {store.state.program?.coeUnit?.name}</Text>
                    {/* <Text>CTĐT/Ngành:{store.state.program?.name}</Text> */}
                    <Text>CTĐT/Ngành: chưa có dữ liệu</Text>
                </Group>
            </CustomFlexColumn>

            <Table style={{ border: "1px solid black" }}>
                <Table.Thead style={{ border: "1px solid black" }}>
                    <Table.Tr style={{ border: "1px solid black" }}>
                        <Table.Th rowSpan={2} style={{ border: "1px solid black" }}>STT</Table.Th>
                        <Table.Th rowSpan={2} style={{ border: "1px solid black" }}>PLO</Table.Th>
                        <Table.Th rowSpan={2} style={{ border: "1px solid black" }}>MÔ TẢ PLO</Table.Th>
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
                    {ploSummary.map((row) => (
                        <Table.Tr key={row.index} style={{ border: "1px solid black" }}>
                            <Table.Td style={{ border: "1px solid black" }}>{row.index}</Table.Td>
                            <Table.Td style={{ border: "1px solid black" }}>{row.plo.code}</Table.Td>
                            <Table.Td style={{ border: "1px solid black" }}>{row.plo.description}</Table.Td>
                            <Table.Td style={{ border: "1px solid black" }}>{row.plo.passedDensity}</Table.Td>
                            <Table.Td style={{ border: "1px solid black" }}>{row.passed}</Table.Td>
                            <Table.Td style={{ border: "1px solid black" }}>{row.passedPercent}%</Table.Td>
                            <Table.Td style={{ border: "1px solid black" }}>{row.failed}</Table.Td>
                            <Table.Td style={{ border: "1px solid black" }}>{row.failedPercent}%</Table.Td>
                        </Table.Tr>
                    ))}
                    <Table.Tr style={{ border: "1px solid black" }}>
                        <Table.Td colSpan={4} style={{ border: "1px solid black" }}>
                            <strong>Tổng cộng</strong>
                        </Table.Td>
                        <Table.Td style={{ border: "1px solid black" }}>{totals.totalPassed}</Table.Td>
                        <Table.Td style={{ border: "1px solid black" }}>{totals.passedPercent}%</Table.Td>
                        <Table.Td style={{ border: "1px solid black" }}>{totals.totalFailed}</Table.Td>
                        <Table.Td style={{ border: "1px solid black" }}>{totals.failedPercent}%</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Feat_PrintReport>
    )
}
