import { service_COECLO } from "@/api/services/service_COECLO";
import { service_COESubjectAssessment } from "@/api/services/service_COESubjectAssessment";
import { service_COESubjectFormula } from "@/api/services/service_COESubjectFormula";
import { enum_formulaType, enumLabel_formulaType } from "@/data/enum/enum_formulaType";
import { enum_subjectMethodRubrics, enumLabel_subjectMethodRubrics } from "@/data/enum/enum_subjectMethodRubrics";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useEffect, useState } from "react";
import { FilterGroupShared, FilterValue } from "../shared/FilterGroupShared";

export default function FilterGroup({ gradeSubjectId }: { gradeSubjectId?: number }) {
    const filterState = useState<FilterValue>({
        tool: enum_subjectMethodRubrics.rubrics.toString(),
    });

    // Hình thức đánh giá
    const subjectFormulaQuery = useCustomReactQuery({
        queryKey: ['matrixTab', '1 coeSubjectFormula', 'byGradeSubject', gradeSubjectId],
        axiosFn: () => service_COESubjectFormula.findByGradeSubject({ gradeSubjectId: gradeSubjectId }),
        options: {
            enabled: !!gradeSubjectId
        }
    })

    // Nội dung đánh giá
    const subjectAssessmentQuery = useCustomReactQuery({
        queryKey: ['matrixTab', `2 COESubjectAssessment`, 'byFormula', filterState[0].formula],
        axiosFn: () => {
            return service_COESubjectAssessment.getAssessmentByFormula({ formulaId: filterState[0].formula })
        },
        options: {
            enabled: !!filterState[0].formula
        }
    })

    // CLO-Môn học
    const cloQuery = useCustomReactQuery({
        queryKey: ['matrixTab', '3 clos', 'byGradeSubject', gradeSubjectId],
        axiosFn: () => {
            return service_COECLO.getCLOBygradeSubjectId({ gradeSubjectId: gradeSubjectId })
        },
        options: {
            enabled: !!gradeSubjectId
        }
    })

    const fakeData = {
        formOptions: subjectFormulaQuery.data?.map(item => ({
            value: item.id?.toString()!,
            label: enumLabel_formulaType[item.formulaType as enum_formulaType] || ""
        })) || [],
        contentOptions: subjectAssessmentQuery.data?.[0]?.coeSubjectAssessments?.map((item) => ({
            value: item.id?.toString()!,
            label: item.name || "",
        })) || [],
        cloOptions: cloQuery.data?.map(item => ({
            value: item.id?.toString()!,
            label: item.code || ""
        })) || [],
        toolOptions: converterUtils.mapEnumToSelectData(enum_subjectMethodRubrics, enumLabel_subjectMethodRubrics),
    };

    // Load giá trị thứ 1 hình thức đánh giá
    useEffect(() => {
        const firstId = subjectFormulaQuery.data?.[0]?.id?.toString();
        if (firstId && !filterState[0].formula) {
            filterState[1]((prev) => ({ ...prev, formula: firstId }));
        }
    }, [subjectFormulaQuery.data, filterState]);

    // Load giá trị thứ 1 nội dung đánh giá
    useEffect(() => {
        if (!subjectAssessmentQuery.data) return
        if (subjectAssessmentQuery.data.length == 0) return
        const firstId = subjectAssessmentQuery?.data[0]?.coeSubjectAssessments![0]?.id?.toString()
        if (firstId && !filterState[0].content) {
            filterState[1]((prev) => ({ ...prev, content: firstId }));
        }
    }, [subjectAssessmentQuery.data, filterState]);

    return (
        <FilterGroupShared
            data={fakeData}
            value={filterState[0]}
            onChange={(v) => filterState[1]((prev) => ({ ...prev, ...v }))}
        />
    )
}
