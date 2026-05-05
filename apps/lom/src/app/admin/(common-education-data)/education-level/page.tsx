
'use client'
import EducationLevelTable from "@/features/admin/GeneralEducationMasterData/EducationLevel/education-level-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewEducationLevel } from "@/features/auth/PageAuthorization/education-level.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";


export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Danh mục bậc đào tạo">
            {canViewEducationLevel(userStore, userPermissionStore) ? <EducationLevelTable /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}