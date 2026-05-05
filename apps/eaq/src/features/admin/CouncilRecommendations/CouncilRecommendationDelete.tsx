import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id?: number;
    code: string;
    resetRowSelection: Function
}

export default function CouncilRecommendationDelete({ id, code, resetRowSelection }: Props) {
    return (
        <CustomActionIconDelete
            onSubmit={() => {
                return service_EAQLimitation.delete(id || 0);
            }}
            onSuccess={() => {
                resetRowSelection();
            }}
            contextData={code}
        />
    );
}
