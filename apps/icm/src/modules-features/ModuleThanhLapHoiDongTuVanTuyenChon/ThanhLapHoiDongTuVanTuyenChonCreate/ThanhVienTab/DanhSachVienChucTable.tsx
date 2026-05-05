import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface IVienChuc {
    id: number;
    maVienChuc: string;
    hoTen: string;
    ngaySinh: Date;
    gioiTinh: string;
    donVi: string;
    chucVu: string;
    email: string;
    soDienThoai: string;
}

export default function DanhSachVienChucTable() {
    const disclosure = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<IVienChuc>[]>(() => [
        { header: "Mã viên chức", accessorKey: "maVienChuc", size: 100 },
        { header: "Họ tên", accessorKey: "hoTen" },
        {
            header: "Ngày sinh", accessorKey: "ngaySinh",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(row.ngaySinh)
            }
        },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Đơn vị", accessorKey: "donVi", size: 250 },
        { header: "Chức vụ", accessorKey: "chucVu" },
        { header: "Email", accessorKey: "email", size: 200 },
        { header: "Số điện thoại", accessorKey: "soDienThoai", size: 200 },
    ], []);

    return (
        <MyButtonModal title="Danh sách viên chức" modalSize="80vw" crudType="create" disclosure={disclosure}  >
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
const mockData: IVienChuc[] = [
    { id: 1, maVienChuc: "VC001", hoTen: "Nguyễn Thị Thảo", ngaySinh: new Date(1980, 2, 15), gioiTinh: "Nữ", donVi: "Khoa Công nghệ thông tin", chucVu: "Giảng viên chính", email: "thao.nt@example.edu.vn", soDienThoai: "0901234567" },
    { id: 2, maVienChuc: "VC002", hoTen: "Lê Văn Hùng", ngaySinh: new Date(1975, 10, 22), gioiTinh: "Nam", donVi: "Phòng Tổ chức Cán bộ", chucVu: "Trưởng phòng", email: "hung.lv@example.edu.vn", soDienThoai: "0987654321" },
    { id: 3, maVienChuc: "VC003", hoTen: "Phạm Thu Lan", ngaySinh: new Date(1988, 0, 5), gioiTinh: "Nữ", donVi: "Khoa Kinh tế", chucVu: "Chuyên viên", email: "lan.pt@example.edu.vn", soDienThoai: "0919876543" },
    { id: 4, maVienChuc: "VC004", hoTen: "Trần Đình Nam", ngaySinh: new Date(1970, 0, 10), gioiTinh: "Nam", donVi: "Khoa Vật lý", chucVu: "Giảng viên cao cấp", email: "nam.td@example.edu.vn", soDienThoai: "0978123456" },
    { id: 5, maVienChuc: "VC005", hoTen: "Đỗ Minh Anh", ngaySinh: new Date(1992, 2, 20), gioiTinh: "Nữ", donVi: "Phòng Đào tạo", chucVu: "Chuyên viên", email: "anh.dm@example.edu.vn", soDienThoai: "0945678901" },
    { id: 6, maVienChuc: "VC006", hoTen: "Hoàng Văn Kiên", ngaySinh: new Date(1983, 0, 3), gioiTinh: "Nam", donVi: "Khoa Khoa học Tự nhiên", chucVu: "Giảng viên", email: "kien.hv@example.edu.vn", soDienThoai: "0932109876" },
    { id: 7, maVienChuc: "VC007", hoTen: "Vũ Thị Mai", ngaySinh: new Date(1977, 3, 12), gioiTinh: "Nữ", donVi: "Phòng Kế hoạch Tài chính", chucVu: "Kế toán trưởng", email: "mai.vt@example.edu.vn", soDienThoai: "0967890123" },
    { id: 8, maVienChuc: "VC008", hoTen: "Nguyễn Đức Bình", ngaySinh: new Date(1985, 5, 25), gioiTinh: "Nam", donVi: "Khoa Ngoại ngữ", chucVu: "Giảng viên", email: "binh.nd@example.edu.vn", soDienThoai: "0912345678" },
    { id: 9, maVienChuc: "VC009", hoTen: "Đặng Thị Hoa", ngaySinh: new Date(1990, 7, 8), gioiTinh: "Nữ", donVi: "Thư viện", chucVu: "Thủ thư", email: "hoa.dt@example.edu.vn", soDienThoai: "0943210987" },
    { id: 10, maVienChuc: "VC010", hoTen: "Phan Anh Tú", ngaySinh: new Date(1982, 1, 17), gioiTinh: "Nam", donVi: "Khoa Xã hội học", chucVu: "Giảng viên", email: "tu.pa@example.edu.vn", soDienThoai: "0934567890" },
    { id: 11, maVienChuc: "VC011", hoTen: "Lý Thị Hương", ngaySinh: new Date(1979, 4, 29), gioiTinh: "Nữ", donVi: "Phòng Quan hệ Quốc tế", chucVu: "Chuyên viên", email: "huong.lt@example.edu.vn", soDienThoai: "0965432109" },
    { id: 12, maVienChuc: "VC012", hoTen: "Ngô Quang Vinh", ngaySinh: new Date(1986, 9, 14), gioiTinh: "Nam", donVi: "Khoa Môi trường", chucVu: "Giảng viên", email: "vinh.nq@example.edu.vn", soDienThoai: "0918765432" },
    { id: 13, maVienChuc: "VC013", hoTen: "Bùi Thị Thanh", ngaySinh: new Date(1991, 0, 1), gioiTinh: "Nữ", donVi: "Phòng Công tác Sinh viên", chucVu: "Chuyên viên", email: "thanh.bt@example.edu.vn", soDienThoai: "0976543210" },
    { id: 14, maVienChuc: "VC014", hoTen: "Trịnh Duy Khang", ngaySinh: new Date(1984, 6, 19), gioiTinh: "Nam", donVi: "Khoa Cơ khí", chucVu: "Giảng viên", email: "khang.td@example.edu.vn", soDienThoai: "0937890123" },
    { id: 15, maVienChuc: "VC015", hoTen: "Lương Thị Ngọc", ngaySinh: new Date(1973, 11, 7), gioiTinh: "Nữ", donVi: "Phòng Quản lý Khoa học", chucVu: "Trưởng phòng", email: "ngoc.lt@example.edu.vn", soDienThoai: "0961234567" },
    { id: 16, maVienChuc: "VC016", hoTen: "Đào Minh Quân", ngaySinh: new Date(1989, 2, 11), gioiTinh: "Nam", donVi: "Khoa Kiến trúc", chucVu: "Giảng viên", email: "quan.dm@example.edu.vn", soDienThoai: "0915678901" },
    { id: 17, maVienChuc: "VC017", hoTen: "Chu Thị Lan Hương", ngaySinh: new Date(1981, 7, 28), gioiTinh: "Nữ", donVi: "Phòng Khảo thí & Đảm bảo CLGD", chucVu: "Chuyên viên", email: "huong.ctl@example.edu.vn", soDienThoai: "0948765432" },
    { id: 18, maVienChuc: "VC018", hoTen: "Nguyễn Việt Hùng", ngaySinh: new Date(1976, 8, 4), gioiTinh: "Nam", donVi: "Khoa Điện", chucVu: "Giảng viên chính", email: "hung.nv@example.edu.vn", soDienThoai: "0939012345" },
    { id: 19, maVienChuc: "VC019", hoTen: "Tô Thị Mai Anh", ngaySinh: new Date(1993, 1, 23), gioiTinh: "Nữ", donVi: "Trung tâm CNTT", chucVu: "Chuyên viên", email: "anh.ttm@example.edu.vn", soDienThoai: "0962345678" },
    { id: 20, maVienChuc: "VC020", hoTen: "Phùng Quốc Đạt", ngaySinh: new Date(1987, 4, 9), gioiTinh: "Nam", donVi: "Khoa Toán-Tin", chucVu: "Giảng viên", email: "dat.pq@example.edu.vn", soDienThoai: "0917890123" },
];
