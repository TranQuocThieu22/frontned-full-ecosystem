import { contractDetailService } from "@/shared/APIs/contractDetailService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface IProps {
    id: number;
    code: string;
}

export default function AdjustRequestDeleteButton({ id, code }: IProps) {
    return (
        <CustomActionIconDelete
            contextData={code}
            onSubmit={() => contractDetailService.delete(id)}
        />
    );
}
