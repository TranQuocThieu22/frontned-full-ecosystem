import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import Shared_PrintScoreReport from "../shared/Shared_PrintScoreReport";
import { useStore_CLOResultByStudentReport } from "./useStore_CLOResultByStudentReport";

export default function Feat_PrintScoreReport() {
    const store = useStore_CLOResultByStudentReport()
    const studentReportQuery = useCustomReactQuery({
        queryKey: ['studentReport', 'byStudentId', store.state.studentId, 'byCoeGradeSubjectId', store.state.subjectId],
        options: {
            enabled: !!store.state.studentId && !!store.state.subjectId
        },
        axiosFn: () => {
            return service_COECourseSectionStudent.getStudentReport({
                studentId: store.state.studentId,
                coeGradeSubjectId: store.state.subjectId
            })
        }
    })
    return (
        <Shared_PrintScoreReport
            CustomButtonPrintPDFProps={{
                buttonProps: {
                    disabled: store.state.subjectName == undefined,
                    children: "In kết quả đo lường từng sinh viên"
                }
            }}
            subjectName={store.state.subjectName}
            studentName={store.state.studentName}
            studentId={store.state.studentCode}
            gradeName={store.state.gradeName}
            tableData={studentReportQuery.data?.[0]?.studentCLOResults?.map(item => ({
                cloCode: item.cloCode,
                desciptionClo: item.cloDescription,
                cloEvaluation: item.isPassed,
                measuredResult: (item.point || 0) * 10,
                passingThreshold: item.cloPassedDensity,
            })) || []}
        />
    )
}
