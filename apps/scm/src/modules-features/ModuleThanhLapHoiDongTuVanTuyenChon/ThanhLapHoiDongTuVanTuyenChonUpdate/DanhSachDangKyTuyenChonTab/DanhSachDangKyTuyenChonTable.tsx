import { MyButton, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DanhSachDangKyTuyenChonDelete from "./DanhSachDangKyTuyenChonDelete";
import DanhSachDangKyTuyenChonDeleteList from "./DanhSachDangKyTuyenChonDeleteList";
import DanhSachDangKyTruyenChonTable from "./DanhSachDangKyTruyenChonTable";

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
        { header: "Mã đăng ký", accessorKey: "maDangKy" },
        { header: "Tên đề tài", accessorKey: "tenDeTai" },
        { header: "Chủ nhiệm", accessorKey: "chuNhiem" },
        { header: "Lĩnh vực", accessorKey: "linhVuc" },
        { header: "Tổng kinh phí", accessorKey: "tongKinhPhi" },
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
    {
        id: 1,
        maDangKy: "DKTC2025001",
        tenDeTai: "Nghiên cứu phát triển vật liệu composite mới chịu nhiệt cao",
        chuNhiem: "Nguyễn Văn A",
        linhVuc: "Vật liệu tiên tiến",
        tongKinhPhi: "250.000.000 VND",
    },
    {
        id: 2,
        maDangKy: "DKTC2025002",
        tenDeTai: "Ứng dụng AI trong phân tích dữ liệu y tế",
        chuNhiem: "Trần Thị B",
        linhVuc: "Công nghệ thông tin; Y sinh",
        tongKinhPhi: "320.000.000 VND",
    },
    {
        id: 3,
        maDangKy: "DKTC2025003",
        tenDeTai: "Đánh giá hiệu quả các biện pháp giảm ô nhiễm không khí tại thành phố X",
        chuNhiem: "Lê Văn C",
        linhVuc: "Môi trường; Khoa học xã hội",
        tongKinhPhi: "180.000.000 VND",
    },
    {
        id: 4,
        maDangKy: "DKTC2025004",
        tenDeTai: "Nghiên cứu về tác động của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
        chuNhiem: "Phạm Thị D",
        linhVuc: "Kinh tế; Tâm lý học",
        tongKinhPhi: "120.000.000 VND",
    },
    {
        id: 5,
        maDangKy: "DKTC2025005",
        tenDeTai: "Phát triển hệ thống giám sát nông nghiệp thông minh sử dụng IoT",
        chuNhiem: "Hoàng Minh E",
        linhVuc: "Nông nghiệp; Công nghệ thông tin",
        tongKinhPhi: "280.000.000 VND",
    },
];