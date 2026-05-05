'use client'
import F_EducationFormatTable from "@/features/admin/UncategorizedModules/education-format/F_EducationFormatTable";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewEducationFormat } from "@/features/auth/PageAuthorization/education-format.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Danh mục hệ đào tạo">
            {canViewEducationFormat(userStore, userPermissionStore) ? <F_EducationFormatTable /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}