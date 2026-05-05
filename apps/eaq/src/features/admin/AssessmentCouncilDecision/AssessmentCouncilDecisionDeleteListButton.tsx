import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import { IAssessmentCouncilDecision } from "@/shared/interfaces/assessmentCouncilDecision/IAssessmentCouncilDecision";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function AssessmentCouncilDecisionDeleteListButton({ values, clearSelection }: {
  values: IAssessmentCouncilDecision[]
  , clearSelection: Function
}) {
  return (
    <CustomButtonDeleteList
      count={values.length}
      onSubmit={() => {
        clearSelection();
        return service_EAQAssessmentCouncilDecision.deleteList(values)
      }}
    />
  )
}
