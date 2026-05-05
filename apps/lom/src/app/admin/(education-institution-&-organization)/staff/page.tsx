'use client'
import StaffCategoryRead from "@/features/admin/Institution&Organization/StaffCategory/StaffCategoryRead";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewStaff } from "@/features/auth/PageAuthorization/staff.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
  const userStore = useAuthenticateStore().state;
  const userPermissionStore = usePermissionStore().state;

  return (
    <CustomPageContent title="Danh mục nhân sự">
      {canViewStaff(userStore, userPermissionStore) ? <StaffCategoryRead /> : <RestrictedAccessMessage />}
    </CustomPageContent>
  )
}
