import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  id: number,
  code?: string
  clearSelection: Function
}

export default function AssessmentCouncilDecisionDeleteButton({ id, code, clearSelection }: Props) {
  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={() => {
        clearSelection();
        return service_EAQAssessmentCouncilDecision.delete(id);
      }}
    />
  )
}
