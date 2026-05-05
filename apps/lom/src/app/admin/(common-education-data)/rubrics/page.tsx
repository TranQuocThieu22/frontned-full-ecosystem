
'use client'
import F_RubricsTable from "@/features/admin/UncategorizedModules/rubrics/F_RubricsTable";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewRubricsData } from "@/features/auth/PageAuthorization/rubrics-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Danh mục thang đo Rubrics">
            {canViewRubricsData(userStore, userPermissionStore) ?
                <F_RubricsTable />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}