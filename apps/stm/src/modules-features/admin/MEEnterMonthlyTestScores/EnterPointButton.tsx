'use client'
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyNumberInput } from "aq-fe-framework/components";
import { MyButtonModal } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayStudentStatus, DisplayStudentStatusMap } from "./DisplayStudentStatus";

export interface StudentHomeworkRecord {
    maHocSinh: string;
    hoTen: string;
    sdtPhuHuynh: string;
    trangThaiHS: string;
    ghiChuChung: string;
    BTVN1?: number | string;
    BTVN2?: number | string;
    BTVN3?: number | string;
    BTVN4?: number | string;
    BTVN5?: number | string;
    BTVN6?: number | string;
    BTVN7?: number | string;
    BTVN8?: number | string;
    kiemTraThang?: number;
}


export default function EnterPointButton() {
    const dics = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<StudentHomeworkRecord>[]>(
        () => [
            {
                accessorKey: 'maHocSinh',
                header: 'Mã học sinh',
            },
            {
                accessorKey: 'hoTen',
                header: 'Họ và tên HS',
                size: 300
            },
            {
                accessorKey: 'sdtPhuHuynh',
                header: 'SĐT Phụ huynh',
            },
            {
                accessorKey: 'trangThaiHS',
                header: 'Trạng thái HS',
                Cell: ({ row }) => <DisplayStudentStatus statuss={DisplayStudentStatusMap[row.original.trangThaiHS] ?? 0} />

            },
            {
                accessorKey: 'ghiChuChung',
                header: 'Ghi chú chung HS',
                size: 500
            },
            ...Array.from({ length: 8 }, (_, i) => ({
                accessorKey: `BTVN${i + 1}` as keyof StudentHomeworkRecord,
                header: `BTVN${i + 1}`,
            })),
            {
                accessorKey: 'kiemTraThang',
                header: 'Kiểm tra tháng',
                Cell: ({ row }) => <MyNumberInput defaultValue={row.original.kiemTraThang} />
            },
        ], []
    );

    return (
        <MyButtonModal
            disclosure={dics}
            modalProps={{
                title: "Danh sách học sinh",
                size: "100%"
            }}
            buttonProps={{
                leftSection: <IconPencil />,
                variant: "outline",
                children: "Chấm điểm"
            }}
        >
            <MyDataTable
                enableRowSelection
                enableRowNumbers
                columns={columns}
                data={studentHomeworkMockData}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="save" />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
            />
        </MyButtonModal>
    )
}


export const studentHomeworkMockData: StudentHomeworkRecord[] = [
    {
        maHocSinh: "CG23-01030",
        hoTen: "Nguyễn Ngọc Trang Anh",
        sdtPhuHuynh: "0974681988",
        trangThaiHS: "Đang học",
        ghiChuChung: "Chưa làm bài tập thường xuyên",
        BTVN1: 8.0,
        BTVN2: 7.5,
        BTVN3: "Hoàn thành",
        BTVN4: 6.5,
        BTVN5: 7.0,
        BTVN6: "",
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.5,
    },
    {
        maHocSinh: "CG23-01040",
        hoTen: "Mẫn Vũ Minh Anh",
        sdtPhuHuynh: "0912378252",
        trangThaiHS: "Đang học",
        ghiChuChung: "Nghỉ buổi 2",
        BTVN1: 7.0,
        BTVN2: 6.5,
        BTVN3: "Chưa hoàn thành",
        BTVN4: "P",
        BTVN5: 6.0,
        BTVN6: 8.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 7.5,
    },
    {
        maHocSinh: "CG24-01159",
        hoTen: "Nguyễn Quốc Minh Châu",
        sdtPhuHuynh: "0964252508",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 9.0,
        BTVN2: 8.5,
        BTVN3: 8.0,
        BTVN4: 9.0,
        BTVN5: 8.5,
        BTVN6: 9.0,
        BTVN7: 9.5,
        BTVN8: 8.5,
        kiemTraThang: 9.0,
    },
    {
        maHocSinh: "CG23-00685",
        hoTen: "Phạm Ngô Khánh Diệp",
        sdtPhuHuynh: "0969170484",
        trangThaiHS: "Đang học",
        ghiChuChung: "Cần cải thiện tốc độ",
        BTVN1: 7.5,
        BTVN2: 7.0,
        BTVN3: 7.0,
        BTVN4: 6.5,
        BTVN5: 7.0,
        BTVN6: 7.5,
        BTVN7: "",
        BTVN8: "P",
        kiemTraThang: 6.0,
    },
    {
        maHocSinh: "CG24-01157",
        hoTen: "Phạm Hoàng Hải",
        sdtPhuHuynh: "0348689937",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 8.0,
        BTVN2: 7.5,
        BTVN3: 8.0,
        BTVN4: 7.0,
        BTVN5: 7.5,
        BTVN6: 8.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.0,
    },
    {
        maHocSinh: "CG23-01067",
        hoTen: "Nguyễn Minh Hải",
        sdtPhuHuynh: "0914343189",
        trangThaiHS: "Đang học",
        ghiChuChung: "Thường xuyên thiếu bài tập",
        BTVN1: 6.5,
        BTVN2: "P",
        BTVN3: 6.0,
        BTVN4: "P",
        BTVN5: 6.5,
        BTVN6: 7.0,
        BTVN7: 6.0,
        BTVN8: "",
        kiemTraThang: 7.0,
    },
    {
        maHocSinh: "CG23-01068",
        hoTen: "Trần Bảo Hân",
        sdtPhuHuynh: "0974851010",
        trangThaiHS: "Học sinh mới",
        ghiChuChung: "Mới chuyển lớp",
        BTVN1: 9.0,
        BTVN2: 8.5,
        BTVN3: 9.0,
        BTVN4: 8.5,
        BTVN5: 8.0,
        BTVN6: 9.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.5,
    },
    {
        maHocSinh: "CG24-01160",
        hoTen: "Đặng Gia Hân",
        sdtPhuHuynh: "0943831133",
        trangThaiHS: "Đang học",
        ghiChuChung: "Xuất sắc",
        BTVN1: 10.0,
        BTVN2: 9.5,
        BTVN3: 10.0,
        BTVN4: 9.5,
        BTVN5: 10.0,
        BTVN6: 9.5,
        BTVN7: 9.0,
        BTVN8: 9.5,
        kiemTraThang: 9.5,
    },
    {
        maHocSinh: "LH8123-00807",
        hoTen: "Nguyễn Văn Huệ",
        sdtPhuHuynh: "0974168931",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 8.5,
        BTVN2: 8.0,
        BTVN3: 8.5,
        BTVN4: 7.5,
        BTVN5: 8.0,
        BTVN6: 8.5,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 8.0,
    },
    {
        maHocSinh: "CG23-00931",
        hoTen: "Nguyễn Quang Hùng",
        sdtPhuHuynh: "0974359966",
        trangThaiHS: "Đang học",
        ghiChuChung: "",
        BTVN1: 7.0,
        BTVN2: 7.5,
        BTVN3: 7.0,
        BTVN4: 7.0,
        BTVN5: 6.5,
        BTVN6: 7.0,
        BTVN7: "",
        BTVN8: "",
        kiemTraThang: 7.0,
    },
];
