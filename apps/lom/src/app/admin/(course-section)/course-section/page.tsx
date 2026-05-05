'use client'
import CourseSectionByGradeTable from "@/features/admin/Curriculum&Subject/ModuleCourseSection/CRUDCourseSection/course-section-by-grade-table";
import RestrictedAccessMessage from "@/features/auth/AuthorizationRender/restricted-access-message";
import { canViewCourseSectionData } from "@/features/auth/PageAuthorization/course-section-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export default function Page() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    return (
        <CustomPageContent>
            {canViewCourseSectionData(userStore, userPermissionStore) ?
                < CourseSectionByGradeTable />
                :
                <RestrictedAccessMessage />
            }
        </CustomPageContent>
    )
}