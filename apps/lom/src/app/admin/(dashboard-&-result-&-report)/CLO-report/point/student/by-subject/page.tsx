'use client'
import F_CLOSubjectReportsRead from "@/features/admin/Report-CLO/CLOSubjectReports/F_CLOSubjectReportsRead";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewReportCLOPointOfStudentBySubject } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-subject.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewReportCLOPointOfStudentBySubject(userStore, userPermissionStore) ?
                <F_CLOSubjectReportsRead />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}


