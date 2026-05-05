import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function StudentDelete({ student, onDelete }: { student: any; onDelete: (id: string) => void }) {
    return (
        <CustomActionIconDelete
            contextData={student.code}
            onSubmit={() => {
                onDelete(student.id);
            }}
        />
    );
}
