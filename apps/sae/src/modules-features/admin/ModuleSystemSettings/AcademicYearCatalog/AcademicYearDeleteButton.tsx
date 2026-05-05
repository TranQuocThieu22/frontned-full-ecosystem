import { service_academicYear } from "@/api/services/service_academicYear";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function AcademicYearDeleteButton({ code, id }: { code: string, id: number }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => service_academicYear.delete(id)} />
    );
}
