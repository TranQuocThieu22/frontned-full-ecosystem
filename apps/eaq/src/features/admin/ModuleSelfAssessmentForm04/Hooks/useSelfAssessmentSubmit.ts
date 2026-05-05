// hooks/useSelfAssessmentSubmit.ts
import { ASSESSMENT_NAME } from "@/features/admin/ModuleSelfAssessmentForm04/Constants/selfAssessment";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";

export function useSelfAssessmentSubmit(
    data: ITaskDetail,
    onUpdate?: () => void,
    onClose?: () => void
) {
    const mutation = useCustomReactMutation({
        axiosFn: (values: ISelfAssessment[]) => {
            const transformedValues = values.map((item) => ({
                selfAssessmentType: item.selfAssessmentType,
                description: item.description,
                eaqEvidenceUsages: item.eaqEvidenceUsages,
                eaqActions: item.eaqActions,
                note: item.note,
                status: item.status,
                name: ASSESSMENT_NAME,
                eaqPhaseId: data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1,
                eaqTaskDetailId: data.id,
            }));

            return service_EAQSelfAssessment.createOrUpdateList(transformedValues);
        },
        options: {
            onSuccess: () => {
                onClose?.();
                onUpdate?.();
            },
        },
    });

    return mutation;
}
