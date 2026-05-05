import { roleService } from "@/APIs/roleService";
import { MyDataTable } from "@/components";
import { useMyReactQuery } from "@/hooks";
import { IRole } from "@/interfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";

interface Props extends Omit<React.ComponentProps<typeof MyDataTable>, 'data' | "columns"> { }

export default function AccessControlLevelRoleTable({ ...rest }: Props) {
    const adminRoleQuery = useMyReactQuery({
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
            accessorKey: "userQuantity"
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            Cell: ({ row }) => {
                return row.original.isActive == "active" ? "Đang hoạt động" : "Khóa quyền"
            }
        },
    ], []);
    useEffect(() => {
        if (!adminRoleQuery.data) return
        rest.setIdSelectionOne?.(adminRoleQuery.data[0].id?.toString()!)
    }, [adminRoleQuery.data])
    return (
        <MyDataTable
            columns={columns}
            data={adminRoleQuery.data || []}
            isError={adminRoleQuery.isError}
            isLoading={adminRoleQuery.isLoading}
            {...rest}
        />
    )
}
