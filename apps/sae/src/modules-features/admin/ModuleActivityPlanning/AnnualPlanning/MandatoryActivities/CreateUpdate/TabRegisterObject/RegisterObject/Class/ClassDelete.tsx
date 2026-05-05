import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function ClassDelete({ classData, onDelete }: { classData: any; onDelete: (id: string) => void }) {
    return (
        <CustomActionIconDelete
            contextData={classData.code}
            onSubmit={() => {
                onDelete(classData.id);
            }}
        />
    );
}
