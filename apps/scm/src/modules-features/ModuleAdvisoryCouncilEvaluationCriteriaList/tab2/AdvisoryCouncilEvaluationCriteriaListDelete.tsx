import { MyActionIconDelete } from "aq-fe-framework/components";
export default function AdvisoryCouncilEvaluationCriteriaListDelete({ criteriaID}: { criteriaID: string }) {
    return (
        <MyActionIconDelete
            contextData={criteriaID}
            onSubmit={() => {
            }} />
    )
}