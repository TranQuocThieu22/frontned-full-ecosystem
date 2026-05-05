import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function ProgramSelfAssessmentDelete({
  data,
  loading
}: {
  data: IEvaluationPlan
  loading?: boolean
}) {
  return <CustomActionIconDelete
    onSubmit={() => service_EAQEvaluationPlan.delete(data.id ?? 0)}
    contextData={String(data.code) + " - " + String(data.name)}
    buttonProps={{
      loading: loading
    }}
  />;
}
