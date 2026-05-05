"use client"

import FilterObjectToPrint from "@/features/admin/Report-PLO/StudentReportByGrade/FilterObjectToPrint";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewStudentEnrollment } from "@/features/auth/PageAuthorization/PLO-report-result-students-per-enrollment-batch.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewStudentEnrollment(userStore, userPermissionStore) ? <FilterObjectToPrint /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
