'use client'
import EnrollmentBatchTable from "@/features/admin/Curriculum&Subject/CLOFormulaSetting/enrollment-batch-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewCLOFormulaSetting } from "@/features/auth/PageAuthorization/CLO-formula-setting.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Công thức tính CLO thành phần theo khóa">
            {canViewCLOFormulaSetting(userStore, userPermissionStore) ?
                <EnrollmentBatchTable />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
