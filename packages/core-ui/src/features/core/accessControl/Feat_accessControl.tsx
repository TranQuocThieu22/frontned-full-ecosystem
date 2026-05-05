import { Permission } from "@aq-fe/core-ui/shared/components/input/CorePermissionCheck";
import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import Permission_SaveMenuPermission from "@aq-fe/core-ui/shared/features/Permission/Permission_SaveMenuPermission";
import Permission_ViewCheckMenuPermission from "@aq-fe/core-ui/shared/features/Permission/Permission_ViewCheckMenuPermission";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import AccessControl_AccountTable from "./AccessControl_AccountTable";

export function Feat_accessControl({ menuData }: { menuData: I_BasicAppShell_LinkItem[] }) {
    const accountIdState = useState<string>()
    const memuPermissionState = useState<Permission[]>()
    return (
        <Grid >
            <Grid.Col span={{ base: 12, md: 5 }}>
                <AccessControl_AccountTable
                    idSelectionOne={accountIdState[0]}
                    setIdSelectionOne={accountIdState[1]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack>
                    <Permission_ViewCheckMenuPermission
                        isUserPermission
                        roleOrUserId={parseInt(accountIdState[0]!)}
                        value={memuPermissionState[0]}
                        onChange={memuPermissionState[1]}
                        menuDataRoot={menuData}
                    />
                    <Permission_SaveMenuPermission
                        isUserPermission
                        roleOrUserId={parseInt(accountIdState[0]!)}
                        values={memuPermissionState[0]}
                    />
                </Stack>
            </Grid.Col>
        </Grid>
    )
}
