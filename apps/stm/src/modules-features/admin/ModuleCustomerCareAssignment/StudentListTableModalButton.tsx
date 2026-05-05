import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MyActionIconModal, MyButton, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IStudent {
    id?: number;
    studentId: string;        // Mã học sinh
    fullName: string;         // Họ tên
    birthDate: Date;        // Ngày sinh
    gender: string;           // Giới tính
    className: string;        // Mã lớp
}

export default function StudentListTableModalButton() {
    const disclosure = useDisclosure();
    const columns = useMemo<MRT_ColumnDef<IStudent>[]>(() => [
        {
            header: "Mã học sinh",
            accessorKey: "studentId",
            size: 120
        },
        {
            header: "Họ tên",
            accessorKey: "fullName",
            size: 200
        },
        {
            header: "Ngày sinh",
            accessorKey: "birthDate",
            size: 120,
            Cell: ({ row }) => {
                return utils_date_dateToDDMMYYYString(row.original.birthDate)
            }
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            size: 100
        },
        {
            header: "Mã lớp",
            accessorKey: "className",
            size: 120
        }
    ], []);

    return (
        <MyActionIconModal icon={<IconSearch />} size={"36px"} title="Danh sách học sinh" modalSize="80vw" crudType="create" disclosure={disclosure}>
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

const mockData: IStudent[] = [
    {
        id: 1,
        studentId: "HS00101",
        fullName: "Nguyễn An Bình",
        birthDate: new Date(2012, 8, 15),
        gender: "Nam",
        className: "Toán 7A"
    },
    {
        id: 2,
        studentId: "HS00102",
        fullName: "Lê Minh Duy",
        birthDate: new Date(2011, 1, 3),
        gender: "Nam",
        className: "Toán 7A"
    },
    {
        id: 3,
        studentId: "HS00103",
        fullName: "Phạm Thị Linh",
        birthDate: new Date(2013, 4, 22),
        gender: "Nữ",
        className: "Toán 7A"
    },
    {
        id: 4,
        studentId: "HS00104",
        fullName: "Võ Hoàng Anh",
        birthDate: new Date(2012, 11, 10),
        gender: "Nam",
        className: "Toán 7A"
    },
    {
        id: 5,
        studentId: "HS00105",
        fullName: "Đặng Thị Nga",
        birthDate: new Date(2013, 6, 7),
        gender: "Nữ",
        className: "Toán 7A"
    },
    {
        id: 6,
        studentId: "HS00201",
        fullName: "Bùi Minh Tâm",
        birthDate: new Date(2010, 2, 28),
        gender: "Nam",
        className: "Văn 8B"
    },
    {
        id: 7,
        studentId: "HS00202",
        fullName: "Đoàn Thị Kim",
        birthDate: new Date(2011, 4, 5),
        gender: "Nữ",
        className: "Văn 8B"
    },
    {
        id: 8,
        studentId: "HS00203",
        fullName: "Ngô Văn Hùng",
        birthDate: new Date(2010, 3, 19),
        gender: "Nam",
        className: "Văn 8B"
    },
    {
        id: 9,
        studentId: "HS00301",
        fullName: "Trần Phương Chi",
        birthDate: new Date(2009, 7, 12),
        gender: "Nữ",
        className: "Toán 9C"
    },
    {
        id: 10,
        studentId: "HS00302",
        fullName: "Nguyễn Thanh Tú",
        birthDate: new Date(2009, 10, 25),
        gender: "Nam",
        className: "Toán 9C"
    }
];