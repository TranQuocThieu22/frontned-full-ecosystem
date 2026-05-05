import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";


export default function CriteriasDeleteButton({ code, onDelete }: { code: string, onDelete: (code: string[]) => void }) {
    return (
        <CustomActionIconDelete
            onSubmit={() => onDelete([code])}
            contextData={code}
        />
    );
}