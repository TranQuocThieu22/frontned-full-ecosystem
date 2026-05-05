'use client'
import { AppPage } from "@/data/enum/app-page.enum";
import SubjectTable from "@/features/admin/Institution&Organization/Subject/subject-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewSubject } from "@/features/auth/PageAuthorization/subject.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    return (
        <CustomPageContent title="Danh mục Môn học">
            {canViewSubject(userStore, userPermissionStore) ? <SubjectTable appPage={AppPage.SubjectData} /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
