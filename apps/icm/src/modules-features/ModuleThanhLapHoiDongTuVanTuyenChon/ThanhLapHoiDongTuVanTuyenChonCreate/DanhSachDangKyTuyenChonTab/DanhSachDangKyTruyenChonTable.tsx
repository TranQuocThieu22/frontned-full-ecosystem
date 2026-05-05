import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface IDangKyTruyenChon {
    id: number;
    tenDeTai: string;
    thoiGianThucHien: string;
    tongKinhPhi: string;
    linhVuc: string;
    chuNhiem: string;
}

export default function DanhSachDangKyTruyenChonTable() {
    const disclosure = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<IDangKyTruyenChon>[]>(() => [
        { header: "Tên đề tài", accessorKey: "tenDeTai", size: 250 },
        { header: "Thời gian thực hiện", accessorKey: "thoiGianThucHien", size: 120 },
        { header: "Tổng kinh phí thực hiện", accessorKey: "tongKinhPhi", size: 150 },
        { header: "Lĩnh vực", accessorKey: "linhVuc", size: 180 },
        { header: "Chủ nhiệm đề tài", accessorKey: "chuNhiem", size: 150 },
    ], []);

    return (
        <MyButtonModal title="Danh sách đăng ký truyền chọn" modalSize="80vw" crudType="create" disclosure={disclosure}  >
            <MyDataTable
                enableRowSelection
                columns={columns}
                data={mockData}
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <MyButton crudType="select" onClick={() => {
                            disclosure[1].close();
                        }}>Chọn</MyButton>
                    </>
                )}
            />
        </MyButtonModal>
    );
}

const mockData: IDangKyTruyenChon[] = [
    {
        id: 1,
        tenDeTai: "Nghiên cứu ứng dụng Blockchain trong quản lý văn bằng chứng chỉ",
        thoiGianThucHien: "12 tháng",
        tongKinhPhi: "150.000.000 VND",
        linhVuc: "Công nghệ thông tin",
        chuNhiem: "Nguyễn Văn A",
    },
    {
        id: 2,
        tenDeTai: "Phân tích tác động của biến đổi khí hậu đến nông nghiệp địa phương",
        thoiGianThucHien: "18 tháng",
        tongKinhPhi: "200.000.000 VND",
        linhVuc: "Nông nghiệp",
        chuNhiem: "Hoàng Thị D",
    },
    {
        id: 3,
        tenDeTai: "Phát triển hệ thống cảnh báo sớm lũ lụt dựa trên AI",
        thoiGianThucHien: "15 tháng",
        tongKinhPhi: "180.000.000 VND",
        linhVuc: "Kỹ thuật; Môi trường",
        chuNhiem: "Đặng Thị H",
    },
    {
        id: 4,
        tenDeTai: "Nghiên cứu các giải pháp giảm thiểu rác thải nhựa trong trường học",
        thoiGianThucHien: "10 tháng",
        tongKinhPhi: "90.000.000 VND",
        linhVuc: "Môi trường",
        chuNhiem: "Phạm Thị D",
    },
];

