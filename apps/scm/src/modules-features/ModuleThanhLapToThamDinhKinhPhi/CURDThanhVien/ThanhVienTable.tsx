import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonDeleteList, MyDataTable, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ThanhVienViewModel } from "../interfaces/ThanhLapToThamDinhKinhPhiViewModel";
import ThanhVienCreate from "./ThanhVienCreate";
import ThanhVienDelete from "./ThanhVienDelete";

export default function ThanhVienTable( { data }: { data?: ThanhVienViewModel[] }) {
    const Q_ThanhVien = useQuery({
        queryKey: ["ThanhVien"],
        queryFn: () => {
            return data || [];
        }
    })

    const columns = useMemo<MRT_ColumnDef<ThanhVienViewModel>[]>(() => [
        {
            header: "Mã thành viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "department",
        },
        {
            header: "Chức danh",
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
    { value: "Tổ trưởng", label: "Tổ trưởng" },
    { value: "Thư ký", label: "Thư ký" },
    { value: "Thành viên", label: "Thành viên" },
]

