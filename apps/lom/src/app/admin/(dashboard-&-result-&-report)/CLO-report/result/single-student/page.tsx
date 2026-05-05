"use client"
import Feat_FilterStudentInfo from "@/features/admin/Report-CLO/CLOResultByStudentReport/app/Feat_FilterStudentInfo";
import Feat_PrintScoreReport from "@/features/admin/Report-CLO/CLOResultByStudentReport/app/Feat_PrintScoreReport";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canPrintReportCLOResultPerStudent, canViewReportCLOResultPerStudent } from "@/features/auth/PageAuthorization/CLO-report-result-single-student.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Paper, Space } from "@mantine/core";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            <Paper p={'md'}>
                {canViewReportCLOResultPerStudent(userStore, userPermissionStore) ?
                    <>
                        <Feat_FilterStudentInfo />
                        <Space />
                        {canPrintReportCLOResultPerStudent(userStore, userPermissionStore) && <Feat_PrintScoreReport />}
                    </>
                    :
                    <RestrictedAccessMessage />
                }

            </Paper>
        </CustomPageContent>
    )
}
