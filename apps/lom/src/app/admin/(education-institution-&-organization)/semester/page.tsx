'use client'
import SemesterTable from "@/features/admin/Institution&Organization/Semester/semester-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewSemester } from "@/features/auth/PageAuthorization/semester.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Danh mục năm học - học kỳ">
            {canViewSemester(userStore, userPermissionStore) ?
                <SemesterTable />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
