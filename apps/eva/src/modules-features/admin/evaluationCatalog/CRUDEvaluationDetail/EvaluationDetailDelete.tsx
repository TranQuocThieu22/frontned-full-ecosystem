import { evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function EvaluationDetailDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => evaluationDetailService.delete(id)}></MyActionIconDelete >
    );
}