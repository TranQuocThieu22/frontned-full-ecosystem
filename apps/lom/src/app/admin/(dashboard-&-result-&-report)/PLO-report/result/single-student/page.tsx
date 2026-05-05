"use client"
import F_PLOResultByStudentReportRead from "@/features/admin/Report-PLO/PLOResultByStudentReport/F_PLOResultByStudentReportRead";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewStudent } from "@/features/auth/PageAuthorization/PLO-report-result-single-student.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewStudent(userStore, userPermissionStore) ? <F_PLOResultByStudentReportRead /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
