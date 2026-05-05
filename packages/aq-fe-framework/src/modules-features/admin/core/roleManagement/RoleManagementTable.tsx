import { roleService } from "@/APIs/roleService";
import { CustomDataTableAPI } from "@/core/withAPI/CustomDataTableAPI";
import { useMyReactQuery } from "@/hooks";
import { IRole } from "@/interfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RoleManagementCreateUpdate from "./RoleManagementCreateUpdate";


export default function RoleManagementTable() {
    const query = useMyReactQuery({
        queryKey: ['roles'],
        axiosFn: () => roleService.getAdminRole()
    })
    const columns = useMemo<MRT_ColumnDef<IRole>[]>(() => [
        {
            header: "Mã nhóm",
            accessorKey: "code",
            size: 40,
        },
        {
            header: "Tên nhóm",
            accessorKey: "name",
        },
        {
            header: "Số thành viên",
            accessorKey: "userQuantity",
        },
        {
            header: "Trạng thái",
            accessorKey: "isActive",
            accessorFn: (row) => row.isActive ? "Đang hoạt động" : "Khóa nhóm tài khoản"
        },
    ], []);
    return (
        <CustomDataTableAPI
            query={query}
            columns={columns}
            deleteFn={roleService.delete}
            renderTopToolbarCustomActions={() => (
                <RoleManagementCreateUpdate />
            )}
            renderRowActions={({ row }) => (
                <RoleManagementCreateUpdate values={row.original} />
            )}
        />
    )
}
