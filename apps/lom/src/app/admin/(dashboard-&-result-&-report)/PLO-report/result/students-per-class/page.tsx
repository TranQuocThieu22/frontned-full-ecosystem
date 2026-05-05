"use client"

import FilterObjectToPrint from "@/features/admin/Report-PLO/StudentReportByClass/FilterObjectToPrint";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewClassStudentStudent } from "@/features/auth/PageAuthorization/PLO-report-result-students-per-class.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>{canViewClassStudentStudent(userStore, userPermissionStore) ? <FilterObjectToPrint /> : <RestrictedAccessMessage />}</CustomPageContent>
    )
}
