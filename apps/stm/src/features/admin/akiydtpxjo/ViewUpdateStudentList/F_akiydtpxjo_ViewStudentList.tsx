import { ENUM_GENDER } from "@/constants/enum/global";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { examService } from "@/shared/APIs/examService";
import { CourseRegistration } from "@/shared/interfaces/courseRegistration";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function F_akiydtpxjo_ViewStudentList({ values }: { values: CourseRegistration }) {
    const disc = useDisclosure()
    const getStudent_query = useCustomReactQuery({
        queryKey: ["examStudents", values.id],
        axiosFn: () =>
            examService.getStudent({
                courseSectionId: values.id,
                pageSize: 0,
                pageNumber: 0,
            }),
        options: {
            enabled: disc[0] == true,
        },
    });
    const columns = useMemo<MRT_ColumnDef<CourseRegistration>[]>(() => [
        {
            header: "Mã học viên",
            accessorKey: "user.code"
        },
        {
            header: "Họ tên",
            accessorKey: "user.fullName"
        },
        {
            header: "Giới tính",
            accessorFn: (row) => {
                return ENUM_GENDER[row.user?.gender!]
            }
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(new Date(row.user?.dateOfBirth!))
            }
        },
        {
            header: "Mã nhóm thi",
            accessorFn: () => {
                return values.code
            }

        },
        {
            header: "Ngày thi",
            accessorFn: () => {
                return utils_date_dateToDDMMYYYString(new Date(values.exam?.examDate!))
            }
        },
        {
            header: "Email",
            accessorKey: "user.email"
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber"
        },
        {
            header: "CCCD",
        },
        {
            header: "Đối tượng",
            accessorFn: () => "Tự do"
        }
    ], [])
    if (getStudent_query.isLoading) return "Đang tải dữ liệu"
    if (getStudent_query.isError) return "Có lỗi xảy ra"
    return (
        <MyButtonModal disclosure={disc} modalSize={"80%"} label="Xem danh sách" title="Danh sách thí sinh">
            <MyDataTable
                columns={columns}
                data={getStudent_query.data!}
            />
        </MyButtonModal>
    )
}
