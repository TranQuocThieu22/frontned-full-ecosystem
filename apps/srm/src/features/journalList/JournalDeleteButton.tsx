
import { journalService } from "@/shared/APIs/journalService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id?: number;
    code?: string;
    clearSelection: Function;
    loading?: boolean;
    disabled?: boolean
}

export default function JournalDeleteButton({ id, code, clearSelection, loading, disabled }: Props) {
    return (
        <CustomActionIconDelete
            actionIconProps={{
                loading: loading,
                disabled: disabled
            }}
            contextData={code}
            onSubmit={() => {
                return journalService.delete(id || -1);
            }}
            onSuccess={() => {
                clearSelection();
            }}
        />
    )
}