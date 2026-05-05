import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function FacultyDelete({ facultyData, onDelete }: { facultyData: any; onDelete: (id: string) => void }) {
    return (
        <CustomActionIconDelete
            contextData={facultyData.code}
            onSubmit={() => {
                onDelete(facultyData.id);
            }}
        />
    );
}
