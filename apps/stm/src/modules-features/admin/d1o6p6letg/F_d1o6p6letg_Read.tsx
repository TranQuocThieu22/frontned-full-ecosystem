'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MyFlexRow } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_d1o6p6letg_AssignmentWithdraw from "./F_d1o6p6letg_AssignmentWithdraw";
import F_d1o6p6letg_Reserve from "./F_d1o6p6letg_Reserve";

interface I {
    code?: string;
    fullName?: string;
    gender?: keyof typeof ENUM_GENDER;
    dateOfBirth?: string;
    phoneNumber?: string;
    email?: string;
    exam?: {
        code?: string;
        name?: string;
        officialExamDate?: string;
    };
    branch?: string;
    status?: string;
    decisionDate?: string;
    decisionName?: string;
    note?: string;
    modifiedWhen?: string;
    modifiedFullName?: string;
}

export default function F_d1o6p6letg_Read() {

    const Exam_GetStudent_Query = useQuery<I[]>({
        queryKey: ["Exam_GetStudent"],
        queryFn: async () => {
            return [
                {
                    code: "HV0001",
                    fullName: "Nguyễn Văn A",
                    gender: "Nam",
                    dateOfBirth: "1990-01-01",
                    phoneNumber: "0896585235",
                    email: "a@gmail.com",
                    exam: {
                        code: "DGT2401",
                        name: "Digital marketing 2024",
                        officialExamDate: "2025-03-15"
                    },
                    branch: "Thủ Đức",
                    status: "Hoãn thi",
                    decisionDate: "",
                    decisionName: "",
                    note: "",
                    modifiedWhen: "",
                    modifiedFullName: ""
                },
                {
                    code: "HV0002",
                    fullName: "Nguyễn Văn A",
                    gender: "Nam",
                    dateOfBirth: "1990-01-01",
                    phoneNumber: "0896585235",
                    email: "a@gmail.com",
                    exam: {
                        code: "DGT2401",
                        name: "Digital marketing 2024",
                        officialExamDate: "2025-03-15"
                    },
                    branch: "Thủ Đức",
                    status: "Chờ thi",
                    decisionDate: "",
                    decisionName: "",
                    note: "",
                    modifiedWhen: "",
                    modifiedFullName: ""
                }
            ]
        },
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã học viên",
            accessorKey: "code" // matches I.code
        },
        {
            header: "Họ tên",
            accessorKey: "fullName" // matches I.fullName
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth", // matches I.dateOfBirth
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.dateOfBirth!))
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber" // matches I.phoneNumber
        },
        {
            header: "Email",
            accessorKey: "email" // matches I.email
        },
        {
            header: "Mã khóa thi",
            accessorKey: "exam.code" // matches I.exam?.code (nested)
        },
        {
            header: "Tên khóa thi",
            accessorKey: "exam.name" // matches I.exam?.name (nested)
        },
        {
            header: "Ngày thi",
            accessorKey: "exam.officialExamDate", // matches I.exam?.officialExamDate (nested)
            Cell: ({ row }) => {
                return utils_date_dateToDDMMYYYString(new Date(row.original.exam?.officialExamDate!))
            }
        },
        {
            header: "Chi nhánh",
            accessorKey: "branch" // matches I.branch
        },
        {
            header: "Trạng thái",
            accessorKey: "status" // matches I.status
        },
        {
            header: "Ngày quyết định",
            accessorKey: "decisionDate", // matches I.decisionDate
            accessorFn: (row) => row.decisionDate ? utils_date_dateToDDMMYYYString(new Date(row.decisionDate)) : ""
        },
        {
            header: "Tên quyết định",
            accessorKey: "decisionName" // matches I.decisionName
        },
        {
            header: "Ghi chú",
            accessorKey: "note" // matches I.note
        },
        {
            header: "Biên lai chuyển khoản",
            Cell: ({ row }) => {
                return <MyButtonViewPDF label="xem" />
            }
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen", // matches I.modifiedWhen
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.modifiedWhen!))
        },

        {
            header: "Người cập nhật",
            accessorKey: "modifiedFullName" // matches I.modifiedFullName
        },
    ], []);

    return (
        <MyFieldset title="Danh sách đăng ký khóa thi">
            <MyDataTable
                columns={columns}
                data={Exam_GetStudent_Query.data ?? []}
                enableRowSelection
                initialState={{
                    density: "md",
                    columnVisibility: {
                        modifiedWhen: false,
                        modifiedFullName: false
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <MyFlexRow>
                            <F_d1o6p6letg_AssignmentWithdraw />
                            <F_d1o6p6letg_Reserve />
                        </MyFlexRow>
                    )
                }}
            />
        </MyFieldset>
    )
}