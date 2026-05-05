'use client'
import { accountService } from "@/shared/APIs/accountService";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { ENUM_GENDER } from "@/constants/enum/global";
import { Account } from "@/shared/interfaces/account";
import { Group } from "@mantine/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function F_gt0cyzybu0_Read() {
    const getStudentList_query = useMyReactQuery({
        queryKey: ["getStudentList"],
        axiosFn: () => accountService.getStudentList()
    })

    const columns = useMemo<MRT_ColumnDef<Account>[]>(() => [
        {
            header: "Mã học viên",
            accessorKey: "code"
        },
        {
            header: "Họ và tên",
            accessorKey: "fullName"
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => {
                return ENUM_GENDER[row.gender!]
            }
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (originalRow) => originalRow.dateOfBirth ? utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth!)) : ''
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "CCCD",
            accessorKey: "identifier"
        },
        {
            header: "Ngày cấp",
            accessorKey: "identifierIssueDate",
            accessorFn: (originalRow) => originalRow.identifierIssueDate ? utils_date_dateToDDMMYYYString(new Date(originalRow.identifierIssueDate!)) : ''

        },
        {
            header: "Nơi cấp",
            accessorKey: "identifierIssuePlace"
        },
        {
            header: "Địa chỉ",
            accessorKey: "address"
        },

    ], [])
    if (getStudentList_query.isLoading) return "Đang tải dữ liệu..."
    if (getStudentList_query.isError) return "Đã có lỗi xảy ra!"
    return (
        <MyDataTable data={getStudentList_query.data!} columns={columns}

            renderTopToolbarCustomActions={() => (
                <Group>
                    <MyButton crudType="export" />
                </Group>
            )}
        />
    )
}
