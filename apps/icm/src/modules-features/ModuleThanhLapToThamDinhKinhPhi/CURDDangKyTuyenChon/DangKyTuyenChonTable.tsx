import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonDeleteList, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DangKyTuyenChonViewModel } from "../interfaces/ThanhLapToThamDinhKinhPhiViewModel";
import DangKyTuyenChonCreate from "./DangKyTuyenChonCreate";

export default function DangKyTuyenChonTable({ data }: { data?: DangKyTuyenChonViewModel[] }) {
    const Q_DangKy = useQuery({
        queryKey: ["dangKyTuyenChonData"],
        queryFn: () => {
            return data?.filter(item => item.suitability === "Phù hợp") || [];
        }
    })

    const columns = useMemo<MRT_ColumnDef<DangKyTuyenChonViewModel>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "code" },
        { header: "Tên đề tài", accessorKey: "name", size: 300 },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Chủ nhiệm", accessorKey: "leader" },
        {
            header: "Đánh giá phù hợp", accessorKey: "score", accessorFn: (row) => {
                return row.score + "/5"
            }
        },
        { header: "Đánh giá của hội đồng", accessorKey: "suitability" },
        { header: "Kiến nghị", accessorKey: "comment", size: 300 },
    ], []);

    return (
        <MyDataTable
            columns={columns}
            data={Q_DangKy.data || []}
            enableRowSelection={true}
            enableRowNumbers={false}
            renderTopToolbarCustomActions={({ table }) => (
                <>
                    <DangKyTuyenChonCreate data={Q_DangKy.data || []} />
                    <MyButton crudType="export" />
                    <MyButtonDeleteList
                        onSubmit={() => { }}
                        contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")}
                    />
                </>
            )
            }
        />
    );
}

