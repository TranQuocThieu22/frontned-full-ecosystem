'use client'
import MainLayout from "@/features/admin/Curriculum&Subject/ModuleGradeSubject/ConfigCLOAssessment/MainLayout";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewCLOConfiguration } from "@/features/auth/PageAuthorization/CLO-configuration.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewCLOConfiguration(userStore, userPermissionStore) ?
                <MainLayout />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}