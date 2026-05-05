
'use client'
import F_PLORankingSystemTable from "@/features/admin/UncategorizedModules/PLO-ranking-system/F_PLORankingSystemTable";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewPLORankingSystemData } from "@/features/auth/PageAuthorization/PLO-ranking-system-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Danh mục bảng xếp hạng PLO">
            {canViewPLORankingSystemData(userStore, userPermissionStore) ?
                <F_PLORankingSystemTable />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}