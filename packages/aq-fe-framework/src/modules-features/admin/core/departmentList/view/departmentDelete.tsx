'use client'
import { MyActionIconDelete } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { departmentService } from "../../../../../APIs/departmentService";

export default function DepartmentDelete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () => {
        return departmentService.delete(id);
    }}></MyActionIconDelete>
}

