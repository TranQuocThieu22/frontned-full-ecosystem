import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function MajorDelete({ majorData, onDelete }: { majorData: any; onDelete: (id: string) => void }) {
    return (
        <CustomActionIconDelete
            contextData={majorData.code}
            onSubmit={() => {
                onDelete(majorData.id);
            }}
        />
    );
}
