'use client'
import F_EducationRegulationTable from "@/features/admin/UncategorizedModules/education-regulation/F_EducationRegulationTable";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewEducationRegulation } from "@/features/auth/PageAuthorization/governing-education-regulation.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Danh mục Quy chế/Thông tư">
            {canViewEducationRegulation(userStore, userPermissionStore) ? <F_EducationRegulationTable /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}