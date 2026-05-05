'use client'
import { COECourseSectionService } from "@/api/services/service_COECourseSection"
import { canCreateCourseSectionData, canUpdateCourseSectionData, canViewCourseSectionData } from "@/features/auth/PageAuthorization/course-section-data.auth"
import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection"
import { COECourseSectionClass } from "@/interfaces/shared-interfaces/COECourseSectionClass"
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Group } from "@mantine/core"
import { useMemo } from "react"
import CourseSectionCreateUpdateButton from "./course-section-create-update-button"
import CourseSectionImportButton from "./course-section-import-button"
import CourseSectionSyncButton from "./course-section-sync-button"
import CourseSectionViewButton from "./course-section-view-button"


export default function CourseSectionByGradeTable() {

    const authenticateStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const activityPlanStore = useS_Shared_ActivityPlan().state;

    const courseSectionByGradeQuery = useCustomReactQuery({
        queryKey: [`CourseSections`, activityPlanStore.ActivityPlan?.id],
        axiosFn: () => COECourseSectionService.findByActivityPlanId({ activityPlanId: activityPlanStore.ActivityPlan?.id }),
        options: {
            refetchOnWindowFocus: false
        }
    })

    const courseSectionColumns = useMemo<CustomColumnDef<COECourseSection>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "COESubjectCode",
            accessorFn(row) {
                return row.subjectCode
            },
        },
        {
            header: "Tên môn học",
            accessorFn(row) {
                return row.subjectName
            },
        },
        {
            header: "Nhóm học",
            accessorKey: "code",
        },
        {
            header: "Mã lớp",
            accessorKey: "classCodes",
            accessorFn(row) {
                return row.coeCourseSectionClass?.map((item: COECourseSectionClass) => item.class?.code)?.join("\n")

            },
            Cell: ({ row }) => {
                return (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {row.original.coeCourseSectionClass?.map((item: COECourseSectionClass) => item.class?.code)?.join("\n")}
                    </div>
                )
            },
        },
        {
            header: "Mã Giảng viên nhập điểm",
            accessorKey: "lecturerCode",
            accessorFn(row) {
                return row.pointRecordUser?.code
            },
        },
        {
            header: "Tên Giảng viên nhập điểm",
            accessorFn(row) {
                return row.pointRecordUser?.fullName
            },
        },
        {
            header: "Số lượng sinh viên đăng ký",
            accessorKey: "studentQuantity",
        },
        {
            header: "Số tiết",
            accessorFn(row) {
                return row.subjectNumberPeriod
            },
        },
    ], []);

    return (
        <>
            <CustomDataTableAPI
                initialState={{
                    density: "md",
                }}
                query={courseSectionByGradeQuery}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={courseSectionColumns}
                exportProps={{
                    fileName: "Danh sách nhóm học",
                }}
                deleteFn={COECourseSectionService.delete}
                deleteListFn={COECourseSectionService.deleteListIds}
                renderTopToolbarCustomActions={() => (
                    <Group>

                        {
                            canCreateCourseSectionData(authenticateStore, userPermissionStore) &&
                            <CourseSectionCreateUpdateButton
                                isLoading={courseSectionByGradeQuery.isLoading}
                            />
                        }
                        {
                            canUpdateCourseSectionData(authenticateStore, userPermissionStore) &&
                            <CourseSectionSyncButton
                                loading={courseSectionByGradeQuery.isLoading}
                                activityPlanCode={Number(activityPlanStore.ActivityPlan?.code)}
                            />
                        }
                        {
                            canCreateCourseSectionData(authenticateStore, userPermissionStore) &&
                            <CourseSectionImportButton
                                isLoading={courseSectionByGradeQuery.isLoading}
                            />
                        }
                    </Group>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            {canViewCourseSectionData(authenticateStore, userPermissionStore) &&
                                <CourseSectionViewButton values={row.original} />
                            }
                            {canUpdateCourseSectionData(authenticateStore, userPermissionStore) &&
                                <CourseSectionCreateUpdateButton
                                    courseSectionValues={row.original}
                                    isLoading={courseSectionByGradeQuery.isLoading}
                                />}
                        </>
                    );
                }}>
            </CustomDataTableAPI >
        </>
    )
}
