'use client'
import { AppFeature } from "@/data/enum/app-feature.enum";
import CurriculumSetup from "@/features/admin/Curriculum&Subject/CurriculumSetup/curriculum-setup";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewCurriculumSetup } from "@/features/auth/PageAuthorization/curriculumn-setup.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";


export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title="Chương trình đào tạo">
            {canViewCurriculumSetup(userStore, userPermissionStore) ?
                <CurriculumSetup appFeature={AppFeature.CurriculumSetup} />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}
