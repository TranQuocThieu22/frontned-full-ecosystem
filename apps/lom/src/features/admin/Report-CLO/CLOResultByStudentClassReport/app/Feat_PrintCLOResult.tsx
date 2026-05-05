import { IStudentCLOResult, IStudentReportRes, service_COECourseSectionStudent } from '@/api/services/service_COECourseSectionStudent'
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery'
import { useStore_CLOResultByClassReport } from '../../CLOResultByClassReport/app/useStore_CLOResultByClassReport'
import Shared_PrintCLOResult, { CLOResult, ITableData } from '../shared/Shared_PrintCLOResult'

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

    function mapToTableData(data: IStudentReportRes[]): ITableData[] {
        return data.map((student, index): ITableData => ({
            studentCode: student.studentId?.toString() ?? "",       // fallback nếu undefined
            fullName: student.studentName ?? "",
            clos: student.studentCLOResults?.map((result: IStudentCLOResult): CLOResult => ({
                clo: result.cloCode ?? "",                                // "CLO 1"
                threshold: result.cloPassedDensity ?? 0,                  // ngưỡng đạt
                result: `${Math.round((result.point ?? 0) * 10)}%`,      // "33%"
                evaluation: result.isPassed ? "Đạt" : "Chưa đạt",
            })) || []
        }))
    }


    return (
        <Shared_PrintCLOResult
            subjectName={studentReport.data?.[0]?.subjectName}
            class={store.state.className}
            grade={store.state.gradeName}
            program={store.state.programName}
            tableData={mapToTableData(studentReport.data || [])}
            buttonPrintPDFProps={{
                buttonProps: {
                    disabled: store.state.classId == undefined || store.state.subjectId == undefined
                }
            }}
        />
    )
}
