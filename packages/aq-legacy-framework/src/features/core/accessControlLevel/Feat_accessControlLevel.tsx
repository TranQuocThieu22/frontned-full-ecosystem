import { Permission } from "@aq-fe/aq-legacy-framework/shared/components/input/CorePermissionCheck";
import { I_BasicAppShell_LinkItem } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomBasicAppShell/types";
import Permission_SaveMenuPermission from "@aq-fe/aq-legacy-framework/shared/features/Permission/Permission_SaveMenuPermission";
import Permission_ViewCheckMenuPermission from "@aq-fe/aq-legacy-framework/shared/features/Permission/Permission_ViewCheckMenuPermission";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import AccessControlLevelRoleTable from "./AccessControlLevelRoleTable";

export function Feat_accessControlLevel({ menuData }: { menuData: I_BasicAppShell_LinkItem[] }) {
    const accountIdState = useState<number | undefined>()
    const memuPermissionState = useState<Permission[]>()
    return (
        <Grid >
            <Grid.Col span={{ base: 12, md: 5 }}>
                <AccessControlLevelRoleTable
                    idSelectionOne={accountIdState[0]?.toString()}
                    setIdSelectionOne={(value) => accountIdState[1](Number(value))}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack>
                    <Permission_ViewCheckMenuPermission
                        roleOrUserId={Number(accountIdState[0])}
                        value={memuPermissionState[0]}
                        onChange={memuPermissionState[1]}
                        menuDataRoot={menuData}
                    />
                    <Permission_SaveMenuPermission
                        roleOrUserId={Number(accountIdState[0])}
                        values={memuPermissionState[0]}
                    />
                </Stack>
            </Grid.Col>
        </Grid>
    )
}
