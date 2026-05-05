import { MyButtonDeleteList } from "aq-fe-framework/components";
export default function AdvisoryCouncilEvaluationCriteriaListDeleteListButton({ values }: { values: any[] }) {
    return (
        <MyButtonDeleteList
            actionIconProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item) => item.criteriaID).join(", ")}
            onSubmit={() => { }}
        />
    )
}