"use client"
import Feat_FilterInfo from "@/features/admin/Report-CLO/CLOAssessmentReport/Feat_FilterInfo";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewReportCLOPointOfStudentByAssessmentPhase } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-assessment-phase.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>

            {canViewReportCLOPointOfStudentByAssessmentPhase(userStore, userPermissionStore) ?
                <Feat_FilterInfo />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
