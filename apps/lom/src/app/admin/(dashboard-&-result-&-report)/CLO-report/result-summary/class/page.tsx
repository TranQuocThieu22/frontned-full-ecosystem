"use client"
import Feat_FilterInfo from "@/features/admin/Report-CLO/CLOResultByClassReport/app/Feat_FilterInfo";
import Feat_PrintCLOResult from "@/features/admin/Report-CLO/CLOResultByClassReport/app/Feat_PrintCLOResult";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canPrintReportCLOResultSummaryPerClass, canViewReportCLOResultSummaryPerClass } from "@/features/auth/PageAuthorization/CLO-report-result-summary-class.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Paper, Space } from "@mantine/core";
import { IconSelect } from "@tabler/icons-react";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>

            {canViewReportCLOResultSummaryPerClass(userStore, userPermissionStore) ?
                <Paper p={'md'}>
                    <CustomFlexIconTitle icon={<IconSelect className="h-5 w-5 text-blue-600 dark:text-blue-400" />}>
                        Chọn đối tượng cần in
                    </CustomFlexIconTitle>
                    <Feat_FilterInfo />
                    <Space />
                    {canPrintReportCLOResultSummaryPerClass(userStore, userPermissionStore) && <Feat_PrintCLOResult />}
                </Paper>
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
