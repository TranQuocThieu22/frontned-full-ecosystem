import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import Shared_PrintScoreReport from "../shared/Shared_PrintScoreReport";
import { useStore_CLOScoreReportByGrade } from "./useStore_CLOScoreReportByGrade";

export default function Feat_PrintScoreReport() {
    const store = useStore_CLOScoreReportByGrade()
    const studentReport = useCustomReactQuery({
        queryKey: ['studentRepors', 'byStudentId', store.state.studentId],
        axiosFn: () => service_COECourseSectionStudent.getStudentReport({
            studentId: store.state.studentId
        }),
        options: {
            enabled: !!store.state.studentId
        }
    })
    return (
        <Shared_PrintScoreReport
            CustomButtonPrintPDFProps={{
                buttonProps: { children: "In phiếu điểm", disabled: store.state.studentName == undefined }
            }}
            class={store.state.class}
            dateOfBirth={store.state.dateOfBirth}
            gender={store.state.gender}
            grade={store.state.grade}
            program={store.state.program}
            studentName={store.state.studentName}
            tableData={studentReport.data?.map(item => ({
                yearCode: item.semesterName,
                subjectName: item.subjectName,
                subjectCode: item.subjectCode,
                cloPoint: utils_format_fixDecimal(item.gradeSubjectPointResult!),
                cloNotPassCode: item.studentCLOResults?.filter(item => item.isPassed == false).map(item => item.cloCode).join(", ")
            })) || []}
        />
    )
}

function utils_format_fixDecimal(number: number, digits = 2): number | undefined {
    if (typeof number !== "number" || isNaN(number)) return undefined;
    return parseFloat(number.toFixed(digits));
}