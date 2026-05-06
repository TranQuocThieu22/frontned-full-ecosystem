import { codeFormulaService } from "@aq-fe/aq-legacy-framework/shared/APIs/codeFormulaService";
import { CustomActionIconDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconDelete";

export default function CodeFormulaDelete({ id, code }: { id: number, code: string }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => codeFormulaService.delete(id)} />
    );
}