import { cognitionService } from "@/shared/APIs/cognitionService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function CognitionDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => cognitionService.delete(id)} />
    );
}