import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import Shared_PrintCLOResult from "../shared/Shared_PrintCLOResult";
import { useStore_CLOResultByClassReport } from "./useStore_CLOResultByClassReport";
interface CloStat {
    clo?: string;
    cloDescription?: string;
    passingThresholdPercent?: number;
    studentPassCount: number;
    studentFailCount: number;
}

export default function Feat_PrintCLOResult() {
    const store = useStore_CLOResultByClassReport()
    const studentReport = useCustomReactQuery({
        queryKey: ['studentReport', 'byClassId', store.state.classId, 'bySubjectId', store.state.subjectId],
        options: {
            enabled: store.state.classId != undefined && store.state.subjectId != undefined
        },
        axiosFn: () => {
            return service_COECourseSectionStudent.getStudentReport({
                classId: parseInt(store.state.classId!),
                coeGradeSubjectId: parseInt(store.state.subjectId!),
            })
        }
    })
    const getCLOResultTableData = () => {
        const studentReportData = studentReport.data
        const cloMap = new Map<string, CloStat>();
        const totalStudents = studentReportData?.length || 0;

        studentReportData?.forEach(student => {
            student?.studentCLOResults?.forEach(result => {
                const key = result?.cloId?.toString();
                if (!key) return;

                if (!cloMap.has(key)) {
                    cloMap.set(key, {
                        clo: result.cloCode,
                        cloDescription: result.cloDescription,
                        passingThresholdPercent: result.cloPassedDensity,
                        studentPassCount: 0,
                        studentFailCount: 0,
                    });
                }

                const item = cloMap.get(key)!;
                if (result.isPassed) {
                    item.studentPassCount += 1;
                } else {
                    item.studentFailCount += 1;
                }
            });
        });

        return Array.from(cloMap.values()).map(item => ({
            ...item,
            studentPassPercent: totalStudents > 0 ? parseFloat(((item.studentPassCount / totalStudents) * 100).toFixed(2)) : 0,
            studentFailPercent: totalStudents > 0 ? parseFloat(((item.studentFailCount / totalStudents) * 100).toFixed(2)) : 0,
        }));
    }
    return (
        <Shared_PrintCLOResult
            buttonPrintPDFProps={{
                buttonProps: {
                    disabled: store.state.classId == undefined || store.state.subjectId == undefined
                }
            }}
            class={store.state.className}
            department='Chưa có dữ liệu'
            grade={store.state.gradeName}
            program={store.state.programName}
            subjectName={studentReport.data?.[0]?.subjectName}
            tableData={getCLOResultTableData()}
        />
    )
}
