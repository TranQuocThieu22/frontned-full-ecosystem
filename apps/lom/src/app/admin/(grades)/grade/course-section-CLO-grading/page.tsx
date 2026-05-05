'use client';
import MainLayout from "@/features/admin/ModulePointRecord/CourseSectionCLOPointRecord/MainLayout";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewCLOGradingForCourseSection } from "@/features/auth/PageAuthorization/CLO-grading-for-course-section.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent
            title="Nhập điểm CLO theo nhóm học"
        >
            {canViewCLOGradingForCourseSection(userStore, userPermissionStore) ?
                <MainLayout />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}