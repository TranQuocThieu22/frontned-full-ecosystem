
'use client'
import ClassTable from "@/features/admin/UncategorizedModules/student-classes/class-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewClassData } from "@/features/auth/PageAuthorization/class-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>

            {
                canViewClassData(userStore, userPermissionStore)
                    ? <ClassTable />
                    : <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}