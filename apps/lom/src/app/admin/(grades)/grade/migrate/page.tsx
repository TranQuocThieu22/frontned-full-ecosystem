'use client'
import PointDistributeRead from "@/features/admin/ModulePointRecord/CourseSectionCLOPointDistribution/PointDistributeRead";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewMigrateGrade } from "@/features/auth/PageAuthorization/migrate-grade.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
  const userStore = useAuthenticateStore().state;
  const userPermissionStore = usePermissionStore().state;
  return (
    <CustomPageContent>

      {canViewMigrateGrade(userStore, userPermissionStore) ?
        <PointDistributeRead />
        :
        <RestrictedAccessMessage />
      }
    </CustomPageContent>
  );
}