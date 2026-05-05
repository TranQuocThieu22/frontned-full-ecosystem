'use client'
import EnrollmentBatchTable from '@/features/admin/Institution&Organization/EnrollmentBatch/enrollment-batch-table';
import RestrictedAccessMessage from '@/features/auth/AuthorizationRender/restricted-access-message';
import { canViewEnrollmentBatch } from '@/features/auth/PageAuthorization/enrollment-batch.auth';
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent';
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent title='Danh mục Khóa/ Khối đào tạo'>
            {canViewEnrollmentBatch(userStore, userPermissionStore) ? <EnrollmentBatchTable /> : <RestrictedAccessMessage />}
        </CustomPageContent>
    )
}
