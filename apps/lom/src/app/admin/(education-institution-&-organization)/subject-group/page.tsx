'use client'
import F_SubjectGrouTable from '@/features/admin/UncategorizedModules/subject-group/F_SubjectGroupTable';
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewSubjectGroup } from '@/features/auth/PageAuthorization/subject-group.auth';
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent';
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    return (
        <CustomPageContent title='Danh mục Nhóm môn học'>
            {canViewSubjectGroup(userStore, userPermissionStore) ? <F_SubjectGrouTable /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
