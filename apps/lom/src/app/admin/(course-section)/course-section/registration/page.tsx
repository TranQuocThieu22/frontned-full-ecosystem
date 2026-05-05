'use client'
import { CourseSectionRegistrationTable } from "@/features/admin/Curriculum&Subject/ModuleCourseSection/CourseSectionRegistration/CourseSectionRegistrationTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { useSemesterStore } from "@aq-fe/core-ui/shared/features/Semester/useSemesterStore";

export default function Page() {
    // const userStore = useAuthenticateStore().state;
    // const userPermissionStore = usePermissionStore().state;
    const semesterStore = useSemesterStore()
    return (
        <CustomPageContent>
            {/* {canViewCourseSectionRegistration(userStore, userPermissionStore) ? <>
                <F_Shared_FilterGrade />
                <Space />
                <F_CourseRegistrationTable />
            </> :
                <RestrictedAccessMessage />} */}

            <CourseSectionRegistrationTable
                semesterId={semesterStore.state.semester?.id}
            />

        </CustomPageContent>
    )
}
