import { service_department } from "@/api/services/service_department";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function F_mk8ewaafop_Delete({ id, code }: { id: number, code: string }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => service_department.delete(id)} />
    );
}
