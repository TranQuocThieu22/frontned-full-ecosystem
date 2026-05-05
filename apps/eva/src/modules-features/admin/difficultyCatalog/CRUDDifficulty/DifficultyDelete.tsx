import { difficultyService } from "@/shared/APIs/difficultyService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function DifficultyDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => difficultyService.delete(id)}></MyActionIconDelete >
    );
}