import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService";
import { CustomActionIconDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconDelete";

export default function RoleManagement_Delete({ code, id }: { code?: string, id: number }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => roleService.delete(id)} />
    )
}
