import { service_COESubjectAssessment } from "@/api/services/service_COESubjectAssessment";
import { enum_formulaType, enumLabel_formulaType } from "@/data/enum/enum_formulaType"; // nếu có enum label dạng này
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import CLOMatrixSummaryTableShared from "../shared/CLOMatrixSummaryTableShared";

export default function CLOMatrixSummaryTable({ isActiveTab, gradeSubjectId }: { isActiveTab: boolean, gradeSubjectId?: number }) {
    const subjectAssessmentQuery = useCustomReactQuery({
        options: {
            enabled: isActiveTab
        },
        queryKey: ['subjectAssessment', 'byGradeSubject', gradeSubjectId],
        axiosFn: () => service_COESubjectAssessment.getCOESubjectAssessment({ coeGradeSubjectId: gradeSubjectId })
    });

    const flattenedData = subjectAssessmentQuery.data?.flatMap(assessment => {
        return assessment.coeSubjectMethods?.map(method => ({
            cloName: method.coeclo?.code ?? "",
            density: method.density,
            formulaTypeName: enumLabel_formulaType[assessment.coeSubjectFormula?.formulaType as enum_formulaType],
            content: method.evaluation,
            maxScore: method.maxPoint
        })) ?? []
    })?.sort((a, b) => {
        // extract number part of cloName (e.g., "CLO2" → 2)
        const getCloNumber = (cloName: string) => parseInt(cloName.replace(/[^\d]/g, ""), 10) || 0;
        return getCloNumber(a.cloName) - getCloNumber(b.cloName);
    });

    return (
        <CLOMatrixSummaryTableShared
            data={flattenedData}
        />
    )
}
