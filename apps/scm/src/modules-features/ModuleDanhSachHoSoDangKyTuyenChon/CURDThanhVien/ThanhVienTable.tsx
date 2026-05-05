import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonDeleteList, MyDataTable, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ThanhVienViewModel } from "../interfaces/HoSoDangKyTuyenChonViewModel";
import ThanhVienCreate from "./ThanhVienCreate";
import ThanhVienDelete from "./ThanhVienDelete";

export default function ThanhVienTable({ data }: { data?: ThanhVienViewModel[] }) {
    const Q_ThanhVien = useQuery({
        queryKey: ["ThanhVien"],
        queryFn: () => {
            return data || [];
        }
    })

    const columns = useMemo<MRT_ColumnDef<ThanhVienViewModel>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Ngày sinh",
            accessorKey: "birthDate",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Đơn vị",
            accessorKey: "department",
            size: 200
        },
        {
            header: "Chức vụ",
            accessorKey: "position",
        },
        {
            header: "Vai trò",
            accessorKey: "role",
            size: 250,
            accessorFn: (originalRow) => {
                return <MySelect
                    data={roleOptions}
                    defaultValue={originalRow.role}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            }
        },
    ], [])

    return (
        <MyDataTable
            columns={columns}
            data={Q_ThanhVien.data || []}
            enableRowSelection={true}
            enableRowNumbers={false}
            renderTopToolbarCustomActions={({ table }) => (
                <>
                    <ThanhVienCreate data={Q_ThanhVien.data || []} />
                    <MyButton crudType="export" />
                    <MyButtonDeleteList
                        onSubmit={() => { }}
                        contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")}
                    />
                </>
            )
            }
            renderRowActions={({ row }) => {
                return <ThanhVienDelete id={row.original.id} code={row.original.code} />
            }}
        />
    );
}

const roleOptions = [
    { value: "Chủ nhiệm đề tài", label: "Chủ nhiệm đề tài" },
    { value: "Thành viên nghiên cứu", label: "Thành viên nghiên cứu" },
    { value: "Thành viên kỹ thuật", label: "Thành viên kỹ thuật" },
    { value: "Thành viên tư vấn", label: "Thành viên tư vấn" },
    { value: "Thành viên hỗ trợ", label: "Thành viên hỗ trợ" },
]