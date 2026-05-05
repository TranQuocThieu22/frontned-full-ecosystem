"use client"
import Feat_FilterStudentInfo from "@/features/admin/Report-CLO/CLOScoreReportByGrade/app/Feat_FilterStudentInfo";
import Feat_PrintScoreReport from "@/features/admin/Report-CLO/CLOScoreReportByGrade/app/Feat_PrintScoreReport";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canPrintReportCLOPointOfStudentByEnrollmentBatch, canViewReportCLOPointOfStudentByEnrollmentBatch } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-enrollment-batch.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Paper, Space } from "@mantine/core";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewReportCLOPointOfStudentByEnrollmentBatch(userStore, userPermissionStore) ?
                <Paper p={'md'}>
                    <Feat_FilterStudentInfo />
                    <Space />
                    {canPrintReportCLOPointOfStudentByEnrollmentBatch(userStore, userPermissionStore) && <Feat_PrintScoreReport />}
                </Paper>
                :
                <RestrictedAccessMessage />
            }

        </CustomPageContent>
    )
}
