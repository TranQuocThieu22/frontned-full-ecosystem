import { MyButtonModal } from "@/components/ui/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import useQ_COECourseSectionStudent_GetStudentByCourseSection from "@/hooks/query-hooks/COECourseSectionStudent/useQ_COECourseSectionStudent_GetStudentByCourseSection";
import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection";
import { COECourseSectionStudent } from "@/interfaces/shared-interfaces/COECourseSectionStudent";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import useS_CourseRegistrationStore from "../useS_CourseRegistrationStore";
import F_CourseRegistration_ViewUpdate_Delete from "./F_CourseRegistration_ViewUpdate_Delete";
import F_CourseRegistration_ViewUpdate_Export from "./F_CourseRegistration_ViewUpdate_Export";
import F_CourseRegistration_ViewUpdate_Form from "./F_CourseRegistration_ViewUpdate_Form";

export default function F_CourseRegistration_ViewUpdate({ values }: { values?: COECourseSection }) {
    const disc = useDisclosure()
    const FilterGradeStore = useFilterGradeStore()
    const store = useS_CourseRegistrationStore()
    const query = useQ_COECourseSectionStudent_GetStudentByCourseSection({
        params: "?COECourseSectionId=" + values?.id,
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    })
    useEffect(() => {
        if (disc[0] == true) {
            store.setProperty("subject", {
                id: values?.coeGradeSubject?.coeSubject?.id,
                code: values?.coeGradeSubject?.coeSubject?.code,
                name: values?.coeGradeSubject?.coeSubject?.name
            })
            store.setProperty("courseSectionId", values?.id)
        }
    }, [disc[0]])
    const columns = useMemo<MRT_ColumnDef<COECourseSectionStudent>[]>(() => [
        {
            header: "Mã môn học",
            accessorFn: () => {
                return store.state.subject?.code
            }
        },
        {
            header: "Tên môn học",
            accessorFn: () => {
                return store.state.subject?.name
            }
        },
        {
            header: "Mã sinh viên",
            accessorFn: (row) => {
                return row.user?.code
            }
        },
        {
            header: "Họ tên",
            accessorFn: (row) => {
                return row.user?.fullName
            }
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => {
                return dateUtils.toDDMMYYYY(new Date(row.user?.dateOfBirth!))
            }
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender",
            accessorFn: (row) => {
                return row.user?.gender === 1 ? "Nam" : row.user?.gender === 2 ? "Nữ" : ""
            }
        },
        {
            header: "Mã lớp",
            accessorKey: "user.class.code"
        },
        {
            header: "Tên lớp",
            accessorKey: "user.class.name"
        },
        {
            header: "Mã khóa",
            accessorFn: () => {
                return FilterGradeStore.state.grade?.code
            }
        },
        {
            header: "Tên khóa",
            accessorFn: () => {
                return FilterGradeStore.state.grade?.name
            }
        }
    ], [store.state])
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyButtonModal
            label="Xem/ Cập nhật"
            disclosure={disc}
            title="Danh sách sinh viên đăng ký môn học"
            modalSize={"80%"}
        >
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <F_CourseRegistration_ViewUpdate_Form values={values as COECourseSectionStudent} />
                        <F_CourseRegistration_ViewUpdate_Export table={table} FilterGradeStore={FilterGradeStore} store={store} />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <F_CourseRegistration_ViewUpdate_Delete code={row.original.code!} id={row.original.id!} />
                    </CustomCenterFull>
                )}
            />
        </MyButtonModal>
    )
}
