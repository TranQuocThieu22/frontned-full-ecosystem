import { MyButton, MyButtonViewPDF, MyCenterFull, MyCheckbox, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IKiemTraHoanThienThuyetMinhViewModel } from "./interfaces/KiemTraHoanThienThuyetMinhViewModel";
import KiemTraHoanThienThuyetMinhApprove from "./KiemTraHoanThienThuyetMinhApprove";
// import PheDuyetThuyetMinhApproveButton from "./PheDuyetThuyetMinhApproveButton";

export default function PheDuyetThuyetMinhTable() {
    const columns = useMemo<MRT_ColumnDef<IKiemTraHoanThienThuyetMinhViewModel>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "maDangKy" },
        { header: "Tên đề tài", accessorKey: "tenDeTai", size: 300 },
        { header: "Thời gian thực hiện", accessorKey: "thoiGianThucHien" },
        { header: "Cấp quản lý", accessorKey: "capQuanLy" },
        { header: "Tổng kinh phí thực hiện", accessorKey: "tongKinhPhiThucHien" },
        { header: "Phương thức khoán chi", accessorKey: "phuongThucKhoanChi" },
        { header: "Loại hình đề tài", accessorKey: "loaiHinhDeTai" },
        { header: "Lĩnh vực", accessorKey: "linhVuc" },
        { header: "Chủ nhiệm đề tài", accessorKey: "chuNhiemDeTai" },
        { header: "Tổ chức chủ trì đề tài", accessorKey: "toChucChuTriDeTai" },
        { header: "Tình trạng của đề tài", accessorKey: "tinhTrangCuaDeTai" },
        {
            header: "File thuyết minh", accessorKey: "fileThuyetMinh",
            accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <MyButtonViewPDF />
                    </MyCenterFull>
                )
            }
        },
        { header: "Trạng thái duyệt", accessorKey: "trangThaiDuyet" },
        { header: "Nhận xét", accessorKey: "nhanXet" },
        {
            header: "Gửi thông báo", accessorKey: "guiThongBao",
            Cell: ({ row }) => (
                <MyCenterFull>
                    <MyCheckbox checked={!!row.original.guiThongBao} onChange={() => { }} />
                </MyCenterFull>
            )
        },
        {
            header: "File thuyết minh hoàn thiện", accessorKey: "fileThuyetMinhHoanThanh",
            accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <MyButtonViewPDF />
                    </MyCenterFull>
                )
            }
        },
        { header: "Trạng thái kiểm tra", accessorKey: "trangThaiHoanThanh" },
        { header: "Nhận xét", accessorKey: "nhanXetHoanThanh" },
        {
            header: "Đã gửi thông báo", accessorKey: "guiThongBaoHoanThanh",
            Cell: ({ row }) => (
                <MyCenterFull>
                    <MyCheckbox checked={!!row.original.guiThongBaoHoanThanh} onChange={() => { }} />
                </MyCenterFull>
            )
        }
    ], []);

    return (
        <MyFieldset title={"Danh sách thuyết minh đề tài"}>
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
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
                            <KiemTraHoanThienThuyetMinhApprove data={row.original} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFieldset>
    )
}

const mockData: IKiemTraHoanThienThuyetMinhViewModel[] = [
    {
        id: 1,
        maDangKy: "DKNCKH2025001",
        tenDeTai: "Nghiên cứu ứng dụng Blockchain trong quản lý tài sản số",
        thoiGianThucHien: "12 tháng",
        capQuanLy: "Cấp trường",
        tongKinhPhiThucHien: "150.000.000 VND",
        phuongThucKhoanChi: "Khoán đến sản phẩm cuối cùng",
        loaiHinhDeTai: "Nghiên cứu ứng dụng",
        linhVuc: "Công nghệ thông tin",
        chuNhiemDeTai: "Nguyễn Văn A",
        toChucChuTriDeTai: "Khoa Công nghệ phần mềm",
        tinhTrangCuaDeTai: "Mới",
        fileThuyetMinh: "abc.pdf",
        trangThaiDuyet: "Đồng ý",
        nhanXet: 'Đề tài có tính khả thi cao, phù hợp với định hướng nghiên cứu của trường',
        guiThongBao: true,
        fileThuyetMinhHoanThanh: "abcHoanThanh.pdf",
        trangThaiHoanThanh: "Đạt yêu cầu",
        nhanXetHoanThanh: '',
        guiThongBaoHoanThanh: false,
    },
    {
        id: 2,
        maDangKy: "DKNCKH2025002",
        tenDeTai: "Phát triển hệ thống IoT giám sát chất lượng không khí đô thị thông minh",
        thoiGianThucHien: "18 tháng",
        capQuanLy: "Cấp Bộ GD&ĐT",
        tongKinhPhiThucHien: "500.000.000 VND",
        phuongThucKhoanChi: "Khoán từng phần",
        loaiHinhDeTai: "Triển khai thực nghiệm",
        linhVuc: "Khoa học môi trường; Kỹ thuật điện tử",
        chuNhiemDeTai: "Trần Thị B",
        toChucChuTriDeTai: "Viện Khoa học & Công nghệ",
        tinhTrangCuaDeTai: "Mới",
        fileThuyetMinh: "abc.pdf",
        trangThaiDuyet: "Yêu cầu hiệu chỉnh",
        nhanXet: 'Dự toán kinh phí chưa hợp lý ở một số khoản mục, yêu cầu điều chỉnh lại.',
        guiThongBao: false,
        fileThuyetMinhHoanThanh: "abcHoanThanh.pdf",
        trangThaiHoanThanh: "Đạt yêu cầu",
        nhanXetHoanThanh: '',
        guiThongBaoHoanThanh: false,
    },
    {
        id: 3,
        maDangKy: "DKNCKH2025003",
        tenDeTai: "Nghiên cứu tác động của biến đổi khí hậu đến đa dạng sinh học tại khu vực Tây Nguyên",
        thoiGianThucHien: "24 tháng",
        capQuanLy: "Cấp Bộ GD&ĐT",
        tongKinhPhiThucHien: "350.000.000 VND",
        phuongThucKhoanChi: "Khoán đến sản phẩm cuối cùng",
        loaiHinhDeTai: "Nghiên cứu cơ bản",
        linhVuc: "Khoa học môi trường; Sinh học",
        chuNhiemDeTai: "Lê Thị C",
        toChucChuTriDeTai: "Khoa Môi trường & Tài nguyên",
        tinhTrangCuaDeTai: "Mới",
        fileThuyetMinh: "abc.pdf",
        trangThaiDuyet: "Không đồng ý",
        nhanXet: 'Đề tài chưa thể hiện rõ tính cấp thiết và khả năng áp dụng trong bối cảnh thực tế của nhà trường',
        guiThongBao: true,
        fileThuyetMinhHoanThanh: "abcHoanThanh.pdf",
        trangThaiHoanThanh: "Đạt yêu cầu",
        nhanXetHoanThanh: '',
        guiThongBaoHoanThanh: false,
    },
];
