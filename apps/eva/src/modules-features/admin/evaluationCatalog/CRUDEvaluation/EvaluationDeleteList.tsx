import { IEvaluation, evaluationService } from "@/shared/APIs/evaluationService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function EvaluationDeleteList({ values }: { values: IEvaluation[] }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map(item => item.code).join(", ")}
            onSubmit={() => evaluationService.deleteList(values)}
        />
    )
}
