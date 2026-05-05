'use client'
import F_CLOSemesterReportsRead from "@/features/admin/Report-CLO/CLOSemesterReports/F_CLOSemesterReportsRead";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewReportCLOPointOfStudentBySemester } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-semester.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewReportCLOPointOfStudentBySemester(userStore, userPermissionStore) ?
                <F_CLOSemesterReportsRead />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
