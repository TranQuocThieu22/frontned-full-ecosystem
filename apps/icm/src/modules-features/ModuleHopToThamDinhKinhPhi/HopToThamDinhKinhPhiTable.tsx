import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import HopToThamDinhKinhPhiDetailButton from "./HopToThamDinhKinhPhiDetail/HopToThamDinhKinhPhiDetailButton";
import { IHopToThamDinhKinhPhiInfoViewModel } from "./interfaces/IHopToThamDinhKinhPhiInfoViewModel";

export default function HopToThamDinhKinhPhiTable() {
    const columns = useMemo<MRT_ColumnDef<IHopToThamDinhKinhPhiInfoViewModel>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "maDangKy" },
        { header: "Tên đề tài", accessorKey: "tenDeTai" },
        { header: "Mã tổ thẩm định", accessorKey: "maToThamDinh" },
        { header: "Tên tổ thẩm định", accessorKey: "tenToThamDinh" },
        { header: "Đánh giá chung", accessorKey: "danhGiaChung" },
        { header: "Phương thức khoán", accessorKey: "phuongThucKhoan" },
        { header: "Kiến nghị chung", accessorKey: "kienNghiChung" },
    ], []);

    return (
        <MyFieldset title={"Danh sách đăng ký tuyển chọn"}>
            <MyDataTable
                enableRowSelection
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <MyButton crudType="export" />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <HopToThamDinhKinhPhiDetailButton data={row.original} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFieldset>
    )
}

const mockData: IHopToThamDinhKinhPhiInfoViewModel[] = [
    {
        id: 1,
        maDangKy: "DKTC2025001",
        tenDeTai: "Nghiên cứu phát triển vật liệu composite mới chịu nhiệt cao",
        maToThamDinh: "TTD2025001",
        tenToThamDinh: "Tổ thẩm định kinh phí đợt 1/2025",
        danhGiaChung: "Đủ điều kiện thẩm định",
        phuongThucKhoan: "Khoán từng phần",
        kienNghiChung: 'Kinh phí hợp lý, cần theo dõi chi tiêu chặt chẽ.',
        filePath: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        fileDetail: {
            fileName: "hoSoThamDinh.pdf",
        },
    },
    {
        id: 2,
        maDangKy: "DKTC2025002",
        tenDeTai: "Ứng dụng AI trong phân tích dữ liệu y tế",
        maToThamDinh: "TTD2025002",
        tenToThamDinh: "Tổ thẩm định kinh phí lĩnh vực CNTT",
        danhGiaChung: "Đủ điều kiện thẩm định",
        phuongThucKhoan: "Khoán đến sản phẩm cuối cùng",
        kienNghiChung: 'Đề xuất kinh phí phù hợp với mục tiêu; khuyến nghị chi tiết hóa chi phí thiết bị.',
        filePath: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        fileDetail: {
            fileName: "hoSoThamDinh.pdf",
        },
    },
    {
        id: 3,
        maDangKy: "DKTC2025003",
        tenDeTai: "Đánh giá hiệu quả các biện pháp giảm ô nhiễm không khí tại thành phố X",
        maToThamDinh: "TTD2025001",
        tenToThamDinh: "Tổ thẩm định kinh phí đợt 1/2025",
        danhGiaChung: "Không đủ điều kiện thẩm định",
        phuongThucKhoan: "Khoán từng phần",
        kienNghiChung: 'Dự toán kinh phí chưa hợp lý; một số khoản mục vượt quá định mức quy định.',
        filePath: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        fileDetail: {
            fileName: "hoSoThamDinh.pdf",
        },
    },
    {
        id: 4,
        maDangKy: "DKTC2025004",
        tenDeTai: "Nghiên cứu về tác động của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
        maToThamDinh: "TTD2025002",
        tenToThamDinh: "Tổ thẩm định kinh phí lĩnh vực CNTT",
        danhGiaChung: "Đủ điều kiện thẩm định",
        phuongThucKhoan: "Khoán đến sản phẩm cuối cùng",
        kienNghiChung: 'Kinh phí đã được tối ưu; đề nghị bổ sung kế hoạch sử dụng ngân sách.',
        filePath: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        fileDetail: {
            fileName: "hoSoThamDinh.pdf",
        },
    },
];
