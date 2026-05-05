import { MyButton, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DanhSachDangKyTruyenChonTable from "./DanhSachDangKyTruyenChonTable";
import DanhSachDangKyTuyenChonDelete from "./DanhSachDangKyTuyenChonDelete";
import DanhSachDangKyTuyenChonDeleteList from "./DanhSachDangKyTuyenChonDeleteList";

export interface IDangKyTuyenChon {
    id: number;
    maDangKy: string;
    tenDeTai: string;
    chuNhiem: string;
    linhVuc: string;
    tongKinhPhi: string;
}

export default function DanhSachDangKyTuyenChonTable() {
    const columns = useMemo<MRT_ColumnDef<IDangKyTuyenChon>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "maDangKy", },
        { header: "Tên đề tài", accessorKey: "tenDeTai", },
        { header: "Chủ nhiệm", accessorKey: "chuNhiem", },
        { header: "Lĩnh vực", accessorKey: "linhVuc", },
        { header: "Tổng kinh phí", accessorKey: "tongKinhPhi", },
    ], []);

    return (
        <MyDataTable
            enableRowSelection
            columns={columns}
            data={mockData}
            renderTopToolbarCustomActions={({ table }) => (
                <>
                    <DanhSachDangKyTruyenChonTable />
                    <MyButton crudType="export" />
                    <DanhSachDangKyTuyenChonDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <DanhSachDangKyTuyenChonDelete id={row.original.id!} code={row.original.maDangKy!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

const mockData: IDangKyTuyenChon[] = [
];