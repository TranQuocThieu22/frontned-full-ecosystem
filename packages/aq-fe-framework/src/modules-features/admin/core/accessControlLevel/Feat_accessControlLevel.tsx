import { I_BasicAppShell_LinkItem } from "@/components";
import { Permission } from "@/core/input/CorePermissionCheck";
import AccessControlLevelRoleTable from "@/modules-features/admin/core/accessControlLevel/AccessControlLevelRoleTable";
import Permission_SaveMenuPermission from "@/shared/features/Permission/Permission_SaveMenuPermission";
import Permission_ViewCheckMenuPermission from "@/shared/features/Permission/Permission_ViewCheckMenuPermission";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";

export function Feat_accessControlLevel({ menuData }: { menuData: I_BasicAppShell_LinkItem[] }) {
    const accountIdState = useState<string>()
    const memuPermissionState = useState<Permission[]>()
    return (
        <Grid >
            <Grid.Col span={{ base: 12, md: 5 }}>
                <AccessControlLevelRoleTable
                    idSelectionOne={accountIdState[0]}
                    setIdSelectionOne={accountIdState[1]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack>
                    <Permission_ViewCheckMenuPermission
                        roleOrUserId={parseInt(accountIdState[0]!)}
                        value={memuPermissionState[0]}
                        onChange={memuPermissionState[1]}
                        menuDataRoot={menuData}
                    />
                    <Permission_SaveMenuPermission
                        roleOrUserId={parseInt(accountIdState[0]!)}
                        values={memuPermissionState[0]}
                    />
                </Stack>
            </Grid.Col>
        </Grid>
    )
}
