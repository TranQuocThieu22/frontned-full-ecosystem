import { codeFormulaService } from "@/APIs/codeFormulaService";
import { MyActionIconDelete } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function CodeFormulaDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => codeFormulaService.delete(id)} />
    );
}