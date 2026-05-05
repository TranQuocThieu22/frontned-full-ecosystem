'use client'
import PLOCoreSubjectLayout from "@/features/admin/Curriculum&Subject/ModulePLOFramework/ViewPLOByCoreSubject/PLOCoreSubjectLayout";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewReviewCLOPIProportionMatrix } from "@/features/auth/PageAuthorization/review-CLO-PI-proportion-matrix";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {

    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewReviewCLOPIProportionMatrix(userStore, userPermissionStore) ?
                <>
                    <PLOCoreSubjectLayout />
                </>
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent >
    )
}