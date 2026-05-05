'use client'
import CLOPIRelationMatrixTable from "@/features/admin/Curriculum&Subject/CLOPIRelationMatrix/CLOPIRelationMatrixTable";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewCLOPIMatrix } from "@/features/auth/PageAuthorization/clo-PI-matrix.auth";
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
            {canViewCLOPIMatrix(userStore, userPermissionStore) ?
                <>
                    <FilterGradeSelect />
                    <Space />
                    <CLOPIRelationMatrixTable /></>
                : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
