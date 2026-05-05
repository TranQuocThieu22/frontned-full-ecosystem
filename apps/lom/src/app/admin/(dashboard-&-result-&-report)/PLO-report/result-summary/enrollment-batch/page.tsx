'use client'
import GradeReportLayout from "@/features/admin/Report-PLO/GradeReport/GradeReportLayout";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewEnrollment } from "@/features/auth/PageAuthorization/PLO-report-result-summary-enrollment-batch.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewEnrollment(userStore, userPermissionStore) ? <GradeReportLayout /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
