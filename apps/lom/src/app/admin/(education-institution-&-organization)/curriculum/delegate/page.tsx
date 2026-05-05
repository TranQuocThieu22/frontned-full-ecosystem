'use client'
import ProgramDelegateTable from "@/features/admin/Curriculum&Subject/ProgramDelegate/program-delegate-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewCurriculumSetup } from "@/features/auth/PageAuthorization/curriculumn-setup.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Phân quyền quản lý CĐR chương trình">
            {canViewCurriculumSetup(userStore, userPermissionStore) ?
                <ProgramDelegateTable />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
