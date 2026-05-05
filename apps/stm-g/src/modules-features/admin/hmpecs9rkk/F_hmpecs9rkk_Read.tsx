'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyButtonImport from "@/components/Buttons/ButtonImport/MyButtonImport";
import MyButtonModalExport from "@/components/Buttons/ButtonModalExport/MyButtonModalExport";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { ENUM_GENDER, ENUM_RECEIPT_TYPE } from "@/constants/enum/global";
import useQ_Exam_GetStudent from "@/hooks/query-hooks/Exam/useQ_Exam_GetStudent";
import { ICourseRegistration } from "@/interfaces/courseRegistration";
import { ICourseSection } from "@/interfaces/courseSection";
import { utils_notification_show } from "@/utils/notification";
import { Group } from "@mantine/core";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export default function F_hmpecs9rkk_Read() {
    const Exam_GetStudent_Query = useQ_Exam_GetStudent({
        body: {
            pageNumber: 0,
            pageSize: 0
        }
    })
    const editedIsCheck = useState<Record<string, ICourseRegistration>>({})
    const columns = useMemo<MRT_ColumnDef<ICourseSection>[]>(() => [
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
            accessorFn(originalRow: any) {
                return ENUM_GENDER[originalRow.user?.gender!]
            },

        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.user?.dateOfBirth!))
        },
        {
            header: "Mã khóa thi",
            accessorKey: "exam.code"
        },
        {
            header: "Tên khóa thi",
            accessorKey: "exam.name"
        },
        {
            header: "Đối tượng",
            accessorKey: "doiTuong",
            accessorFn: () => "Học viên"
        },
        {
            header: "Ngày thi",
            accessorKey: "exam.officialExamDate",
            Cell: ({ row }) => {
                return utils_date_dateToDDMMYYYString(new Date(row.original.exam?.officialExamDate!))
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
            header: "Ngày cấp CCCD",
        },
        {
            header: "Nơi cấp CCCD",
        },
        {
            header: "Loại thu",
            accessorFn: (row) => {
                return row.receiptType
            },
            Cell: ({ cell }) => {
                return ENUM_RECEIPT_TYPE[cell.getValue<number>()]
            }
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
            accessorKey: "receiptNote"
        },
        {
            header: "Biên lai chuyển khoản",
            accessorFn: (row) => {
                return <MyButton color="blue" >Xem</MyButton>
            }
        },
        // {
        //     header: "Hợp lệ",
        //     size: 90,
        //     enableColumnDragging: false,
        //     enableColumnActions: false,
        //     enableSorting: false,
        //     enableResizing: false,
        //     accessorKey: "isCheck",
        //     accessorFn: (row) => (
        //         <Checkbox
        //             onChange={(e) => {
        //                 editedIsCheck[1](prev => ({ ...prev, [row.id!]: { ...row, isCheck: e.target.checked } }))
        //             }}
        //             defaultChecked={row.isCheck}
        //         />
        //     )
        // },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.modifiedWhen!))
        },

        // {
        //     header: "Người cập nhật",
        //     accessorKey: "modifiedFullName"
        // },
        // {
        //     header: "Kiểm tra",
        //     accessorKey: "check",
        //     accessorFn: (row) => <F_hmpecs9rkk_Check values={{
        //         id: row.id,
        //         code: row.code,
        //         name: row.name,
        //         concurrencyStamp: row.concurrencyStamp,
        //         isEnabled: true,
        //         isCheck: row.isCheck,
        //         note: row.note
        //     }} />
        // }
    ], []);

    function handleExportStructure() {
        utils_notification_show({ crudType: "export_structure" })
    }
    if (Exam_GetStudent_Query.isLoading) return "Đang tải dữ liệu...";
    if (Exam_GetStudent_Query.isError) return Exam_GetStudent_Query.error.message;
    return (
        <MyDataTable
            columns={columns}
            data={Exam_GetStudent_Query.data!}
            enableRowSelection
            initialState={{
                density: "md",
                pagination: { pageIndex: 0, pageSize: 30 },
                columnVisibility: {
                    nguoiCapNhat: false,
                    ngayCapNhat: false,
                    modifiedWhen: false,
                    modifiedFullName: false
                },
                columnPinning: {
                    right: ["mrt-row-actions", "check"],
                    left: ["isCheck"]
                }
            }}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <MyButtonImport onExportStructure={handleExportStructure} />
                    <MyButtonModalExport columns={[]} data={[]}></MyButtonModalExport>
                    <MyButton >Xác nhận</MyButton>
                </Group>
            )}
        />
    )
}
