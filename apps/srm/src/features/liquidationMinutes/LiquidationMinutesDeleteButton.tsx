import { liquidationMinuteService } from "@/shared/APIs/liquidationMinuteService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function LiquidationMinutesDeleteButton({ id, code }: { id: number, code: string }) {
    return (
        <CustomActionIconDelete
            contextData={code}
            onSubmit={() => {
                return liquidationMinuteService.delete(id)
            }}
        />
    );
}
