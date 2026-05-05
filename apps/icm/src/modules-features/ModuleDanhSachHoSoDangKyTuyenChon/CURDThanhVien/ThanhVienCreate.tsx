import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ThanhVienViewModel, VienChucVuViewModel } from "../interfaces/HoSoDangKyTuyenChonViewModel";

export default function ThanhVienCreate({ data }: { data: ThanhVienViewModel[] }) {
    const disc = useDisclosure();

    const Q_VienChucVu = useQuery({
        queryKey: ["vien-chuc-vu"],
        queryFn: () => {
            return mockData;
        }
    })

    const columns = useMemo<MRT_ColumnDef<VienChucVuViewModel>[]>(() => [
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
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Số điện thoại",
            accessorKey: "phone",
        },
    ], [])

    return (
        <MyButtonModal modalSize="70%" disclosure={disc} label="Thêm" title="Danh sách viên chức">
            <MyDataTable
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <MyButton onClick={() => disc[1].close()}>Chọn</MyButton>
                )}
                enableRowNumbers={false}
                columns={columns}
                data={Q_VienChucVu.data || []}
            />
        </MyButtonModal>
    );
}


const mockData: VienChucVuViewModel[] = [
    {
        id: 1,
        code: "VC001",
        name: "Nguyễn Thị Thảo",
        birthDate: "15/03/1980",
        gender: "Nữ",
        department: "Khoa Công nghệ thông tin",
        position: "Giảng viên chính",
        email: "thao.nt@example.edu.vn",
        phone: "0901234567"
    },
    {
        id: 2,
        code: "VC002",
        name: "Lê Văn Hùng",
        birthDate: "22/11/1975",
        gender: "Nam",
        department: "Phòng Tổ chức Cán bộ",
        position: "Trưởng phòng",
        email: "hung.lv@example.edu.vn",
        phone: "0987654321"
    },
    {
        id: 3,
        code: "VC003",
        name: "Phạm Thu Lan",
        birthDate: "05/07/1988",
        gender: "Nữ",
        department: "Khoa Kinh tế",
        position: "Chuyên viên",
        email: "lan.pt@example.edu.vn",
        phone: "0919876543"
    },
    {
        id: 4,
        code: "VC004",
        name: "Trần Đình Nam",
        birthDate: "10/01/1970",
        gender: "Nam",
        department: "Khoa Vật lý",
        position: "Giảng viên cao cấp",
        email: "nam.td@example.edu.vn",
        phone: "0978123456"
    },
    {
        id: 5,
        code: "VC005",
        name: "Đỗ Minh Anh",
        birthDate: "20/09/1992",
        gender: "Nữ",
        department: "Phòng Đào tạo",
        position: "Chuyên viên",
        email: "anh.dm@example.edu.vn",
        phone: "0945678901"
    },
    {
        id: 6,
        code: "VC006",
        name: "Hoàng Văn Kiên",
        birthDate: "03/01/1983",
        gender: "Nam",
        department: "Khoa Khoa học Tự nhiên",
        position: "Giảng viên",
        email: "kien.hv@example.edu.vn",
        phone: "0932109876"
    },
    {
        id: 7,
        code: "VC007",
        name: "Vũ Thị Mai",
        birthDate: "12/04/1977",
        gender: "Nữ",
        department: "Phòng Kế hoạch Tài chính",
        position: "Kế toán trưởng",
        email: "mai.vt@example.edu.vn",
        phone: "0967890123"
    },
    {
        id: 8,
        code: "VC008",
        name: "Nguyễn Đức Bình",
        birthDate: "25/06/1985",
        gender: "Nam",
        department: "Khoa Ngoại ngữ",
        position: "Giảng viên",
        email: "binh.nd@example.edu.vn",
        phone: "0912345678"
    },
    {
        id: 9,
        code: "VC009",
        name: "Đặng Thị Hoa",
        birthDate: "08/08/1990",
        gender: "Nữ",
        department: "Thư viện",
        position: "Thủ thư",
        email: "hoa.dt@example.edu.vn",
        phone: "0943210987"
    },
    {
        id: 10,
        code: "VC010",
        name: "Phan Anh Tú",
        birthDate: "17/02/1982",
        gender: "Nam",
        department: "Khoa Xã hội học",
        position: "Giảng viên",
        email: "tu.pa@example.edu.vn",
        phone: "0934567890"
    },
    {
        id: 11,
        code: "VC011",
        name: "Lý Thị Hương",
        birthDate: "29/05/1979",
        gender: "Nữ",
        department: "Phòng Quan hệ Quốc tế",
        position: "Chuyên viên",
        email: "huong.lt@example.edu.vn",
        phone: "0965432109"
    },
    {
        id: 12,
        code: "VC012",
        name: "Ngô Quang Vinh",
        birthDate: "14/10/1986",
        gender: "Nam",
        department: "Khoa Môi trường",
        position: "Giảng viên",
        email: "vinh.nq@example.edu.vn",
        phone: "0918765432"
    },
    {
        id: 13,
        code: "VC013",
        name: "Bùi Thị Thanh",
        birthDate: "01/01/1991",
        gender: "Nữ",
        department: "Phòng Công tác Sinh viên",
        position: "Chuyên viên",
        email: "thanh.bt@example.edu.vn",
        phone: "0976543210"
    },
    {
        id: 14,
        code: "VC014",
        name: "Trịnh Duy Khang",
        birthDate: "19/07/1984",
        gender: "Nam",
        department: "Khoa Cơ khí",
        position: "Giảng viên",
        email: "khang.td@example.edu.vn",
        phone: "0937890123"
    },
    {
        id: 15,
        code: "VC015",
        name: "Lương Thị Ngọc",
        birthDate: "07/12/1973",
        gender: "Nữ",
        department: "Phòng Quản lý Khoa học",
        position: "Trưởng phòng",
        email: "ngoc.lt@example.edu.vn",
        phone: "0961234567"
    },
    {
        id: 16,
        code: "VC016",
        name: "Đào Minh Quân",
        birthDate: "11/03/1989",
        gender: "Nam",
        department: "Khoa Kiến trúc",
        position: "Giảng viên",
        email: "quan.dm@example.edu.vn",
        phone: "0915678901"
    },
    {
        id: 17,
        code: "VC017",
        name: "Chu Thị Lan Hương",
        birthDate: "28/08/1981",
        gender: "Nữ",
        department: "Phòng Khảo thí & Đảm bảo CLGD",
        position: "Chuyên viên",
        email: "huong.ctl@example.edu.vn",
        phone: "0948765432"
    },
    {
        id: 18,
        code: "VC018",
        name: "Nguyễn Việt Hùng",
        birthDate: "04/09/1976",
        gender: "Nam",
        department: "Khoa Điện",
        position: "Giảng viên chính",
        email: "hung.nv@example.edu.vn",
        phone: "0939012345"
    },
    {
        id: 19,
        code: "VC019",
        name: "Tô Thị Mai Anh",
        birthDate: "23/02/1993",
        gender: "Nữ",
        department: "Trung tâm CNTT",
        position: "Chuyên viên",
        email: "anh.ttm@example.edu.vn",
        phone: "0962345678"
    },
    {
        id: 20,
        code: "VC020",
        name: "Phùng Quốc Đạt",
        birthDate: "09/05/1987",
        gender: "Nam",
        department: "Khoa Toán-Tin",
        position: "Giảng viên",
        email: "dat.pq@example.edu.vn",
        phone: "0917890123"
    }
]