import { IEvaluationDetail, evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function EvaluationDetailDeleteList({ values }: { values: IEvaluationDetail[] }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map(item => item.code).join(", ")}
            onSubmit={() => evaluationDetailService.deleteList(values)}
        />
    )
}
