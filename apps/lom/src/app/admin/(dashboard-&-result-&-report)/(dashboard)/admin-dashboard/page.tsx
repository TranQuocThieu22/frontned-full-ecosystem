'use client';
import DashboardLayout from '@/features/admin/Report-Dashboard/ModuleAdminDashboard/DashboardLayout';
import RestrictedAccessMessage from '@/features/auth/AuthorizationRender/restricted-access-message';
import { canViewEducationLevel } from '@/features/auth/PageAuthorization/education-level.auth';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <>
            {canViewEducationLevel(userStore, userPermissionStore) ?
                <DashboardLayout />
                // <MockLayout />
                :
                <RestrictedAccessMessage />
            }
        </>
    )
}
