"use client";
import { roleService } from "@aq-fe/aq-core-framework/shared/APIs/roleService";
import { CustomDataTableAPI } from "@aq-fe/aq-core-framework/shared/components/withAPI/CustomDataTableAPI";
import { Role, RoleStatusColor, RoleStatusEnum, RoleStatusLabel } from "@aq-fe/aq-core-framework/shared/interfaces/Role";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import RolesAssignPermission from "./RolesAssignPermission";
import RolesCreateUpdate from "./RolesCreateUpdate";
import RolesStatusControl from "./RolesStatusControl";

export default function RolesTable() {
    const columns = useMemo<CustomColumnDef<Role>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã vai trò",
            size: 140,
        },
        {
            accessorKey: "name",
            header: "Tên vai trò",
            size: 220,
        },
        {
            accessorKey: "isGlobal",
            header: "Vai trò hệ thống",
            type: "squareCheck"
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            size: 160,
            Cell: ({ row }) => (
                <Group gap="xs" wrap="nowrap">
                    <CustomEnumBadge
                        value={row.original.status ?? RoleStatusEnum.active}
                        enumLabel={RoleStatusLabel}
                        enumColor={RoleStatusColor}
                    />
                    <RolesStatusControl role={row.original} />
                </Group>
            ),
        },
    ], []);

    return (
        <CustomFieldset title="Danh sách vai trò">
            <CustomDataTableAPI
                enableRowSelection
                columns={columns}
                deleteFn={roleService.delete}
                disableDelete={(row) => row.isGlobal}
                customReactQueryProps={{
                    queryKey: ["roles"],
                    serviceFn: () => roleService.getAll({ IsGlobal: true })
                }}
                renderTopToolbarCustomActions={() => (
                    <RolesCreateUpdate />
                )}
                renderRowActions={({ row }) => (
                    <>
                        <RolesCreateUpdate values={row.original} />
                        <RolesAssignPermission roleId={row.original.id!} />
                    </>
                )}
            />
        </CustomFieldset>
    );
}
