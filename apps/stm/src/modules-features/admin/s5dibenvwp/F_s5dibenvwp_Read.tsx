'use client'
import MyButtonModalExport from "@/components/Buttons/ButtonModalExport/MyButtonModalExport";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { ENUM_GENDER } from "@/constants/enum/global";
import useQ_Course_GetStudent, { ICourse_GetStudent } from "@/hooks/query-hooks/Course/useQ_Course_GetStudent";
import { ICourseRegistration } from "@/interfaces/courseRegistration";
import { Group } from "@mantine/core";
import { MyButton } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export default function F_s5dibenvwp_Read() {
    const courseStudentsQuery = useQ_Course_GetStudent({
        body: {
            pageNumber: 0,
            pageSize: 0
        }
    })
    const editedIsCheck = useState<Record<string, ICourseRegistration>>({})
    const columns = useMemo<MRT_ColumnDef<ICourse_GetStudent>[]>(() => [
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
            accessorKey: "user.dateOfBirth",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.user?.dateOfBirth!))
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber"
        },
        {
            header: "Email",
            accessorKey: "user.email"
        },
        {
            header: "Đối tượng",
            accessorKey: "doiTuong",
            accessorFn: () => "Học viên"
        },
        {
            header: "Mã khóa học",
            accessorKey: "courseTimeCluster.course.code"
        },
        {
            header: "Tên khóa học",
            accessorKey: "courseTimeCluster.course.name"
        },
        {
            header: "Cụm thời gian",
            accessorKey: "courseTimeCluster.timeCluster.name"
        },
        {
            header: "Chi nhánh",
            accessorKey: "courseTimeCluster.course.branch.name"
        },
        {
            header: "Loại thu",
            accessorKey: "receiptType"
        },
        {
            header: "Số phiếu thu",
            accessorKey: "receiptCode"
        },
        {
            header: "Đã thu",
            accessorKey: "receiptPrice"
        },
        {
            header: "Ghi chú phiếu thu",
            accessorKey: "ghiChu"
        },
        {
            header: "Biên lai chuyển khoản",
            Cell: ({ row }) => {
                return <MyButton >Xem</MyButton>
            }
        },

    ], []);

    if (courseStudentsQuery.isLoading) return "Đang tải dữ liệu...";
    if (courseStudentsQuery.isError) return courseStudentsQuery.error.message;
    return (
        <MyDataTable
            columns={columns}
            data={courseStudentsQuery.data!}
            enableRowSelection
            initialState={{
                density: "md",
                pagination: { pageIndex: 0, pageSize: 10 },
                columnPinning: {
                    left: ["isCheck"]
                }
            }}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <MyButtonModalExport columns={[]} data={[]}></MyButtonModalExport>
                </Group>
            )}

        />
    )
}
