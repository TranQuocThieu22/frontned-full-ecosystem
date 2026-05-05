'use client'

import AllMasterDataMenuCards from "@/features/admin/AppInteraction/AppNavigator/AllMenuMasterData/AllMasterDataMenuCards";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewLOMSystemDataMenuList } from "@/features/auth/PageAuthorization/menu-lom-system-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Divider, Text } from "@mantine/core";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <>
            {canViewLOMSystemDataMenuList(userStore, userPermissionStore) ?
                <>
                    <Text fw={600} size="lg" >Danh mục hệ thống</Text>
                    {/* <MenuTypeSelect /> */}
                    <Divider mt={5} />
                    <AllMasterDataMenuCards />
                </>
                : <RestrictedAccessMessage />}

        </>
    );
}