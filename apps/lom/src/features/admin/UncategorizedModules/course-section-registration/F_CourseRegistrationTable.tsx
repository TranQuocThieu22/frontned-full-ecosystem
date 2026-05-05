'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable"
import { canUpdateCourseSectionRegistration } from "@/features/auth/PageAuthorization/course-section-registration.auth"
import useQ_COECourseSection_GetCOECourseSectionByCOEGrade from "@/hooks/query-hooks/COECourseSection/useQ_COECourseSection_GetCOECourseSectionByCOEGrade"
import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection"
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Group } from "@mantine/core"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import F_CourseRegistration_ViewUpdate from "./F_CourseRegistration_ViewUpdate/F_CourseRegistration_ViewUpdate"

export default function F_CourseRegistrationTable() {
  const store = useFilterGradeStore()
  const userStore = useAuthenticateStore().state;
  const userPermissionStore = usePermissionStore().state;

  const query = useQ_COECourseSection_GetCOECourseSectionByCOEGrade({
    params: "?COEGradeId=" + store.state.grade?.id,
    options: {
      enabled: store.state?.grade != undefined,
      refetchOnWindowFocus: false
    }
  })
  const columns = useMemo<MRT_ColumnDef<COECourseSection>[]>(() => [
    {
      header: "Năm học Học kỳ",
      accessorKey: "coeGradeSubject.activityPlan.name"
    },
    {
      header: "Thứ tự",
      accessorKey: "coeGradeSubject.order"
    },
    {
      header: "Mã môn học",
      accessorKey: "coeGradeSubject.coeSubject.code"
    },
    {
      header: "Tên môn học",
      accessorKey: "coeGradeSubject.coeSubject.name"
    },
    {
      header: "Nhóm học",
      accessorKey: "code"
    },
    {
      header: "Số tín chỉ",
      accessorKey: "coeGradeSubject.coeSubject.numberCredit"
    },
    {
      header: "Số tiết",
      accessorKey: "coeGradeSubject.coeSubject.numberPeriod"
    },
    {
      header: "Số lượng sinh viên",
      accessorKey: "studentQuantity"
    }
  ], [])
  if (query.isLoading) return "Đang tải dữ liệu..."
  if (query.isError) return "Có lỗi xảy ra!"
  return (
    <CustomFieldset title={`Danh sách môn học thuộc chương trình đào tạo - Khóa học ${store.state.grade?.code}`}>
      <MyDataTable
        columns={columns}
        data={query.data!}
        renderTopToolbarCustomActions={() => (
          <Group>
            {/* <PrototypeImportButton/> */}
            {/* <SyncDataEdusoftButton /> */}
          </Group>
        )}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            {canUpdateCourseSectionRegistration(userStore, userPermissionStore) && <F_CourseRegistration_ViewUpdate values={row.original} />}
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  )
}
