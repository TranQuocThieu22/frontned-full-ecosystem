import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function StopRequestDeleteButton({ code, id }: { code: string, id: number }) {
    return (
        <CustomActionIconDelete
            onSubmit={() => contractSuspendService.delete(id)}
            contextData={code}
        />
    );
}