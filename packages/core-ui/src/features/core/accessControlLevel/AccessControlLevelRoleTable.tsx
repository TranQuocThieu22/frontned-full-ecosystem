import { roleService } from "@aq-fe/core-ui/shared/APIs/roleService";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Role } from "@aq-fe/core-ui/shared/interfaces/Role";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";

interface Props extends Omit<React.ComponentProps<typeof CustomDataTable>, 'data' | "columns"> { }

export default function AccessControlLevelRoleTable({ ...rest }: Props) {
    const adminRoleQuery = useCustomReactQuery({
        queryKey: ['roles'],
        axiosFn: () => roleService.getAdminRole()
    })
    const columns = useMemo<MRT_ColumnDef<Role>[]>(() => [
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
            accessorKey: "userQuantity"
        },
        {
            header: "Trạng thái",
            accessorKey: "isActive",
            accessorFn: (row) => row.isActive ? "Đang hoạt động" : "Khóa quyền"
        },
    ], []);
    useEffect(() => {
        if (!adminRoleQuery.data) return
        rest.setIdSelectionOne?.(adminRoleQuery.data[0]?.id?.toString()!)
    }, [adminRoleQuery.data])
    return (
        <CustomDataTable
            columns={columns}
            data={adminRoleQuery.data || []}
            isError={adminRoleQuery.isError}
            isLoading={adminRoleQuery.isLoading}
            {...rest}
        />
    )
}
