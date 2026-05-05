'use client'
import F_CLOSchoolYearReportsRead from "@/features/admin/Report-CLO/CLOSchoolYearReports/F_CLOSchoolYearReportsRead";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewReportCLOPointOfStudentByAcademicYear } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-academic-year.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>

            {canViewReportCLOPointOfStudentByAcademicYear(userStore, userPermissionStore) ?
                <F_CLOSchoolYearReportsRead />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
