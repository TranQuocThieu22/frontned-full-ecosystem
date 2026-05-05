import { evaluationService } from "@/shared/APIs/evaluationService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function EvaluationDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => evaluationService.delete(id)}></MyActionIconDelete >
    );
}