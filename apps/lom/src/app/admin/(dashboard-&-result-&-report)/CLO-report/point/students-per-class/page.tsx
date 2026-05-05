'use client'
import F_StudentTable from "@/features/admin/UncategorizedModules/CLO-report/point/students-per-class/F_StudentTable";
import F_StudentTable_Filter from "@/features/admin/UncategorizedModules/CLO-report/point/students-per-class/F_StudentTable_Filter";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewReportCLOPointOfStudentsPerClass } from "@/features/auth/PageAuthorization/CLO-report-point-students-per-class.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Space } from "@mantine/core";

//fgmpowiqop
export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewReportCLOPointOfStudentsPerClass(userStore, userPermissionStore) ?
                <>
                    <F_StudentTable_Filter />
                    <Space />
                    <F_StudentTable />
                </>
                :
                <RestrictedAccessMessage />
            }

        </CustomPageContent>
    )
}
