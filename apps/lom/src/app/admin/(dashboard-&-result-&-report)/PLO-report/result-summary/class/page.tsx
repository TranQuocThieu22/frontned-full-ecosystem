"use client"

import Feat_FilterInfo from "@/features/admin/Report-PLO/PLOResultByClassReport/Feat_FilterInfo";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewClass } from "@/features/auth/PageAuthorization/PLO-report-result-summary-class.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewClass(userStore, userPermissionStore) ? <Feat_FilterInfo /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
