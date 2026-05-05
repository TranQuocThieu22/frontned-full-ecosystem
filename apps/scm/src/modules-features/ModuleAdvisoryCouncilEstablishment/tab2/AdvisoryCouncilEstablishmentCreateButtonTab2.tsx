

import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
// import { IStaffData } from "./AdvisoryCouncilEstablishmentTab2";

interface IStaffData {
    id: number;
    staffCode: string; // Mã viên chức
    fullName: string; // Họ tên
    dateOfBirth: string; // Ngày sinh (DD/MM/YYYY)
    gender: string; // Giới tính
    unit: string; // Đơn vị
    position: string; // Chức vụ
    email: string; // role
    phoneNumber: string;
}
export default function AdvisoryCouncilEstablishmentCreateButtonTab2() {
    const dis = useDisclosure();


    const AdvisoryCouncilEstablishmentCreateButtonTab2 = useQuery<
        IStaffData[]
    >({
        queryKey: ["AdvisoryCouncilEstablishmentCreateButtonTab2Data"],
        queryFn: async () => {
            return extendedStaffSampleData;
        },
        refetchOnWindowFocus: false,
    });

    const staffColumns: MRT_ColumnDef<IStaffData>[] = useMemo(() => [
        { header: "Mã viên chức", accessorKey: "staffCode" },
        { header: "Họ tên", accessorKey: "fullName" },
        { header: "Ngày sinh", accessorKey: "dateOfBirth" },
        { header: "Giới tính", accessorKey: "gender" },
        { header: "Đơn vị", accessorKey: "unit" },
        { header: "Chức vụ", accessorKey: "position" },
        { header: "Email", accessorKey: "email" },
        { header: "Số điện thoại", accessorKey: "phoneNumber" },
    ], []);

    return (
        <MyButtonModal
            modalSize={"100%"}
            label="Thêm"
            title="Danh sách viên chức"
            onSubmit={() => { }} disclosure={dis}        >
            <MyDataTable
                isError={AdvisoryCouncilEstablishmentCreateButtonTab2.isError}
                isLoading={AdvisoryCouncilEstablishmentCreateButtonTab2.isLoading}
                exportAble={false}
                enableRowSelection={true}
                columns={staffColumns}
                data={AdvisoryCouncilEstablishmentCreateButtonTab2.data || []}
                renderTopToolbarCustomActions={() => (<MyButton> Chọn</MyButton>)}
            />
        </MyButtonModal >

    );
}

export const extendedStaffSampleData: IStaffData[] = [
    {
        id: 1,
        staffCode: "VC001",
        fullName: "Nguyễn Thị Thảo",
        dateOfBirth: "15/03/1980",
        gender: "Nữ",
        unit: "Khoa Công nghệ thông tin",
        position: "Giảng viên chính",
        email: "thao.nt@example.edu.vn",
        phoneNumber: "0901234567",
    },
    {
        id: 2,
        staffCode: "VC002",
        fullName: "Lê Văn Hùng",
        dateOfBirth: "22/11/1975",
        gender: "Nam",
        unit: "Phòng Tổ chức Cán bộ",
        position: "Trưởng phòng",
        email: "hung.lv@example.edu.vn",
        phoneNumber: "0987654321",
    },
    {
        id: 3,
        staffCode: "VC003",
        fullName: "Phạm Thu Lan",
        dateOfBirth: "05/07/1988",
        gender: "Nữ",
        unit: "Khoa Kinh tế",
        position: "Chuyên viên",
        email: "lan.pt@example.edu.vn",
        phoneNumber: "0919876543",
    },
    {
        id: 4,
        staffCode: "VC004",
        fullName: "Trần Đình Nam",
        dateOfBirth: "10/01/1970",
        gender: "Nam",
        unit: "Khoa Vật lý",
        position: "Giảng viên cao cấp",
        email: "nam.td@example.edu.vn",
        phoneNumber: "0978123456",
    },
    {
        id: 5,
        staffCode: "VC005",
        fullName: "Đỗ Minh Anh",
        dateOfBirth: "20/09/1992",
        gender: "Nữ",
        unit: "Phòng Đào tạo",
        position: "Chuyên viên",
        email: "anh.dm@example.edu.vn",
        phoneNumber: "0945678901",
    },
    {
        id: 6,
        staffCode: "VC006",
        fullName: "Hoàng Văn Kiên",
        dateOfBirth: "03/01/1983",
        gender: "Nam",
        unit: "Khoa Học Tự nhiên",
        position: "Giảng viên",
        email: "kien.hv@example.edu.vn",
        phoneNumber: "0932109876",
    },
    {
        id: 7,
        staffCode: "VC007",
        fullName: "Vũ Thị Mai",
        dateOfBirth: "12/04/1977",
        gender: "Nữ",
        unit: "Phòng Kế hoạch Tài chính",
        position: "Kế toán trưởng",
        email: "mai.vt@example.edu.vn",
        phoneNumber: "0967890123",
    },
    {
        id: 8,
        staffCode: "VC008",
        fullName: "Nguyễn Doãn Bình",
        dateOfBirth: "25/06/1985",
        gender: "Nam",
        unit: "Khoa Ngoại ngữ",
        position: "Giảng viên",
        email: "binh.nd@example.edu.vn",
        phoneNumber: "0912345678",
    },
    {
        id: 9,
        staffCode: "VC009",
        fullName: "Đặng Thị Hoa",
        dateOfBirth: "08/08/1990",
        gender: "Nữ",
        unit: "Thư viện",
        position: "Thủ thư",
        email: "hoa.dt@example.edu.vn",
        phoneNumber: "0943210987",
    },
    {
        id: 10,
        staffCode: "VC010",
        fullName: "Phan Anh Tú",
        dateOfBirth: "17/02/1982",
        gender: "Nam",
        unit: "Khoa Xã hội học",
        position: "Giảng viên",
        email: "tu.pa@example.edu.vn",
        phoneNumber: "0934567890",
    },
    {
        id: 11,
        staffCode: "VC011",
        fullName: "Lý Thị Hương",
        dateOfBirth: "29/05/1979",
        gender: "Nữ",
        unit: "Phòng Quan hệ Quốc tế",
        position: "Trưởng phòng",
        email: "huong.lt@example.edu.vn",
        phoneNumber: "0965432109",
    },
    {
        id: 12,
        staffCode: "VC012",
        fullName: "Ngô Quang Vinh",
        dateOfBirth: "14/10/1986",
        gender: "Nam",
        unit: "Khoa Môi trường",
        position: "Giảng viên",
        email: "vinh.nq@example.edu.vn",
        phoneNumber: "0918765432",
    },
    {
        id: 13,
        staffCode: "VC013",
        fullName: "Bùi Thị Thanh",
        dateOfBirth: "01/01/1991",
        gender: "Nữ",
        unit: "Phòng Công tác Sinh viên",
        position: "Chuyên viên",
        email: "thanh.bt@example.edu.vn",
        phoneNumber: "0976543210",
    },
    {
        id: 14,
        staffCode: "VC014",
        fullName: "Trịnh Duy Khang",
        dateOfBirth: "19/07/1984",
        gender: "Nam",
        unit: "Khoa Cơ khí",
        position: "Giảng viên",
        email: "khang.td@example.edu.vn",
        phoneNumber: "0937890123",
    },
    {
        id: 15,
        staffCode: "VC015",
        fullName: "Lương Thị Ngọc",
        dateOfBirth: "07/12/1973",
        gender: "Nữ",
        unit: "Phòng Quản lý Khoa học",
        position: "Trưởng phòng",
        email: "ngoc.lt@example.edu.vn",
        phoneNumber: "0961234567",
    },
    {
        id: 16,
        staffCode: "VC016",
        fullName: "Đào Minh Quân",
        dateOfBirth: "11/03/1989",
        gender: "Nam",
        unit: "Khoa Kiến trúc",
        position: "Giảng viên",
        email: "quan.dm@example.edu.vn",
        phoneNumber: "0915678901",
    },
    {
        id: 17,
        staffCode: "VC017",
        fullName: "Chu Thị Lan Hương",
        dateOfBirth: "28/08/1981",
        gender: "Nữ",
        unit: "Phòng Khảo thí & Đảm bảo CLGD",
        position: "Chuyên viên",
        email: "huong.ctl@example.edu.vn",
        phoneNumber: "0946785432",
    },
    {
        id: 18,
        staffCode: "VC018",
        fullName: "Nguyễn Việt Hùng",
        dateOfBirth: "04/09/1976",
        gender: "Nam",
        unit: "Khoa Điện",
        position: "Giảng viên chính",
        email: "hung.nv@example.edu.vn",
        phoneNumber: "0901234567",
    },
    {
        id: 19,
        staffCode: "VC019",
        fullName: "Tô Thị Mai Anh",
        dateOfBirth: "23/02/1993",
        gender: "Nữ",
        unit: "Trung tâm CNTT",
        position: "Chuyên viên",
        email: "anh.ttm@example.edu.vn",
        phoneNumber: "0962345678",
    },
    {
        id: 20,
        staffCode: "VC020",
        fullName: "Phùng Quốc Đạt",
        dateOfBirth: "09/05/1987",
        gender: "Nam",
        unit: "Khoa Toán-Tin",
        position: "Giảng viên",
        email: "dat.pq@example.edu.vn",
        phoneNumber: "0976543210",
    },
];