'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset"
import useQ_Exam_GetExamAddress from "@/hooks/query-hooks/Exam/useQ_Exam_GetExamAddress"
import { Group } from "@mantine/core"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import F_w9e9qi813x_AddRoom from "./F_w9e9qi813x_AddRoom"
import F_w9e9qi813x_Delete from "./F_w9e9qi813x_Delete"
import useS_w9e9qi813x from "./useS_w9e9qi813x"
import { IExamAddress } from "@/interfaces/examAdress"
interface I {
    maPhong?: string,
    tenPhong?: string,
    chiNhanh?: string,
    day?: string,
    sucChuaHoc?: number,
    sucChuaThi?: number,
    tinhChatPhong?: string
}

export default function F_w9e9qi813x_Read() {
    const store = useS_w9e9qi813x()
    const query = useQ_Exam_GetExamAddress({
        examId: store.state.examId?.toString(),
        options: {
            enabled: store.state.examId != 0
        }
    })


    const columns = useMemo<MRT_ColumnDef<IExamAddress>[]>(() => [
        {
            header: "Mã phòng",
            accessorKey: "address.code"
        },
        {
            header: "Tên phòng",
            accessorKey: "address.name"
        },
        {
            header: "Chi nhánh",
            accessorKey: "branch.name"
        },
        {
            header: "Dãy",
            accessorKey: "address.block"
        },
        {
            header: "Sức chứa học",
            accessorKey: "address.capacity"
        },
        {
            header: "Sức chứa thi",
            accessorKey: "address.testCapacity"
        },
        {
            header: "Tính chất phòng",
            accessorKey: "address.roomType.name"
        }
    ], [store.state.examId])
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyFieldset title="Danh sách phòng">
            <MyDataTable
                columns={columns}
                data={query.data! || []}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_w9e9qi813x_AddRoom examAdressInit={query.data!} />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_w9e9qi813x_Delete data={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    )
}
