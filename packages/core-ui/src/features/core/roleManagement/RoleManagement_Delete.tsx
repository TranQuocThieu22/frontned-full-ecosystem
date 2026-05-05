import { roleService } from "@aq-fe/core-ui/shared/APIs/roleService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function RoleManagement_Delete({ code, id }: { code?: string, id: number }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => roleService.delete(id)} />
    )
}
