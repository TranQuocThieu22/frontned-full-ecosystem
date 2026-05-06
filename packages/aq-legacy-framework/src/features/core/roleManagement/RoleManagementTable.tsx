import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService";
import { CustomColumnDef } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { Role } from "@aq-fe/aq-legacy-framework/shared/interfaces/Role";
import { useProjectInfoStore } from "@aq-fe/aq-legacy-framework/shared/stores/useProjectInfoStore";
import { useMemo } from "react";
import RoleManagementCreateUpdate from "./RoleManagementCreateUpdate";


export default function RoleManagementTable() {
    const projectInfoStore = useProjectInfoStore()
    const query = useLegacyReactQuery({
        queryKey: ['roles'],
        axiosFn: () => roleService.getAdminRole()
    })
    const columns = useMemo<CustomColumnDef<Role>[]>(() => [
        {
            header: "Mã nhóm",
            accessorKey: "code",
            size: 40,
            importFieldProps: {}
        },
        {
            header: "Tên nhóm",
            accessorKey: "name",
            importFieldProps: {
                isRequired: true
            }
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
            exportProps={{
                fileName: "Danh sách nhóm tài khoản"
            }}
            enableRowSelection
            buttonImportProps={{
                onSubmit: (values) => {
                    return roleService.createList(values.map(item => ({
                        ...item,
                        aqModuleId: projectInfoStore.state.aqModuleId
                    })))
                }
            }}
            deleteListFn={roleService.deleteListIds}
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
