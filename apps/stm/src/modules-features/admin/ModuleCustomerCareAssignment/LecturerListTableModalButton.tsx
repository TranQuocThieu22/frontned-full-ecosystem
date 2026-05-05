import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots } from "@tabler/icons-react";
import { MyActionIconModal, MyButton, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface ILecturer {
    id?: number;
    lecturerId: string;        // Mã giảng viên
    fullName: string;          // Họ tên
    degree: string;            // Bậc học
    gender: string;            // Giới tính
    birthDate: Date;         // Ngày sinh
    phoneNumber: string;       // Số điện thoại
    email: string;            // Email
    skills: string;           // Kỹ năng
    branchs: string[];           // Chi nhánh
    programs: string[];         // Chương trình
}

export default function LecturerListTableModalButton() {
    const disclosure = useDisclosure();
    const columns = useMemo<MRT_ColumnDef<ILecturer>[]>(() => [
        {
            header: "Mã giảng viên",
            accessorKey: "lecturerId",
        },
        {
            header: "Họ tên",
            accessorKey: "fullName",
        },
        {
            header: "Bậc học",
            accessorKey: "degree",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "birthDate",
            Cell: ({ row }) => {
                return utils_date_dateToDDMMYYYString(row.original.birthDate)
            }
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Kỹ năng",
            accessorKey: "skills",
        },
        {
            header: "Chi nhánh",
            accessorKey: "branch",
            accessorFn: (row) => {
                return row.branchs.map((branch, index) =>
                    <Text key={index}>{branch}</Text>
                )
            }
        },
        {
            header: "Chương trình",
            accessorKey: "programs",
            accessorFn: (row) => {
                return row.programs.map((program, index) =>
                    <Text key={index}>{program}</Text>
                )
            }
        }
    ], []);

    return (
        <MyActionIconModal icon={<IconDots />} title="Danh sách giáo viên" modalSize="80vw" crudType="create" disclosure={disclosure}  >
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
        </MyActionIconModal>
    )
}

const mockData: ILecturer[] = [
    {
        id: 1,
        lecturerId: "GV0001",
        fullName: "Nguyễn Văn A",
        degree: "Thạc sỹ",
        gender: "Nam",
        birthDate: new Date(1990, 1, 1),
        phoneNumber: "0896585235",
        email: "a@gmail.com",
        skills: "Tin Học",
        branchs: ["Thủ Đức"],
        programs: ["Lập trình web", "Lập trình cơ sở dữ liệu"]
    },
    {
        id: 2,
        lecturerId: "GV0002",
        fullName: "Trần Thị B",
        degree: "Tiến sỹ",
        gender: "Nữ",
        birthDate: new Date(1985, 3, 15),
        phoneNumber: "0912345678",
        email: "b@gmail.com",
        skills: "Toán Học, Lý Thuyết Số",
        branchs: ["Quận 1", "Quận 3"],
        programs: ["Giải tích", "Đại số tuyến tính"]
    },
    {
        id: 3,
        lecturerId: "GV0003",
        fullName: "Lê Văn C",
        degree: "Đại học",
        gender: "Nam",
        birthDate: new Date(1992, 7, 20),
        phoneNumber: "0901234567",
        email: "c@gmail.com",
        skills: "Vật Lý, Điện Tử",
        branchs: ["Quận 7", "Quận 5"],
        programs: ["Vật lý đại cương", "Điện tử cơ bản"]
    },
    {
        id: 4,
        lecturerId: "GV0004",
        fullName: "Phạm Thị D",
        degree: "Thạc sỹ",
        gender: "Nữ",
        birthDate: new Date(1988, 11, 5),
        phoneNumber: "0987654321",
        email: "d@gmail.com",
        skills: "Ngữ Văn, Văn Học Hiện Đại",
        branchs: ["Gò Vấp", "Tân Bình"],
        programs: ["Văn học Việt Nam", "Văn học nước ngoài"]
    },
    {
        id: 5,
        lecturerId: "GV0005",
        fullName: "Hoàng Minh E",
        degree: "Tiến sỹ",
        gender: "Nam",
        birthDate: new Date(1980, 9, 22),
        phoneNumber: "0965432109",
        email: "e@gmail.com",
        skills: "Hóa Học, Hóa Phân Tích",
        branchs: ["Bình Chánh", "Gò Vấp"],
        programs: ["Hóa hữu cơ", "Hóa vô cơ"]
    },
    {
        id: 6,
        lecturerId: "GV0006",
        fullName: "Đỗ Thị G",
        degree: "Đại học",
        gender: "Nữ",
        birthDate: new Date(1995, 4, 30),
        phoneNumber: "0934567890",
        email: "g@gmail.com",
        skills: "Tiếng Anh, IELTS",
        branchs: ["Phú Nhuận", "Tân Phú"],
        programs: ["Tiếng Anh giao tiếp", "Luyện thi IELTS"]
    },
    {
        id: 7,
        lecturerId: "GV0007",
        fullName: "Vũ Văn H",
        degree: "Thạc sỹ",
        gender: "Nam",
        birthDate: new Date(1987, 2, 10),
        phoneNumber: "0888123456",
        email: "h@gmail.com",
        skills: "Khoa Học Máy Tính, AI",
        branchs: ["Quận 9", "Quận 2"],
        programs: ["Học máy", "Trí tuệ nhân tạo"]
    },
    {
        id: 8,
        lecturerId: "GV0008",
        fullName: "Trịnh Thị I",
        degree: "Đại học",
        gender: "Nữ",
        birthDate: new Date(1993, 12, 12),
        phoneNumber: "0777987654",
        email: "i@gmail.com",
        skills: "Sinh Học, Di Truyền Học",
        branchs: ["Hóc Môn", "Quận 12"],
        programs: ["Sinh học tế bào", "Di truyền học"]
    },
    {
        id: 9,
        lecturerId: "GV0009",
        fullName: "Bùi Minh K",
        degree: "Tiến sỹ",
        gender: "Nam",
        birthDate: new Date(1975, 6, 18),
        phoneNumber: "0945678912",
        email: "k@gmail.com",
        skills: "Lịch Sử, Lịch Sử Việt Nam",
        branchs: ["Thủ Đức", "Quận 4"],
        programs: ["Lịch sử cận đại", "Lịch sử thế giới"]
    },
    {
        id: 10,
        lecturerId: "GV0010",
        fullName: "Nguyễn Thị L",
        degree: "Thạc sỹ",
        gender: "Nữ",
        birthDate: new Date(1991, 8, 25),
        phoneNumber: "0923456789",
        email: "l@gmail.com",
        skills: "Kinh Tế, Tài Chính",
        branchs: ["Quận 1", "Quận 7"],
        programs: ["Kinh tế vĩ mô", "Thị trường chứng khoán"]
    }
];