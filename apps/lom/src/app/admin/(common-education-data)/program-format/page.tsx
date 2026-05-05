
'use client'
import ProgramFormatTable from "@/features/admin/GeneralEducationMasterData/ProgramFormat/program-format-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewProgramFormat } from "@/features/auth/PageAuthorization/program-format.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    return (
        <CustomPageContent title="Danh mục bậc hệ đào tạo">
            {canViewProgramFormat(userStore, userPermissionStore) ? <ProgramFormatTable /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}