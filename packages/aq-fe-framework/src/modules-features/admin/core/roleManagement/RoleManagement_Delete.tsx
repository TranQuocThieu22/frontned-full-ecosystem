import { roleService } from "@/APIs/roleService";
import { MyActionIconDelete } from "@/components";

export default function RoleManagement_Delete({ code, id }: { code?: string, id: number }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => roleService.delete(id)} />
    )
}
