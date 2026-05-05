
'use client'
import F_CLOConfigurationTable from "@/features/admin/UncategorizedModules/CLO-configuration/F_CLOConfigurationTable";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canReviewCLOConfiguration } from "@/features/auth/PageAuthorization/review-CLO-configuration.auth";
import FilterGradeSelect from "@/shared/features/FilterGradeSelect/FilterGradeSelect";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Space } from "@mantine/core";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {
                canReviewCLOConfiguration(userStore, userPermissionStore) ?
                    <>
                        <FilterGradeSelect />
                        <Space />
                        <F_CLOConfigurationTable />
                    </>
                    :
                    <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}