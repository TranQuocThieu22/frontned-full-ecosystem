import { difficultyDetailService } from "@/shared/APIs/difficultyDetailService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function DifficultyDetailDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => difficultyDetailService.delete(id)}></MyActionIconDelete >
    );
}